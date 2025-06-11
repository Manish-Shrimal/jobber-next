// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import { FaFacebookSquare } from "react-icons/fa";
// import { BsInstagram } from "react-icons/bs";
// import { FaPinterest } from "react-icons/fa6";
// import { FaLinkedin } from "react-icons/fa";
// const Footer = () => {
//   const [isQuickLinksVisible, setIsQuickLinksVisible] = useState(false);
//   const [isAboutusLinksVisible, setIsAboutusLinksVisible] = useState(false);
//   const [isJobseekerLinksVisible, setIsJobseekerLinksVisible] = useState(false);

//   let siteTitle = Cookies.get("siteTitle");
//   let siteLink = Cookies.get("siteLink");
//   let faceboookLink = Cookies.get("fbLink");
//   let instagramLink = Cookies.get("instaLink");
//   let twitterLink = Cookies.get("twitterLink");
//   let pinterestLink = Cookies.get("pinterestLink");
//   let linkedInLink = Cookies.get("linkedInLink");
//   const [t, i18n] = useTranslation("global");

//   const [selectedLanguage, setSelectedLanguage] = useState(
//     Cookies.get("selectedLanguage") || "en"
//   );

//   const currentLanguage = Cookies.get("selectedLanguage") || "";

//   const handleChangeLanguage = (selectedValue) => {
//     if (selectedValue) {
//       i18n.changeLanguage(selectedValue);
//       window.scrollTo(0, 0);
//     } else {
//       i18n.changeLanguage(currentLanguage);
//       window.scrollTo(0, 0);
//     }
//     window.location.reload();
//     setSelectedLanguage(selectedValue);
//     Cookies.set("selectedLanguage", selectedValue, { expires: 365 });
//   };
//   useEffect(() => {
//     if (currentLanguage) {
//       i18n.changeLanguage(currentLanguage);
//       window.scrollTo(0, 0);
//     }
//   }, []);

//   // const [footerName, setFooterName] = useState();
//   // const [footerLink, setFooterLink] = useState();

//   // const getData = async () => {
//   //   try {
//   //     const response = await axios.get(BaseApi + "/getconstant");
//   //     setFooterLink(response.data.response.site_link);
//   //     setFooterName(response.data.response.site_title);
//   //   } catch (error) {
//   //     console.log("Error getting navbar logo information!");
//   //   }
//   // };
//   useEffect(() => {
//     // getData();
//     // window.scrollTo(0, 0);
//   }, []);

//   const toggle3 = () => {
//     setIsQuickLinksVisible(!isQuickLinksVisible);
//   };
//   const toggle2 = () => {
//     setIsAboutusLinksVisible(!isAboutusLinksVisible);
//   };
//   const toggle1 = () => {
//     setIsJobseekerLinksVisible(!isJobseekerLinksVisible);
//   };

//   useEffect(() => {
//     const handleWindowResize = () => {
//       if (window.innerWidth < 768) {
//         setIsQuickLinksVisible(false);
//         setIsAboutusLinksVisible(false);
//         setIsJobseekerLinksVisible(false);
//       } else {
//         setIsQuickLinksVisible(false);
//         setIsAboutusLinksVisible(false);
//         setIsJobseekerLinksVisible(true);
//       }
//     };

//     // Call the function on component mount
//     handleWindowResize();

//     // Attach event listener for window resize
//     window.addEventListener("resize", handleWindowResize);

//     // Clean up event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//     // getData();
//   }, []);

//   let screenWidth = window.innerWidth;

