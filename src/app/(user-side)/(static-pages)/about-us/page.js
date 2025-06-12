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
    <NavBar />
      <div className="aboutUs">
        
        <div className="aboutusSection1 text-center">
          <h1>
            {aboutUs.page_title ? HTMLReactParser(aboutUs.page_title) : ""}
          </h1>
          <h6 className="text-muted fw-normal">
            {" "}
            <Link href="/" style={{ color: "grey" }}>
              {t("navHeaders.home")}
            </Link>{" "}
            /{" "}{aboutUs.page_title}
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
               width={300} // specify width
                  height={150} // specify height
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
                  height={150} // specify height
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
              <h2
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                250M
              </h2>
              <p>{t("aboutPage.monthlyVisitors")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h2
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                15M
              </h2>
              <p>{t("aboutPage.resumes")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h2
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                20M
              </h2>
              <p>{t("aboutPage.rating")}</p>
            </div>
            <div className="col aboutusSection3Col">
              <h2
                style={{
                  color: `${secondaryColor ? secondaryColor : "#f3734c"}`,
                }}
              >
                50
              </h2>
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
          <h4 className="aboutusSec4Header">
            {t("aboutPage.aboutusHeader1.1")}{" "}
            <span className="textGradient">
              <span className="SubHaddingTxt">
                {t("aboutPage.aboutusHeader1.2")}
              </span>
            </span>
          </h4>
          <div className="cards row">
            <div className=" col-md-4 col-sm-12">
              <div className="card">
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
            </div>
            <div className=" col-md-4 col-sm-12">
            <div className="card">

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
            </div>
            <div className=" col-md-4 col-sm-12">
            <div className="card ">

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
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;










// "use client";
// import React, { useEffect, useState } from "react";
// import NavBar from "@/app/(user-side)/(elements)/NavBar";
// import Footer from "@/app/(user-side)/(elements)/Footer";
// import axios from "axios";
// import BaseApi from "@/app/(api)/BaseApi";
// import HTMLReactParser from "html-react-parser";
// import Cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import Image from "next/image";
// import Link from "next/link";
// import { useRecoilValue } from "recoil";
// import { configState } from "@/app/lib/atoms/ConfigAtom";

// const Page = () => {
//   const [aboutUs, setAboutUs] = useState([]);
//   const [t, i18n] = useTranslation("common");
//   const config = useRecoilValue(configState);
//   console.log("Config:", config); // Debug output
//   // const primaryColor = config.primary_color || "#007bff";
//   const secondaryColor = config.secondary_color || "#005a9c";
//   // const siteLogo = config.site_logo || "/Images/logo.png";
//   const currentLanguage = Cookies.get("selectedLanguage") || "en";

//   const getData = async () => {
//     try {
//       const response = await axios.post(BaseApi + `/page/about_us`, {
//         language: currentLanguage,
//       });
//       setAboutUs(response.data.response);
//     } catch (error) {
//       console.log("Cannot get data about us!");
//     }
//   };


//   useEffect(() => {
//     getData();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <div className="aboutUs">
//         <div className="aboutusSection1 text-center">
//           <h1>{aboutUs.page_title ? HTMLReactParser(aboutUs.page_title) : ""}</h1>
//           <h6 className="text-muted fw-normal">
//             <Link href="/" style={{ color: "grey" }}>{t("navHeaders.home")}</Link> / {aboutUs.page_title}
//           </h6>
//         </div>

//         <div className="container aboutusSection2">
//           <div className="row">
//             {[1, 2, 3, 4, 5, 6].map((num, i) => (
//               <div key={i} className="col-lg-3 col-md-3">
//                 <Image
//                   className="aboutusImage mb-2"
//                   src={`/Images/about-img-${num}.webp`}
//                   alt={`About Us Image ${num}`}
//                   width={300}
//                   height={200}
//                   unoptimized={true}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="container aboutusSection3 text-center">
//           <div className="row aboutusSection3Row">
//             {[
//               { count: "250M", label: t("aboutPage.monthlyVisitors") },
//               { count: "15M", label: t("aboutPage.resumes") },
//               { count: "20M", label: t("aboutPage.rating") },
//               { count: "50", label: t("aboutPage.jobsAdded") },
//             ].map((item, index) => (
//               <div key={index} className="col aboutusSection3Col">
//                 <h1 style={{ color: secondaryColor || "#f3734c" }}>{item.count}</h1>
//                 <p>{item.label}</p>
//               </div>
//             ))}
//           </div>

//           <div className="aboutusDivider">
//             <hr />
//           </div>

//           <div className="aboutusSection2content text-muted">
//             {aboutUs.page_description ? HTMLReactParser(aboutUs.page_description) : ""}
//           </div>
//         </div>

//         <div className="container aboutusSection4 text-center">
//           <h1 className="aboutusSec4Header">
//             {t("aboutPage.aboutusHeader1.1")} <span className="textGradient"><span className="SubHaddingTxt">{t("aboutPage.aboutusHeader1.2")}</span></span>
//           </h1>

//           <div className="cards row">
//             {[1, 2, 3].map((num, index) => (
//               <div key={index} className="card col-md-3 col-sm-12">
//                 <div className="card-body p-4">
//                   <Image
//                     className="aboutUsCardImage1"
//                     src={`/Images/aboutUs-iconBG${num}.png`}
//                     alt="Background Icon"
//                     width={100}
//                     height={100}
//                     unoptimized={true}
//                   />
//                   <Image
//                     className="aboutUsCardImage2"
//                     src={`/Images/aboutUs-icon${num}.png`}
//                     alt="Foreground Icon"
//                     width={100}
//                     height={100}
//                     unoptimized={true}
//                   />
//                   <h3 className="pt-3">
//                     {t(`aboutPage.card${num}.header1.1`)} <span className="fw-bold">{t(`aboutPage.card${num}.header1.2`)}</span>
//                   </h3>
//                   <p>{t(`aboutPage.card${num}.desc`)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Page;