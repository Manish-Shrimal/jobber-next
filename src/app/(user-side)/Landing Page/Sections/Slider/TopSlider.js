// import { CiSearch } from "react-icons/ci";

// import React, { useState, useEffect, useCallback } from "react";
// import "./TopSlider.css"; // Import the external CSS
// import { useNavigate } from "react-router-dom";

// const TopSlider = React.memo(
//   ({ slider, primaryColor, secondaryColor, title, description }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();
//     const nextSlide = useCallback(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === (slider?.length - 1 || 0) ? 0 : prevIndex + 1
//       );
//     }, [slider?.length]);

//     useEffect(() => {
//       const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
//       return () => clearInterval(interval); // Cleanup on unmount
//     }, [nextSlide]);

//     return (
//       <div
//         className="top-slider"
//         style={{
//           backgroundImage:
//             slider && slider.length > 0
//               ? `url(${slider[currentIndex]?.image})`
//               : "linear-gradient(to right, #e9d8fd, #fbcfe8)",
//           transition: "background-image 4s ease", // Smooth transition between images
//         }}
//       >
//         <div className="top-slider__container">
//           <div className="top-slider__header">
//             <h1 className="top-slider__title">{title}</h1>
//             <p className="top-slider__subtitle">{description}</p>
//           </div>

//           <div className="top-slider__search-bar">
//             <div className="top-slider__search-input-container">
//               <CiSearch className="top-slider__search-icon" />
//               <input
//                 type="text"
//                 placeholder="Job Title or Keyword"
//                 className="top-slider__input"
//               />
//             </div>
//             <div className="top-slider__button-container">
//               <button
//                 className="top-slider__search-button"
//                 style={{
//                   backgroundColor: primaryColor,
//                 }}
//                 onClick={() => {
//                   navigate("/searchjob");
//                 }}
//               >
//                 SEARCH
//               </button>
//               <button
//                 className="top-slider__upload-button"
//                 style={{
//                   backgroundColor: secondaryColor,
//                 }}
//               >
//                 UPLOAD CV
//               </button>
//             </div>
//           </div>

//           <div className="top-slider__stats">
//             <div className="top-slider__stat-item">
//               <div className="top-slider__stat-value">23</div>
//               <div className="top-slider__stat-label">Jobs Posted</div>
//             </div>
//             <div className="top-slider__stat-item">
//               <div className="top-slider__stat-value">11</div>
//               <div className="top-slider__stat-label">Employers</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default TopSlider;

// Proper working code
// import { CiSearch } from "react-icons/ci";
// import React, { useState, useEffect, useCallback } from "react";
// import "./TopSlider.css"; // Import the external CSS
// import { useNavigate } from "react-router-dom";

// const TopSlider = React.memo(
//   ({ slider, primaryColor, secondaryColor, title, description, tokenKey, userType }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [keyword, setKeyword] = useState("");
//     const [hoverSearchColor, setHoverSearchColor] = useState(false);
//     const [hoverUploadCVColor, setHoverUploadCVColor] = useState(false);
//     const navigate = useNavigate();

//     const nextSlide = useCallback(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === (slider?.length - 1 || 0) ? 0 : prevIndex + 1
//       );
//     }, [slider?.length]);

//     useEffect(() => {
//       const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
//       return () => clearInterval(interval); // Cleanup on unmount
//     }, [nextSlide]);

//     const handleSearchMouseEnter = () => setHoverSearchColor(true);
//     const handleSearchMouseLeave = () => setHoverSearchColor(false);
//     const handleUploadCVMouseEnter = () => setHoverUploadCVColor(true);
//     const handleUploadCVMouseLeave = () => setHoverUploadCVColor(false);

//     const handleEmpUploadCVClick = () => {
//       // Implement recruiter-specific action here
//       console.log("Recruiter CV upload clicked");
//     };

//     const getUploadCVLink = () => {
//       if (tokenKey && userType === "candidate") return "/candidates/addcvdocuments";
//       if (tokenKey && userType === "recruiter") return ""; // Empty for onClick handler
//       return "/user/jobseekerlogin";
//     };

//     return (
//       <div
//         className="top-slider"
//         style={{
//           backgroundImage:
//             slider && slider.length > 0
//               ? `url(${slider[currentIndex]?.image})`
//               : "linear-gradient(to right, #e9d8fd, #fbcfe8)",
//           transition: "background-image 4s ease", // Smooth transition between images
//         }}
//       >
//         <div className="top-slider__container">
//           <div className="top-slider__header">
//             <h1 className="top-slider__title">{title}</h1>
//             <p className="top-slider__subtitle">{description}</p>
//           </div>