//   return (
//     <>
//       {screenWidth > 768 ? (
//         <>
//           <div className="footer">
//             <div className="container">
//               <div className="row footerHeadersRow">
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <h3>{t("footer.jobseekers")}</h3>
//                     <ul>
//                       <li>
//                         <Link to="/searchjob" className="">
//                           {t("footer.searchJob")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/user/jobseekerlogin" className="">
//                           {t("footer.jobseekerLogin")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/alerts/add" className="">
//                           {t("footer.createJobAlert")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/candidates/editExperience" className="">
//                           {t("footer.experience")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/candidates/editEducation" className="">
//                           {t("footer.education")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <h3>{t("footer.aboutus")}</h3>
//                     <ul>
//                       <li>
//                         <Link to="/aboutus" className="">
//                           {t("footer.aboutus")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/faq" className="">
//                           {t("footer.faq")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/privacy-policy" className="">
//                           {t("footer.privacyPolicy")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/contact" className="">
//                           {t("footer.contactus")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/sitemap" className="">
//                           {t("footer.siteMap")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <h3>{t("footer.quickLinks")}</h3>
//                     <ul>
//                       <li>
//                         {" "}
//                         <Link to="/jobs/savedjobs" className="">
//                           {t("footer.savedJobs")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/companies" className="">
//                           {t("footer.companies")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/career-tools" className="">
//                           {t("footer.careerTools")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/career-resources" className="">
//                           {t("footer.careerResources")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/benefits" className="">
//                           {t("footer.benefits")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/user/myprofile" className="">
//                           {t("footer.postJob")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/searchjob" className="">
//                           {t("footer.findJob")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <h3>{t("footer.followUs")}</h3>
//                     <div className="SocialIcons">
//                       <Link to={faceboookLink} target="_blank">
//                       <FaFacebookSquare />
//                       </Link>
//                       <Link to={instagramLink} target="_blank">
//                       <BsInstagram />
//                       </Link>
//                       <Link to={pinterestLink} target="_blank">
//                       <FaPinterest />
//                       </Link>
//                       <Link to={linkedInLink} target="_blank">
//                       <FaLinkedin />
//                       </Link>
//                     </div>
//                     <div className="LangaugeDropdown">
//                       <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         value={selectedLanguage}
//                         onChange={(e) => handleChangeLanguage(e.target.value)}
//                       >
//                         {/* <option defaultValue="">Change Language</option> */}
//                         <option value="en">English</option>
//                         <option value="el">Greek</option>
//                         <option value="ukr">Ukrainian</option>
//                         <option value="de">German</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="footerFooter">
//                 <hr />
//                 <p>
//                   &copy; {new Date().getFullYear()} |{" "}
//                   <Link to={siteLink} target="_blank">
//                     {siteTitle}
//                   </Link>{" "}
//                   By Logicspice | All Rights Reserved
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="footer">
//             <div className="container">
//               <div className="row footerHeadersRow">
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <div className="footerEachHeader">
//                       <h3>{t("footer.jobseekers")}</h3>
//                       <Link className="footerPlusLink" onClick={toggle1}>
//                         {isJobseekerLinksVisible ? (
//                           <i className="fa-solid fa-circle-minus"></i>
//                         ) : (
//                           <i className="fa-solid fa-circle-plus"></i>
//                         )}
//                       </Link>
//                     </div>

//                     <ul
//                       style={{
//                         display: isJobseekerLinksVisible ? "block" : "none",
//                       }}
//                     >
//                       <li>
//                         <Link to="/searchjob" className="">
//                           {t("footer.searchJob")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/user/jobseekerlogin" className="">
//                           {t("footer.jobseekerLogin")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/alerts/add" className="">
//                           {t("footer.createJobAlert")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/candidates/editExperience" className="">
//                           {t("footer.experience")}{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/candidates/editEducation" className="">
//                           {t("footer.education")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <div className="footerEachHeader">
//                       <h3>{t("footer.aboutus")}</h3>
//                       <Link className="footerPlusLink" onClick={toggle2}>
//                         {isAboutusLinksVisible ? (
//                           <i className="fa-solid fa-circle-minus"></i>
//                         ) : (
//                           <i className="fa-solid fa-circle-plus"></i>
//                         )}
//                       </Link>
//                     </div>

//                     <ul
//                       style={{
//                         display: isAboutusLinksVisible ? "block" : "none",
//                       }}
//                     >
//                       <li>
//                         <Link to="/aboutus" className="">
//                           {t("footer.aboutus")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/faq" className="">
//                           {t("footer.faq")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/privacy-policy" className="">
//                           {t("footer.privacyPolicy")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/contact" className="">
//                           {t("footer.contactus")}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/sitemap" className="">
//                           {t("footer.siteMap")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <div className="footerEachHeader">
//                       <h3>{t("footer.quickLinks")}</h3>
//                       <Link className="footerPlusLink" onClick={toggle3}>
//                         {isQuickLinksVisible ? (
//                           <i className="fa-solid fa-circle-minus"></i>
//                         ) : (
//                           <i className="fa-solid fa-circle-plus"></i>
//                         )}
//                       </Link>
//                     </div>

