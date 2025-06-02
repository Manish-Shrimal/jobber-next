// import React from "react";
// import JobCard from "./JobCard";
// import "./FeaturedJobs.css"; // Assuming you have a CSS file for styles
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const FeaturedJobs = ({ jobCardData, primaryColor, secondaryColor, curr }) => {
//   const [t, i18n] = useTranslation("global");

//   return (
//     <>
//       {jobCardData.length > 0 && (
//         <div className="featuredJobs-section">
//           <div className="container">
//             <div className="featuredJobs-header">
//               <h1 className="title">{t("userpage.featured")} {t("userpage.jobs")}</h1>
//             </div>
//             <div className="row">
//               {jobCardData.map((i) => (
//                 <div className="col-md-6 col-lg-4">
//                   <JobCard
//                     title={i.title}
//                     min_salary={i.min_salary}
//                     max_salary={i.max_salary}
//                     min_exp={i.min_exp}
//                     created={i.created}
//                     logo={i.logo}
//                     company_name={i.company_name}
//                     work_type={i.work_type}
//                     job_city={i.job_city}
//                     slug={i.slug}
//                     cat_slug={i.cat_slug}
//                     desc={i.brief_abtcomp}
//                     curr={curr}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="explore-button-wrapper">
//               <Link
//                 to="/searchjob"
//                 className="btn"
//                 style={{
//                   backgroundColor: primaryColor,
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   height: "50px",
//                   padding: "9px 30px",
//                   fontWeight: "500",
//                   fontSize: "20px",
//                 }}
//               >
//                 {t("userpage.viewAllJobsButton")}
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FeaturedJobs;


import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import JobCard from "./JobCard";
import "./FeaturedJobs.css"; // Assuming you have a CSS file for styles
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FeaturedJobs = React.memo(
  ({ jobCardData, primaryColor, secondaryColor, curr }) => {
    const [t] = useTranslation("global");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });


    // Animation variants for fade-in and slide-up
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <div className="featuredJobs-section" ref={ref}>
        <div className="container">
          <motion.div
            className="featuredJobs-header"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="title">
              {t("userpage.featured")} {t("userpage.jobs")}
            </h1>
          </motion.div>
          {jobCardData && Array.isArray(jobCardData) && jobCardData.length > 0 ? (
            <div className="row">
              {jobCardData.map((i, index) => (
                <motion.div
                  key={i.slug || index} // Fallback to index if slug is missing
                  className="col-md-6 col-lg-4"
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <JobCard
                    title={i.title || "Untitled Job"}
                    min_salary={i.min_salary || 0}
                    max_salary={i.max_salary || 0}
                    min_exp={i.min_exp || 0}
                    created={i.created || ""}
                    logo={i.logo || "/Images/placeholder.png"}
                    company_name={i.company_name || "Unknown Company"}
                    work_type={i.work_type || "Not Specified"}
                    job_city={i.job_city || "Not Specified"}
                    slug={i.slug || ""}
                    cat_slug={i.cat_slug || ""}
                    desc={i.brief_abtcomp || "No description available"}
                    curr={curr}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-center text-muted">
                {/* No featured jobs available. Please try again later. */}
              </p>
            </motion.div>
          )}
          <motion.div
            className="explore-button-wrapper"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: 0.5,
              delay: 0.3 + (jobCardData?.length || 1) * 0.1,
            }}
          >
            <Link
              href="/searchjob"
              className="btn viewAllJobsButton"
              style={{
                backgroundColor: primaryColor || "#007bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                height: "50px",
                padding: "9px 30px",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              {t("userpage.viewAllJobsButton")}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
);

FeaturedJobs.displayName = "FeaturedJobs";

export default FeaturedJobs;