//           <div className="top-slider__search-bar">
//             <div className="top-slider__search-input-container">
//               <CiSearch className="top-slider__search-icon" />
//               <input
//                 type="text"
//                 placeholder="Job Title or Keyword"
//                 className="top-slider__input"
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//               />
//             </div>
//             <div className="top-slider__button-container">
//               <button
//                 className="top-slider__search-button"
//                 style={{
//                   backgroundColor: hoverSearchColor ? secondaryColor : primaryColor,
//                   border: hoverSearchColor ? secondaryColor : primaryColor,
//                 }}
//                 onClick={() => {
//                   navigate(keyword ? `/jobs/searchjob/${keyword}` : "/searchjob");
//                 }}
//                 onMouseEnter={handleSearchMouseEnter}
//                 onMouseLeave={handleSearchMouseLeave}
//               >
//                 SEARCH
//               </button>
//               <button
//                 className="top-slider__upload-button"
//                 style={{
//                   color: hoverUploadCVColor ? primaryColor : secondaryColor,
//                   backgroundColor: "white",
//                   border: hoverUploadCVColor
//                     ? `2px solid ${primaryColor}`
//                     : `2px solid ${secondaryColor}`,
//                 }}
//                 onClick={
//                   tokenKey && userType === "recruiter"
//                     ? handleEmpUploadCVClick
//                     : () => navigate(getUploadCVLink())
//                 }
//                 onMouseEnter={handleUploadCVMouseEnter}
//                 onMouseLeave={handleUploadCVMouseLeave}
//               >
//                 UPLOAD CV
//               </button>
//             </div>
//           </div>

//           <div className="top-slider__stats">
//             <div className="top-slider__stat-item">
//               <div className="top-slider__stat-value">23</div>
//               <div className="top-slider__stat-label">Jobs Posted</div>
//             </div>
//             <div className="top-slider__stat-item">
//               <div className="top-slider__stat-value">11</div>
//               <div className="top-slider__stat-label">Employers</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default TopSlider;

"use client";
//added framer motion
import { CiSearch } from "react-icons/ci";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./TopSlider.css"; // Import the external CSS
import { useRouter } from "next/navigation";

const TopSlider = React.memo(
  ({ slider, primaryColor, secondaryColor, title, description, tokenKey, userType }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [hoverSearchColor, setHoverSearchColor] = useState(false);
    const [hoverUploadCVColor, setHoverUploadCVColor] = useState(false);
    const router = useRouter();
    const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (slider?.length - 1 || 0) ? 0 : prevIndex + 1
      );
    }, [slider?.length]);

    useEffect(() => {
      const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }, [nextSlide]);

    const handleSearchMouseEnter = () => setHoverSearchColor(true);
    const handleSearchMouseLeave = () => setHoverSearchColor(false);
    const handleUploadCVMouseEnter = () => setHoverUploadCVColor(true);
    const handleUploadCVMouseLeave = () => setHoverUploadCVColor(false);

    const handleEmpUploadCVClick = () => {
      // Implement recruiter-specific action here
      console.log("Recruiter CV upload clicked");
    };

    const getUploadCVLink = () => {
      if (tokenKey && userType === "candidate") return "/jobseeker/add-cv-document";
      if (tokenKey && userType === "recruiter") return ""; // Empty for onClick handler
      return "/user/jobseeker-login";
    };

    // Animation variants for fade-in and slide-up
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <div
        className="top-slider"
        style={{
          backgroundImage:
            slider && slider.length > 0
              ? `url(${slider[currentIndex]?.image})`
              : "linear-gradient(to right, #e9d8fd, #fbcfe8)",
          transition: "background-image 4s ease", // Smooth transition between images
        }}
      >
        <div className="top-slider__container">
          <motion.div
            className="top-slider__header"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="top-slider__title">{title}</h1>
            <p className="top-slider__subtitle">{description}</p>
          </motion.div>

          <motion.div
            className="top-slider__search-bar"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="top-slider__search-input-container">
              <CiSearch className="top-slider__search-icon" />
              <input
                type="text"
                placeholder="Job Title or Keyword"
                className="top-slider__input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="top-slider__button-container">
              <button
                className="top-slider__search-button"
                style={{
                  backgroundColor: hoverSearchColor ? secondaryColor : primaryColor,
                  border: hoverSearchColor ? secondaryColor : primaryColor,
                }}
                onClick={() => {
                  router.push(keyword ? `/jobs/search-job/${keyword}` : "/search-job");
                }}
                onMouseEnter={handleSearchMouseEnter}
                onMouseLeave={handleSearchMouseLeave}
              >
                SEARCH
              </button>
              <button
                className="top-slider__upload-button"
                style={{
                  color: hoverUploadCVColor ? primaryColor : secondaryColor,
                  backgroundColor: "white",
                  border: hoverUploadCVColor
                    ? `2px solid ${primaryColor}`
                    : `2px solid ${secondaryColor}`,
                }}
                onClick={
                  tokenKey && userType === "recruiter"
                    ? handleEmpUploadCVClick
                    : () => router.push(getUploadCVLink())
                }
                onMouseEnter={handleUploadCVMouseEnter}
                onMouseLeave={handleUploadCVMouseLeave}
              >
                UPLOAD CV
              </button>
            </div>
          </motion.div>

          <motion.div
            className="top-slider__stats"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="top-slider__stat-item">
              <div className="top-slider__stat-value">23</div>
              <div className="top-slider__stat-label">Jobs Posted</div>
            </div>
            <div className="top-slider__stat-item">
              <div className="top-slider__stat-value">11</div>
              <div className="top-slider__stat-label">Employers</div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

TopSlider.displayName = "TopSlider";

export default TopSlider;






