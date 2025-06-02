"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import HTMLReactParser from "html-react-parser";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";


const Page = () => {
  const [aboutUs, setAboutUs] = useState([]);
  const [t, i18n] = useTranslation("common");
  const currentLanguage = Cookies.get("selectedLanguage") || "en";


  const getData = async () => {
    try {
      const response = await axios.post(BaseApi + `/page/about_us`, {
        language: currentLanguage,
      });
      setAboutUs(response.data.response);
    } catch (error) {
      console.log("Cannot get data about us!");
    }
  };

  let primaryColor = Cookies.get("primaryColor");
  let secondaryColor = Cookies.get("secondaryColor");

  useEffect(() => {
    getData();
    // getConstantData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="aboutUs">
        <NavBar />
        <div className="aboutusSection1 text-center">
          <h1>
            {aboutUs.page_title ? HTMLReactParser(aboutUs.page_title) : ""}
          </h1>
          <h6 className="text-muted fw-normal">
            {" "}
            <Link href="/" style={{ color: "grey" }}>
              {t("navHeaders.home")}
            </Link>{" "}
            /{aboutUs.page_title}
          </h6>
        </div>
        <div className="container aboutusSection2">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              {/* <Image
                className="aboutusImage"
                src="/Images/about-img-1.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage"
                src="/Images/about-img-1.webp"
                alt="About Us"
                width={500} // specify width
                height={300} // specify height
                unoptimized={true} // ✅ Correct
              />
            </div>
            <div className="col-lg-3 col-md-3">
              {/* <img
                className="aboutusImage mb-2"
                src="/Images/about-img-2.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage mb-2"
                src="/Images/about-img-2.webp"
                alt="About Us"
               width={200} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
              />
              {/* <img
                className="aboutusImage"
                src="/Images/about-img-3.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage"
                src="/Images/about-img-3.webp"
                alt="About Us"
               width={300} // specify width
                  height={200} // specify height
                  unoptimized={true} // ✅ Correct
              />
            </div>
            <div className="col-lg-3 col-md-3">
              {/* <img
                className="aboutusImage mb-2"
                src="/Images/about-img-4.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage mb-2"
                src="/Images/about-img-4.webp"
                alt="About Us"
                width={300} // specify width
                height={150} // specify height
                unoptimized={true} // ✅ Correct
              />
              {/* <img
                className="aboutusImage"
                src="/Images/about-img-5.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage"
                src="/Images/about-img-5.webp"
                alt="About Us"
               width={300} // specify width
                height={150} // specify height
                unoptimized={true} // ✅ Correct
              />
            </div>
            <div className="col-lg-3 col-md-3">
              {/* <img
                className="aboutusImage"
                src="/Images/about-img-6.webp"
                alt=""
              /> */}
              <Image
                className="aboutusImage"
                src="/Images/about-img-6.webp"
                alt="About Us"
                width={300} // specify width
                height={300} // specify height
                unoptimized={true} // ✅ Correct
              />
            </div>
          </div>
        </div>
        <div className="container aboutusSection3 text-center">
          <div className="row aboutusSection3Row">
            <div className="col aboutusSection3Col">
              <h1
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                250M
              </h1>
              <p>{t("aboutPage.monthlyVisitors")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h1
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                15M
              </h1>
              <p>{t("aboutPage.resumes")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h1
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                20M
              </h1>
              <p>{t("aboutPage.rating")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h1
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                50
              </h1>
              <p>{t("aboutPage.jobsAdded")}</p>
            </div>
          </div>
          <div className="aboutusDivider">
            <hr />
          </div>

          <div className="aboutusSection2content text-muted">
            {aboutUs.page_description
              ? HTMLReactParser(aboutUs.page_description)
              : ""}
          </div>
        </div>
        <div className="container aboutusSection4 text-center">
          <h1 className="aboutusSec4Header">
            {t("aboutPage.aboutusHeader1.1")}{" "}
            <span className="textGradient">
              <span className="SubHaddingTxt">
                {t("aboutPage.aboutusHeader1.2")}
              </span>
            </span>
          </h1>
          <div className="cards row">
            <div className="card col-md-3 col-sm-12">
              <div className="card-body p-4">
                {/* <img
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG1.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG1.png"
                  alt="About Us"
                  width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                {/* <img
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon1.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon1.png"
                  alt="About Us"
                  width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                <h3 className="pt-3">
                  {t("aboutPage.card1.header1.1")}{" "}
                  <span className="fw-bold">
                    {t("aboutPage.card1.header1.2")}
                  </span>
                </h3>
                <p>{t("aboutPage.card1.desc")}</p>
              </div>
            </div>
            <div className="card col-md-3 col-sm-12">
              <div className="card-body p-4">
                {/* <img
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG2.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG2.png"
                  alt="About Us"
                   width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                {/* <img
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon2.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon2.png"
                  alt="About Us"
                  width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                <h3 className="pt-3">
                  {t("aboutPage.card2.header1.1")}{" "}
                  <span className="fw-bold">
                    {t("aboutPage.card2.header1.2")}
                  </span>
                </h3>
                <p>{t("aboutPage.card2.desc")}</p>
              </div>
            </div>
            <div className="card col-md-3 col-sm-12">
              <div className="card-body p-4">
                {/* <img
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG3.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage1"
                  src="/Images/aboutUs-iconBG3.png"
                  alt="About Us"
                  width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                {/* <img
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon3.png"
                  alt=""
                /> */}
                <Image
                  className="aboutUsCardImage2"
                  src="/Images/aboutUs-icon3.png"
                  alt="About Us"
                  width={100} // specify width
                  height={100} // specify height
                  unoptimized={true} // ✅ Correct
                />
                <h3 className="pt-3">
                  {t("aboutPage.card3.header1.1")}{" "}
                  <span className="fw-bold">
                    {t("aboutPage.card3.header1.2")}
                  </span>
                </h3>
                <p>{t("aboutPage.card3.desc")}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;

