"use client"

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import JobCard from "@/app/(user-side)/(elements)/Jobcard";
import axios from "axios";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BaseApi from "@/app/(api)/BaseApi";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

const Page = () => {
  const { slug } = useParams();
  const router = useRouter()
  const [t] = useTranslation("common");

  // Initial filter state
  const initialKeyword = sessionStorage.getItem("keywordTitle") || slug || "";
  const initialCategory = sessionStorage.getItem("catId") || "";
  const initialSkill = localStorage.getItem("skillId") || "";

  const [filterItem, setFilterItem] = useState({
    keyword: initialKeyword,
    category_id: initialCategory,
    subcategory_id: "",
    location: "",
  });

  const [searchData, setSearchData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [searchButton, setSearchButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionTaken, setSuggestionTaken] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  // Colors from cookies
  const primaryColor = Cookies.get("primaryColor") || "#007bff";
  const secondaryColor = Cookies.get("secondaryColor") || "#6c757d";

  const mapKey = Cookies.get("mapKey");
  const tokenKey = Cookies.get("tokenClient");

  

  // Hover states
  const [hoverColor, setHoverColor] = useState(false);
  const [clearColor, setClearColor] = useState(false);
  const [hoverPrevColor, setHoverPrevColor] = useState(false);
  const [hoverNextColor, setHoverNextColor] = useState(false);

  // Debounced location change handler
  const debouncedLocationChange = useCallback(
    debounce((value) => {
      if (autocompleteService && value) {
        autocompleteService.getPlacePredictions(
          { input: value, types: ["(cities)"] },
          (predictions, status) => {
            if (status === "OK" && predictions) {
              setSuggestions(predictions.map((p) => p.description));
            } else {
              setSuggestions([]);
            }
          }
        );
      } else {
        setSuggestions([]);
      }
    }, 300),
    [autocompleteService]
  );

  // Fetch initial data
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let payload = {};
      if (slug && initialSkill) {
        payload = { skill_id: initialSkill };
      } else if (initialKeyword) {
        payload = { keyword: initialKeyword };
      } else if (initialCategory) {
        payload = { category_id: initialCategory };
      }

      const response = await axios.post(BaseApi + "/job/listing", payload);
      setCategoryList(response.data.response.category || []);
      setCategoryData(response.data.response.jobs || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching job listings:", error);
    }
  }, [initialSkill, initialKeyword, initialCategory]);

  // Fetch subcategories
  const fetchSubCategories = useCallback(async (categoryId) => {
    if (!categoryId) {
      setSubCatData([]);
      return;
    }
    try {
      const response = await axios.post(
        `${BaseApi}/categories/getSubCategory/${categoryId}`
      );
      setSubCatData(response.data.response || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, []);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFilterItem((prev) => {
        const newFilter = { ...prev, [name]: value };
        if (name === "category_id") {
          fetchSubCategories(value);
          if (value === "") {
            newFilter.subcategory_id = "";
          }
        }
        return newFilter;
      });
    },
    [fetchSubCategories]
  );

  // Handle location input
  const handleLocationChange = useCallback(
    (e) => {
      const { value } = e.target;
      setFilterItem((prev) => ({ ...prev, location: value }));
      setSuggestionTaken(value === "");
      debouncedLocationChange(value);
    },
    [debouncedLocationChange]
  );

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setFilterItem((prev) => ({ ...prev, location: suggestion }));
      setSuggestions([]);
      setSuggestionTaken(true);
    },
    []
  );

  // Handle search
  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        !filterItem.keyword &&
        !filterItem.category_id &&
        !filterItem.subcategory_id &&
        !filterItem.location
      ) {
        return;
      }
      setSearchButton(true);
      setLoading(true);
      try {
        const response = await axios.post(BaseApi + "/job/listing", filterItem);
        setSearchData(response.data.response.jobs || []);
        sessionStorage.setItem("jobSearched", "1");
      } catch (error) {
        console.error("Error performing search:", error);
      } finally {
        setLoading(false);
      }
    },
    [filterItem]
  );

  // Handle reset
  const handleReset = useCallback(
    async (e) => {
      e.preventDefault();
      setFilterItem({
        keyword: "",
        category_id: "",
        subcategory_id: "",
        location: "",
      });
      setSearchButton(false);
      setSearchData([]);
      setSubCatData([]);
      setSuggestions([]);
      localStorage.removeItem("skillId");
      setLoading(true);
      try {
        const response = await axios.post(BaseApi + "/job/listing", {});
        setCategoryData(response.data.response.jobs || []);
      } catch (error) {
        console.error("Error fetching all jobs on reset:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load Google Maps script
  useEffect(() => {
    if (!mapKey) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places`;
    script.async = true;
    script.onload = () => {
      setAutocompleteService(
        new window.google.maps.places.AutocompleteService()
      );
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [mapKey]);

  // Initial data fetch
  useEffect(() => {

    getData();
  }, [getData]);

  // Clear session storage after 7 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     sessionStorage.clear();
  //   }, 7000);
  //   return () => clearTimeout(timer);
  // }, []);

//   const Location = useLocation();

  const prevLocationRef = useRef(Location.pathname);

  useEffect(() => {
    return () => {
      sessionStorage.clear(); // Clear session when leaving this page
    };
  }, []);

  useEffect(() => {
    // On route change
    if (Location.pathname !== prevLocationRef.current) {
      sessionStorage.clear();
      localStorage.removeItem("skillId");
    }
    prevLocationRef.current = Location.pathname;
  }, [Location]);
  

  // Memoized current jobs
  const currentJobs = useMemo(() => {
    const data = searchButton ? searchData : categoryData;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return data.slice(indexOfFirstJob, indexOfLastJob);
  }, [searchButton, searchData, categoryData, currentPage]);

  // Pagination handlers
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  }, []);

  // Hover handlers
  const handleMouseEnter = () => setHoverColor(true);
  const handleMouseLeave = () => setHoverColor(false);
  const handleClearMouseEnter = () => setClearColor(true);
  const handleClearMouseLeave = () => setClearColor(false);
  const handlePrevEnter = () => setHoverPrevColor(true);
  const handlePrevLeave = () => setHoverPrevColor(false);
  const handleNextEnter = () => setHoverNextColor(true);
  const handleNextLeave = () => setHoverNextColor(false);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container">
          
        </div>
      ) : (
        <>
          <div className="SJPSection1">
            <form>
              <div className="formItems">
                <div className="searchItems me-2">
                  <input
                    type="text"
                    className="form-control"
                    value={filterItem.keyword}
                    name="keyword"
                    placeholder={t("searchJobPage.keyword")}
                    onChange={handleChange}
                  />
                </div>
                <div className="searchItems me-2">
                  <select
                    className="form-select text-muted"
                    value={filterItem.category_id}
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option value="">{t("searchJobPage.anyCategory")}</option>
                    {categoryList.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="searchItems me-2">
                  <select
                    className="form-select text-muted"
                    value={filterItem.subcategory_id}
                    name="subcategory_id"
                    onChange={handleChange}
                  >
                    <option value="">{t("searchJobPage.subCategory")}</option>
                    {subCatData.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="searchItems me-2 position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("searchJobPage.enterLocation")}
                    name="location"
                    value={filterItem.location}
                    onChange={handleLocationChange}
                  />
                  {suggestions.length > 0 && !suggestionTaken && (
                    <ul className="locationDropdown position-absolute">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-item"
                        >
                          <div className="eachLocation">
                            <LocationOnIcon fontSize="small" />
                            <span>{suggestion}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="button"
                  className="searchItems me-2 btn searchButtons"
                  onClick={handleClick}
                  style={{
                    backgroundColor: hoverColor ? secondaryColor : primaryColor,
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t("searchJobPage.findJobs")}
                </button>
                <button
                  type="button"
                  className="searchItems me-2 btn searchButtons"
                  onClick={handleReset}
                  style={{
                    backgroundColor: clearColor ? secondaryColor : primaryColor,
                  }}
                  onMouseEnter={handleClearMouseEnter}
                  onMouseLeave={handleClearMouseLeave}
                >
                  {t("searchJobPage.clear")}
                </button>
              </div>
            </form>
          </div>
          <div className="blogPagination">
            <p className="text-muted paginationDetail">
              {t("pagination.NoofRecords")} {currentPage * jobsPerPage - jobsPerPage + 1}-
              {Math.min(
                currentPage * jobsPerPage,
                searchButton ? searchData.length : categoryData.length
              )}{" "}
              of {searchButton ? searchData.length : categoryData.length}
            </p>
            <div className="blogPaginationButtons">
              <button
                className="navButton1 me-2"
                style={{
                  backgroundColor: hoverPrevColor ? secondaryColor : primaryColor,
                  border: hoverPrevColor ? secondaryColor : primaryColor,
                }}
                onMouseEnter={handlePrevEnter}
                onMouseLeave={handlePrevLeave}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {t("pagination.Prev")}
              </button>
              <button
                className="navButton1"
                style={{
                  backgroundColor: hoverNextColor ? secondaryColor : primaryColor,
                  border: hoverNextColor ? secondaryColor : primaryColor,
                }}
                onMouseEnter={handleNextEnter}
                onMouseLeave={handleNextLeave}
                disabled={
                  searchButton
                    ? currentPage * jobsPerPage >= searchData.length
                    : currentPage * jobsPerPage >= categoryData.length
                }
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {t("pagination.Next")}
              </button>
            </div>
          </div>
          <div className="SJPSection2 container">
            <div className="FBitem">
              <div className="row">
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <div key={job.slug} className="col-md-6 col-lg-4 mb-4">
                      <JobCard
                        title={job.title}
                        min_salary={job.min_salary}
                        max_salary={job.max_salary}
                        min_exp={job.min_exp}
                        created={job.created}
                        logo={job.logo}
                        company_name={job.company_name}
                        work_type={job.work_type}
                        job_city={job.job_city}
                        slug={job.slug}
                        cat_slug={job.cat_slug}
                        desc={job.description}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h3>{t("searchJobPage.noJobsTxt1")}</h3>
                    <h6 className="text-muted mb-5 mt-3">
                      {t("searchJobPage.noJobsTxt2")}
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="blogPagination">
            <p className="text-muted paginationDetail">
              {t("pagination.NoofRecords")} {currentPage * jobsPerPage - jobsPerPage + 1}-
              {Math.min(
                currentPage * jobsPerPage,
                searchButton ? searchData.length : categoryData.length
              )}{" "}
              of {searchButton ? searchData.length : categoryData.length}
            </p>
            <div className="blogPaginationButtons">
              <button
                className="navButton1 me-2"
                style={{
                  backgroundColor: hoverPrevColor ? secondaryColor : primaryColor,
                  border: hoverPrevColor ? secondaryColor : primaryColor,
                }}
                onMouseEnter={handlePrevEnter}
                onMouseLeave={handlePrevLeave}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {t("pagination.Prev")}
              </button>
              <button
                className="navButton1"
                style={{
                  backgroundColor: hoverNextColor ? secondaryColor : primaryColor,
                  border: hoverNextColor ? secondaryColor : primaryColor,
                }}
                onMouseEnter={handleNextEnter}
                onMouseLeave={handleNextLeave}
                disabled={
                  searchButton
                    ? currentPage * jobsPerPage >= searchData.length
                    : currentPage * jobsPerPage >= categoryData.length
                }
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {t("pagination.Next")}
              </button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
