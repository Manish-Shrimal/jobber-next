// import React, { useEffect, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import "./ExploreCategories.css"; // Assuming you have a CSS file for styles
// import { Link } from "react-router-dom";

// const ExploreCategories = React.memo(({ category, primaryColor }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   // Debug: Log the category prop to check its value
//   useEffect(() => {
//     console.log("ExploreCategories - category prop:", category);
//   }, [category]);

//   const handleClick = (id) => {
//     sessionStorage.setItem("catId", id);
//   };

//   // Animation variants for fade-in and slide-up
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <section className="categories-section" ref={ref}>
//       <div className="container">
//         <motion.h2
//           className="categories-title"
//           variants={fadeInUp}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Explore Categories
//         </motion.h2>
//         {category && Array.isArray(category) && category.length > 0 ? (
//           <div className="categories-grid">
//             {category.map((cat, index) => (
//               <motion.div
//                 key={cat.id || index} // Fallback to index if id is missing
//                 variants={fadeInUp}
//                 initial="hidden"
//                 animate={isInView ? "visible" : "hidden"}
//                 transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//               >
//                 <Link to="/searchjob" onClick={() => handleClick(cat.id)}>
//                   <div className="category-card">
//                     {cat.hasGradient && <div className="card-gradient-bar" />}
//                     <div className="category-content">
//                       <Image
//                         width={50}
//                         height={50}
//                         src={cat.image || "/Images/placeholder.png"} // Fallback image
//                         alt={cat.name || "Category"}
//                         className="category-icon"
//                       />
//                       <p className="category-title">{cat.name || "Unnamed Category"}</p>
//                       <p className="category-subtitle">{cat.sub_cat || "No Subcategory"}</p>
//                       <div className="job-number">
//                         <p className="job-number-text">
//                           {cat.jobs_count || 0} Jobs
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             variants={fadeInUp}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <p className="text-center text-muted">
//               No categories available. Please try again later.
//             </p>
//           </motion.div>
//         )}
//         <motion.div
//           className="explore-button-wrapper"
//           variants={fadeInUp}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           transition={{
//             duration: 0.5,
//             delay: 0.3 + (category?.length || 1) * 0.1,
//           }}
//         >
//           <Link
//             to="/allcategory"
//             className="btn"
//             style={{
//               backgroundColor: primaryColor || "#007bff", // Fallback color
//               color: "white",
//               border: "none",
//               borderRadius: "10px",
//               height: "50px",
//               padding: "9px 30px",
//               fontWeight: "500",
//               fontSize: "20px",
//               marginTop: "30px",
//             }}
//           >
//             Explore All Categories
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// });

// export default ExploreCategories;
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./ExploreCategories.css";
import Image from "next/image";

const ExploreCategories = React.memo(({ category, primaryColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const normalizeIconName = (iconName) => {
    if (!iconName || typeof iconName !== "string") return null;
    const cleanedName = iconName
      .replace(/^fafa|^fa/, "")
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    return `fa${cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1)}`;
  };

  const getIcon = (iconName) => {
    const normalizedName = normalizeIconName(iconName);
    const iconKey = normalizedName?.replace(/^fa/, "");
    return faIcons[normalizedName] || faIcons.faQuestionCircle;
  };

  const handleClick = (id) => {
    localStorage.setItem("catId", id);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="categories-section" ref={ref}>
      <div className="container">
        <motion.h2
          className="categories-title"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore Categories
        </motion.h2>
        {category && Array.isArray(category) && category.length > 0 ? (
          <div className="categories-grid">
            {category.map((cat, index) => {
              const icon = getIcon(cat.icon);
              const baseColor = cat.icon_color || "#000000";
              const hoverColor = cat.icon_hover_color || "#555555";

              return (
                <motion.div
                  key={cat.id || index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link href="/search-job" onClick={() => handleClick(cat.id)}>
                    <div
                      className="category-card"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {cat.hasGradient && <div className="card-gradient-bar" />}
                      <div className="category-content">
                        {cat.icon && icon ? (
                          <FontAwesomeIcon
                            icon={icon}
                            className="category-icon"
                            style={{
                              color:
                                hoveredIndex === index ? hoverColor : baseColor,
                              fontSize: "50px",
                              transition: "color 0.3s ease",
                            }}
                          />
                        ) : (
                          <Image
                            width={50}
                            height={50}
                            unoptimized={true}
                            src={cat.image || "/Images/placeholder.png"}
                            alt={cat.name || "Category"}
                            className="category-icon"
                          />
                        )}
                        <p className="category-title">
                          {cat.name || "Unnamed Category"}
                        </p>
                        <p className="category-subtitle">
                          {cat.sub_cat || "No Subcategory"}
                        </p>
                        <div className="job-number">
                          <p className="job-number-text">
                            {cat.jobs_count || 0} Jobs
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-center text-muted">
              {/* No categories available. Please try again later. */}
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
            delay: 0.3 + (category?.length || 1) * 0.1,
          }}
        >
          <Link
            href="/all-categories"
            className="btn"
            style={{
              backgroundColor: primaryColor || "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              height: "50px",
              padding: "9px 30px",
              fontWeight: "500",
              fontSize: "20px",
              marginTop: "30px",
            }}
          >
            Explore All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

ExploreCategories.displayName = "ExploreCategories";

export default ExploreCategories;

