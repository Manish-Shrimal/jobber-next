// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../element/Footer";
// import NavBar from "../element/NavBar";
// import BaseApi from "../api/BaseApi";
// import { useTranslation } from "react-i18next";

"use client"
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import Link from "next/link";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import { useTranslation } from "react-i18next";

const SiteMap = () => {
  const [loading, setLoading] = useState(false);
  const [siteMapData, setSiteMapData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [t, i18n] = useTranslation("common");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BaseApi + "/sitemap", null);
      setLoading(false);
      setSiteMapData(response);
      setCategoryData(response.data.response.category);
      setJobData(response.data.response.jobs);
      // console.log(siteMapData);
    } catch (error) {
      setLoading(false);
      console.log("Cannot get site map data");
    }
  };
  const handleClick = (id) => {
    sessionStorage.setItem("catId", id);
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="blogPageSection1 text-center">
        <h1>{t("siteMap.sitemap")}</h1>
        <h6 className="text-muted mt-2">
          {" "}
          <Link href="/" style={{ color: "grey" }}>
            {t("resetPassword.home")}
          </Link>{" "}
          /{t("siteMap.sitemap")}
        </h6>
      </div>
      <div className="allCategorySection2 container">
        <div className="row">
          {/* {loading ? (
            <div className="loader-container"></div>
          ) : (
            <> */}
          <div className="">
            <div className="card-body Jcard">
              <h4>
                <u>{t("siteMap.mainPages")}</u>
              </h4>
              <div className="row">
                <Link href="/" className="col-md-3 eachLink">
                  {t("siteMap.home")}
                </Link>
                <Link
                  href="/user/register/jobseeker"
                  className="col-md-3 eachLink"
                >
                  {t("siteMap.jobseekerRegister")}
                </Link>
                <Link
                  href="/user/register/employer"
                  className="col-md-3 eachLink"
                >
                  {t("siteMap.employerRegister")}
                </Link>
                <Link href="/blog" className="col-md-3 eachLink">
                  {t("siteMap.blog")}
                </Link>
                <Link href="/contact" className="col-md-3 eachLink">
                  {t("siteMap.contactus")}
                </Link>
                <Link href="/how-it-works" className="col-md-3 eachLink">
                  {t("siteMap.howitworks")}
                </Link>
                <Link href="/aboutus" className="col-md-3 eachLink">
                  {t("siteMap.aboutUs")}
                </Link>
                <Link href="/career-tools" className="col-md-3 eachLink">
                  {t("siteMap.careerTools")}
                </Link>
                <Link href="/career-resources" className="col-md-3 eachLink">
                  {t("siteMap.careerResources")}
                </Link>
                <Link href="/faq" className="col-md-3 eachLink">
                  {t("siteMap.Faq")}
                </Link>
                <Link href="/benefits" className="col-md-3 eachLink">
                  {t("siteMap.benefits")}
                </Link>
                <Link href="/terms-and-conditions" className="col-md-3 eachLink">
                  {t("siteMap.terms&condition")}
                </Link>
                <Link href="/privacy-policy" className="col-md-3 eachLink">
                  {t("siteMap.privacyPolicy")}
                </Link>
              </div>
              <h4 className="mt-5">
                <u>{t("siteMap.categories")}</u>
              </h4>
              <div className="row">
                {categoryData.map((i) => {
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
              <h4 className="mt-5">
                <u>{t("siteMap.latestJobs")}</u>
              </h4>
              <div className="row">
                {jobData.map((i) => {
                  return (
                    <>
                      <Link
                        href={`/jobdescription/${i.job_slug}/${i.cat_slug}`}
                        className="col-md-3 eachLink"
                      >
                        {i.title}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* </>
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SiteMap;
