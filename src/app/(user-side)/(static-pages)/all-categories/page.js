"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import Link from "next/link";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";

import { useTranslation } from "react-i18next";

const AllCategoryPage = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BaseApi + "/categories/allcategories");
        setAllCategoryData(response.data.response.categories);
        setLoading(false);
      } catch (error) {
        console.log("Error getting all categories");
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleClick = (id) => {
    sessionStorage.setItem("catId", id);
  };
  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="blogPageSection1 text-center">
            <h1>{t("allCategoryPage.allCategories")}</h1>
            <h6 className="text-muted mt-2">
              {" "}
              <Link href="/" style={{ color: "grey" }}>
                {t("navHeaders.home")}
              </Link>{" "}
              /{t("allCategoryPage.allCategories")}
            </h6>
          </div>
          <div className="allCategorySection2 container">
            <div className="row">
              <div className="">
                <div className="card-body Jcard">
                  <div className="row">
                    {allCategoryData.map((i) => {
                      return (
                        <>
                          <Link
                            href="/search-job"
                            onClick={() => handleClick(i.id)}
                            className="col-md-3 eachLink"
                          >
                            {i.name}
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AllCategoryPage;