//                     <ul
//                       style={{
//                         display: isQuickLinksVisible ? "block" : "none",
//                       }}
//                     >
//                       <li>
//                         {" "}
//                         <Link to="/jobs/savedjobs" className="">
//                           {t("footer.savedJobs")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/companies" className="">
//                           {t("footer.companies")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/career-tools" className="">
//                           {t("footer.careerTools")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/career-resources" className="">
//                           {t("footer.careerResources")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/benefits" className="">
//                           {t("footer.benefits")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/user/myprofile" className="">
//                           {t("footer.postJob")}
//                         </Link>
//                       </li>
//                       <li>
//                         {" "}
//                         <Link to="/searchjob" className="">
//                           {t("footer.findJob")}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-xs-12 col-md-3 col-lg-3">
//                   <div className="FooterLinks">
//                     <h3>{t("footer.followUs")}</h3>
//                     <div className="SocialIcons">
//                       <Link to={faceboookLink} target="_blank">
//                       <FaFacebookSquare />

//                       </Link>
//                       <Link to={instagramLink} target="_blank">
//                       <BsInstagram />

//                       </Link>
//                       <Link to={pinterestLink} target="_blank">
//                       <FaPinterest />
//                       </Link>
//                       <Link to={linkedInLink} target="_blank">
//                       <FaLinkedin />
//                       </Link>
//                     </div>
//                     <div className="LangaugeDropdown">
//                       <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         value={selectedLanguage}
//                         onChange={(e) => handleChangeLanguage(e.target.value)}
//                       >
//                         {/* <option defaultValue="">Change Language</option> */}
//                         <option value="en">English</option>
//                         <option value="el">Greek</option>
//                         <option value="ukr">Ukrainian</option>
//                         <option value="de">German</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="footerFooter">
//                 <hr />
//                 <p>
//                   &copy; Copyright {new Date().getFullYear()} |{" "}
//                   <Link to={siteLink} target="_blank">
//                     {siteTitle}
//                   </Link>{" "}
//                   By Logicspice | All Rights Reserved
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Footer;













"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { FaFacebookSquare, FaPinterest, FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";

