"use client";
import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import Footer from "@/app/(user-side)/(elements)/Footer";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import ApiKey from "@/app/(api)/ApiKey";
import BaseApi from "@/app/(api)/BaseApi";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import Link from "next/link";
import { selectedSkillsState } from "@/app/lib/atoms/SkillsAtom";
const Page = () => {
  const config = useRecoilValue(configState);
  const [selectedSkills, setSelectedSkills] =
    useRecoilState(selectedSkillsState);
  const [filterItem, setFilterItem] = useState({
    keyword: "",
    location: "",
    skills: "",
    total_exp: "",
    exp_salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [searchButton, setSearchButton] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [t] = useTranslation("common");
  const router = useRouter();
//   const slug = router.pathname.split("/").pop();
  const tokenKey = Cookies.get("employerToken");
  const primaryColor = config.primary_color;
  const secondaryColor = config.secondary_color;
  const mapKey = config.map_key;

  const [hoverSearchColor, setHoverSearchColor] = useState(false);
  const [hoverUploadCVColor, setHoverUploadCVColor] = useState(false);
  const [hoverPaginationBtn1Color, setHoverPaginationBtn1Color] =
    useState(false);
  const [hoverPaginationBtn2Color, setPaginationBtn2Color] = useState(false);

  const handleSearchMouseEnter = () => setHoverSearchColor(true);
  const handleSearchMouseLeave = () => setHoverSearchColor(false);
  const handleUploadCVMouseEnter = () => setHoverUploadCVColor(true);
  const handleUploadCVMouseLeave = () => setHoverUploadCVColor(false);
  const handlePagination1MouseEnter = () => setHoverPaginationBtn1Color(true);
  const handlePagination1MouseLeave = () => setHoverPaginationBtn1Color(false);
  const handlePagination2MouseEnter = () => setPaginationBtn2Color(true);
  const handlePagination2MouseLeave = () => setPaginationBtn2Color(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BaseApi + "/candidates/listing", null, {
        headers: {
          "Content-Type": "application/json",
          key: ApiKey,
          token: tokenKey,
        },
      });
      setLoading(false);
      setListingData(response.data.response.candidates);
      setSkillList(response.data.response.skills);
      setExperienceData(response.data.response.experience);
      setSalaryData(response.data.response.salary);
    } catch (error) {
      setLoading(false);
      console.log("Could not get user data in profile page of favourite list");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilterItem((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const interest_skills = document.getElementsByName("skill");
    if (
      filterItem.keyword === "" &&
      filterItem.exp_salary === "" &&
      filterItem.location === "" &&
      filterItem.total_exp === "" &&
      selectedSkills.length === 0
    ) {
      return;
    }
    setCurrentPage(1);

    const skillArray = Array.from(interest_skills).map(
      (element) => element.value
    );
    const updatedData = {
      ...filterItem,
      skill: skillArray,
    };

    setSelectedSkills(skillArray);

    setSearchButton(true);
    setLoading(true);
    try {
      const response = await axios.post(
        BaseApi + "/candidates/listing",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );
      setSearchData(response.data.response.candidates);
      setLoading(false);
      console.log("Search filter data sent successfully");
    } catch (error) {
      setLoading(false);
      console.log("Couldn't send the search filter data!");
    }
  };

  function checkSkills(skills) {
    if (skills && Object.keys(skills).length > 0) {
      return Object.entries(skills).map(([key, value]) => (
        <div key={key}>{value}</div>
      ));
    } else {
      return <div>N/A</div>;
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentData = searchButton
    ? searchData.slice(indexOfFirstJob, indexOfLastJob)
    : listingData.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleReset = () => {
    setSearchButton(false);
    getData();
    setSelectedSkills([]);
    setFilterItem({
      keyword: "",
      location: "",
      total_exp: "",
      exp_salary: "",
    });
    setCurrentPage(1);

    const keywordInput = document.getElementById("formKeyword");
    const locationInput = document.getElementById("formLocation");
    const experienceInput = document.getElementById("formExperience");
    const salaryInput = document.getElementById("formSalary");
    if (keywordInput) keywordInput.value = "";
    if (locationInput) locationInput.value = "";
    if (experienceInput) experienceInput.value = "";
    if (salaryInput) salaryInput.value = "";
  };

  const [autocompleteService, setAutocompleteService] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionTaken, setSuggestionTaken] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places`;
    script.onload = () => {
      setAutocompleteService(
        new window.google.maps.places.AutocompleteService()
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [mapKey]);

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setSuggestionTaken(false);
    if (value === "") {
      setSuggestionTaken(true);
    }

    setFilterItem((prevFilter) => ({
      ...prevFilter,
      location: value,
    }));

    if (autocompleteService) {
      autocompleteService.getPlacePredictions(
        {
          input: value,
          types: ["(cities)"],
        },
        (predictions, status) => {
          if (status === "OK" && predictions) {
            setSuggestions(
              predictions.map((prediction) => prediction.description)
            );
          } else {
            setSuggestions([]);
          }
        }
      );
    }
    if (filterItem.location === "") {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFilterItem((prevFilter) => ({
      ...prevFilter,
      location: suggestion,
    }));
    setSuggestionTaken(true);
    setSuggestions([]);
  };

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleUserProfile = async (slug) => {
    setSelectedSkills([]);
    router.push(`/candidate-profile/${slug}`);
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [tokenKey]);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="privacyPolicy jobseekerListing">
            <div className="text-center PPSection1">
              <h1 className="">{t("jobseekerListing.jobseekers")}</h1>
              <h6 className="text-muted fw-normal">
                {" "}
                <Link href="/" style={{ color: "grey" }}>
                  {t("navHeaders.home")}
                </Link>{" "}
                /{t("jobseekerListing.jobseekers")}
              </h6>
            </div>
            <div className="jobseekerLowerPart container">
              <div className="row">
                <div className="col-md-3">
                  <div className="cardHead">
                    <p>{t("jobseekerListing.jobseekerSearch")}</p>
                  </div>
                  <div className="cardBody">
                    <form className="jobseekerListingForm">
                      <div className="mb-2 mt-2">
                        <div class="mb-3">
                          <input
                            type="text"
                            id="formKeyword"
                            className="form-control"
                            name="keyword"
                            placeholder={t("jobseekerListing.keyword")}
                            value={filterItem.keyword}
                            onChange={handleChange}
                          />
                        </div>

                        <div class="mb-3 position-relative">
                          <input
                            type="text"
                            id="formLocation"
                            className="form-control"
                            name="location"
                            value={filterItem.location}
                            placeholder={t("jobseekerListing.location")}
                            onChange={handleLocationChange}
                          />
                          {suggestions.length > 0 && (
                            <div
                              className="suggestionsSmall"
                              style={{ display: suggestionTaken ? "none" : "" }}
                            >
                              <ul className="locationDropdown">
                                {suggestions.map((suggestion, index) => (
                                  <div key={index} className="suggestion-item">
                                    <li
                                      onClick={() =>
                                        handleSuggestionClick(suggestion)
                                      }
                                    >
                                      <div className="eachLocation">
                                        <div className="locationIcon">
                                          <LocationOnIcon fontSize="small" />
                                        </div>{" "}
                                        <div className="locationSuggestion">
                                          {suggestion}
                                        </div>
                                      </div>
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div class="mb-3">
                          <Select
                            // defaultValue={[colourOptions[2], colouptions[3]]}
                            isMulti
                            isSearchable
                            name="skill"
                            options={skillList.map((i) => ({
                              value: i.name,
                              label: i.name,
                            }))}
                            className="basic-multi-select jobseekerListingSelect"
                            classNamePrefix="select"
                            placeholder={t("jobseekerListing.selectSkills")}
                            value={selectedSkills} // Set selected skills here
                            onChange={handleSkillChange} // Handle skill change event
                          />
                        </div>
                        <div class="mb-3">
                          <select
                            id="formExperience"
                            className="form-select"
                            aria-label="Default select example"
                            name="total_exp"
                            value={filterItem.total_exp}
                            onChange={handleChange}
                          >
                            <option selected value="">
                              {t("jobseekerListing.chooseExp")}
                            </option>
                            {experienceData.map((i) => {
                              return (
                                <option key={i.id} value={i.id}>
                                  {i.val}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div class="mb-3">
                          <select
                            id="formSalary"
                            className="form-select"
                            aria-label="Default select example"
                            name="exp_salary"
                            value={filterItem.exp_salary}
                            onChange={handleChange}
                          >
                            <option selected value="">
                              {t("jobseekerListing.chooseSalary")}
                            </option>
                            {salaryData.map((i) => {
                              return (
                                <option key={i.id} value={i.id}>
                                  {i.val}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary button1"
                          onClick={handleClick}
                          style={{
                            backgroundColor: hoverSearchColor
                              ? secondaryColor
                              : primaryColor,
                            border: hoverSearchColor
                              ? secondaryColor
                              : primaryColor,
                          }}
                          onMouseEnter={handleSearchMouseEnter}
                          onMouseLeave={handleSearchMouseLeave}
                        >
                          {t("jobseekerListing.searchButton")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary button1"
                          onClick={() => handleReset()}
                          style={{
                            backgroundColor: hoverUploadCVColor
                              ? primaryColor
                              : secondaryColor,

                            border: hoverSearchColor
                              ? primaryColor
                              : secondaryColor,
                          }}
                          onMouseEnter={handleUploadCVMouseEnter}
                          onMouseLeave={handleUploadCVMouseLeave}
                        >
                          {t("jobseekerListing.resetButton")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {loading ? (
                  <div className="loader-container"></div>
                ) : (
                  <>
                    <div className="col-md-9">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>{t("jobseekerListing.name")}</th>
                            <th>{t("jobseekerListing.skills")}</th>
                            <th>{t("jobseekerListing.location")}</th>
                            <th>{t("jobseekerListing.preferredlocation")}</th>
                            <th>{t("jobseekerListing.experience")}</th>
                            <th>{t("jobseekerListing.salary")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchButton ? (
                            currentData.length > 0 ? (
                              currentData.map((i) => {
                                return (
                                  <>
                                    <tr>
                                      <td>
                                        {/* <Link
                                          to={`/candidates/profile/${i.slug}`}
                                          style={{
                                            color: secondaryColor,
                                          }}
                                          
                                        > */}
                                        <p
                                          style={{
                                            color: secondaryColor,
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleUserProfile(i.slug)
                                          }
                                        >
                                          {i.first_name} {i.last_name}
                                        </p>
                                        {/* </Link> */}
                                      </td>
                                      <td>
                                        {checkSkills(i.skills)}
                                        {/* {Object.entries(i.skills).map(([key, value]) => {
                                  return { value };
                                })}  */}
                                      </td>
                                      <td>
                                        {i.location != null
                                          ? i.location
                                          : t("jobseekerListing.notAvailable")}
                                      </td>
                                      <td>
                                        {i.pre_location != null
                                          ? i.pre_location
                                          : t("jobseekerListing.notAvailable")}
                                      </td>
                                      <td>
                                        {i.total_exp != ""
                                          ? i.total_exp
                                          : t("jobseekerListing.notAvailable")}
                                      </td>
                                      <td>
                                        {i.exp_salary != null
                                          ? i.exp_salary
                                          : t("jobseekerListing.notAvailable")}
                                      </td>
                                    </tr>{" "}
                                  </>
                                );
                              })
                            ) : (
                              <tr className="col-12">
                                <td colSpan={6}>
                                  <div className="jobseekersListingNoData">
                                    <h3 className="text-center">
                                      {t("jobseekerListing.belowTxt1")}
                                    </h3>
                                    <h6 className="text-muted text-center mb-5 mt-3">
                                      {t("jobseekerListing.belowTxt2")}
                                    </h6>
                                  </div>
                                </td>
                              </tr>
                            )
                          ) : listingData.length > 0 ? (
                            currentData.map((i) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      <p
                                        style={{
                                          color: secondaryColor,
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleUserProfile(i.slug)
                                        }
                                      >
                                        {i.first_name} {i.last_name}
                                      </p>
                                    </td>
                                    <td>
                                      {checkSkills(i.skills)}
                                      {/* {Object.entries(i.skills).map(([key, value]) => {
                                return { value };
                              })}  */}
                                    </td>
                                    <td>
                                      {i.location != null
                                        ? i.location
                                        : t("jobseekerListing.notAvailable")}
                                    </td>
                                    <td>
                                      {i.pre_location != null
                                        ? i.pre_location
                                        : t("jobseekerListing.notAvailable")}
                                    </td>
                                    <td>
                                      {i.total_exp != ""
                                        ? i.total_exp
                                        : t("jobseekerListing.notAvailable")}
                                    </td>
                                    <td>
                                      {i.exp_salary != null
                                        ? i.exp_salary
                                        : t("jobseekerListing.notAvailable")}
                                    </td>
                                  </tr>{" "}
                                </>
                              );
                            })
                          ) : (
                            <tr className="col-12">
                              <td colSpan={6}>
                                <div className="jobseekersListingNoData">
                                  <h3 className="text-center">
                                    {t("jobseekerListing.belowTxt1")}
                                  </h3>
                                  <h6 className="text-muted text-center mb-5 mt-3">
                                    {t("jobseekerListing.belowTxt2")}
                                  </h6>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="blogPagination">
                      <p className="text-muted paginationDetail">
                        {t("pagination.NoofRecords")}{" "}
                        {searchButton
                          ? searchData.length > 0
                            ? indexOfFirstJob + 1
                            : 0
                          : listingData.length > 0
                          ? indexOfFirstJob + 1
                          : 0}
                        -
                        {/* {listingData.length > 0 ? indexOfFirstJob + 1 : 0}- */}
                        {Math.min(
                          indexOfLastJob,
                          searchButton ? searchData.length : listingData.length
                        )}{" "}
                        of{" "}
                        {searchButton ? searchData.length : listingData.length}
                      </p>
                      <div className="blogPaginationButtons">
                        <button
                          className="navButton1"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          style={{
                            backgroundColor: hoverPaginationBtn1Color
                              ? secondaryColor
                              : primaryColor,
                            border: hoverPaginationBtn1Color
                              ? secondaryColor
                              : primaryColor,
                          }}
                          onMouseEnter={handlePagination1MouseEnter}
                          onMouseLeave={handlePagination1MouseLeave}
                        >
                          {t("pagination.Prev")}
                        </button>
                        <button
                          className="navButton1"
                          disabled={
                            searchButton
                              ? indexOfLastJob >= searchData.length
                              : indexOfLastJob >= listingData.length
                          }
                          onClick={() => handlePageChange(currentPage + 1)}
                          style={{
                            backgroundColor: hoverPaginationBtn2Color
                              ? secondaryColor
                              : primaryColor,
                            border: hoverPaginationBtn2Color
                              ? secondaryColor
                              : primaryColor,
                          }}
                          onMouseEnter={handlePagination2MouseEnter}
                          onMouseLeave={handlePagination2MouseLeave}
                        >
                          {t("pagination.Next")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