const Footer = () => {
  const [isQuickLinksVisible, setIsQuickLinksVisible] = useState(false);
  const [isAboutusLinksVisible, setIsAboutusLinksVisible] = useState(false);
  const [isJobseekerLinksVisible, setIsJobseekerLinksVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // const siteTitle = Cookies.get("siteTitle") || "YourSite";
  const siteLink = Cookies.get("siteLink") || "/";
  const faceboookLink = Cookies.get("fbLink") || "#";
  const instagramLink = Cookies.get("instaLink") || "#";
  const pinterestLink = Cookies.get("pinterestLink") || "#";
  const linkedInLink = Cookies.get("linkedInLink") || "#";
  
  const config = useRecoilValue(configState);
  const siteTitle = config.siteTitle;
  console.log(siteTitle)


  // Correct destructuring here:
// ✅ Correct
const { t, i18n } = useTranslation("common");

  
  const currentLanguage = Cookies.get("selectedLanguage") || "en";
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);



    useEffect(() => {
 
    // }
        if (currentLanguage && i18n?.changeLanguage) {
      i18n.changeLanguage(currentLanguage);
      window.scrollTo(0, 0);
    }

        const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsQuickLinksVisible(false);
        setIsAboutusLinksVisible(false);
        setIsJobseekerLinksVisible(false);
      } else {
        setIsQuickLinksVisible(true);
        setIsAboutusLinksVisible(true);
        setIsJobseekerLinksVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [currentLanguage, i18n]);




  //   const handleChangeLanguage = (selectedValue) => {
  //   if (selectedValue) {
  //     i18n.changeLanguage(selectedValue);
  //     window.scrollTo(0, 0);
  //   } else {
  //     i18n.changeLanguage(currentLanguage);
  //     window.scrollTo(0, 0);
  //   }
  //   window.location.reload();
  //   setSelectedLanguage(selectedValue);
  //   Cookies.set("selectedLanguage", selectedValue, { expires: 365 });
  // };


  const handleChangeLanguage = async (selectedValue) => {
  const lang = selectedValue || currentLanguage;

  try {
    await i18n.changeLanguage(lang); // Wait for language to switch
    Cookies.set("selectedLanguage", lang, { expires: 365 });
    setSelectedLanguage(lang);
    window.scrollTo(0, 0);
    window.location.reload(); // Reload after everything is set
  } catch (err) {
    console.error("Failed to change language:", err);
  }
};


  const toggleSection = (section) => {
    if (section === "quick") {
      setIsQuickLinksVisible(!isQuickLinksVisible);
    } else if (section === "about") {
      setIsAboutusLinksVisible(!isAboutusLinksVisible);
    } else if (section === "jobseeker") {
      setIsJobseekerLinksVisible(!isJobseekerLinksVisible);
    }
  };

  const renderSection = (title, isVisible, toggleFn, links) => (
    <div className="col-xs-12 col-md-3 col-lg-3">
      <div className="FooterLinks">
        <div className="footerEachHeader">
          <h3>{title}</h3>
          {screenWidth < 768 && (
            <button className="footerPlusLink" onClick={toggleFn} aria-label="Toggle Section">
              {isVisible ? (
                <i className="fa-solid fa-circle-minus" />
              ) : (
                <i className="fa-solid fa-circle-plus" />
              )}
            </button>
          )}
        </div>
        <ul style={{ display: screenWidth <= 768 || isVisible ? "block" : "none" }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footerHeadersRow">
          {renderSection(
            t("footer.jobseekers"),
            isJobseekerLinksVisible,
            () => toggleSection("jobseeker"),
            [
              { href: "/searchjob", label: t("footer.searchJob") },
              { href: "/user/jobseekerlogin", label: t("footer.jobseekerLogin") },
              { href: "/alerts/add", label: t("footer.createJobAlert") },
              { href: "/candidates/editExperience", label: t("footer.experience") },
              { href: "/candidates/editEducation", label: t("footer.education") },
            ]
          )}

          {renderSection(
            t("footer.aboutus"),
            isAboutusLinksVisible,
            () => toggleSection("about"),
            [
              { href: "/about-us", label: t("footer.aboutus") },
              { href: "/faq", label: t("footer.faq") },
              { href: "/privacy-policy", label: t("footer.privacyPolicy") },
              { href: "/contact", label: t("footer.contactus") },
              { href: "/sitemap", label: t("footer.siteMap") },
            ]
          )}

          {renderSection(
            t("footer.quickLinks"),
            isQuickLinksVisible,
            () => toggleSection("quick"),
            [
              { href: "/jobs/savedjobs", label: t("footer.savedJobs") },
              { href: "/companies", label: t("footer.companies") },
              { href: "/career-tools", label: t("footer.careerTools") },
              { href: "/career-resources", label: t("footer.careerResources") },
              { href: "/benefits", label: t("footer.benefits") },
              { href: "/user/myprofile", label: t("footer.postJob") },
              { href: "/searchjob", label: t("footer.findJob") },
            ]
          )}

          <div className="col-xs-12 col-md-3 col-lg-3">
            <div className="FooterLinks">
              <h3>{t("footer.followUs")}</h3>
              <div className="SocialIcons">
                <a href={faceboookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookSquare />
                </a>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <BsInstagram />
                </a>
                <a href={pinterestLink} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href={linkedInLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
              <div className="LangaugeDropdown mt-3">
                <select
                  className="form-select"
                  value={selectedLanguage}
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="el">Greek</option>
                  <option value="ukr">Ukrainian</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="footerFooter mt-4">
          <hr />
          <p>
            &copy; {new Date().getFullYear()} |{" "}
            <a href={siteLink} target="_blank" rel="noopener noreferrer">
              {siteTitle}
            </a>{" "}
            By Logicspice | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


