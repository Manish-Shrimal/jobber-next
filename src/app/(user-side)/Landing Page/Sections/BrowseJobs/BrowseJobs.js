"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "./BrowseJobs.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BrowseJobs = React.memo(
  ({
    jobTitle,
    skillList,
    category,
    popularSearches,
    primaryColor,
    secondaryColor,
    handleClick,
  }) => {
    const tabs = ["By Title", "By Skills", "By Category", "Popular Searches"];
    const [activeTab, setActiveTab] = useState("By Title");
    const [hoverIndex, setHoverIndex] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const router = useRouter;


    const getCurrentData = () => {
      switch (activeTab) {
        case "By Title":
          return jobTitle || [];
        case "By Skills":
          return skillList || [];
        case "By Category":
          return category || [];
        case "Popular Searches":
          return popularSearches || [];
        default:
          return [];
      }
    };

    const getItemLabel = (item) => {
      if (!item) return "Unknown";
      switch (activeTab) {
        case "By Title":
          return item.title || "Untitled Job";
        case "By Skills":
        case "By Category":
        case "Popular Searches":
          return item.name || "Unnamed Item";
        default:
          return "";
      }
    };

    const handleItemClick = (item) => {
      if (!item) return;
      if (activeTab === "By Category") {
        if (handleClick) handleClick(item);
        router.push("/searchjob");
        sessionStorage.setItem("catId", item.id);
      }
      if (activeTab === "By Title") {
        if (handleClick) handleClick(item.title);
        router.push(`/jobs/searchjob/${item.slug}`);
        sessionStorage.setItem("keywordTitle", item.title);
      }
      if (activeTab === "By Skills") {
        if (handleClick) handleClick(item.name);
        router.push(`/jobs/searchjob/${item.slug}`);
        localStorage.setItem("skillId", item.id);
      }
    };

    const getLinkPath = (item) => {
      if (!item) return null;
      switch (activeTab) {
        case "Popular Searches":
          return `/jobs/searchjob/${item.name}`;
        default:
          return null; // For category, title, skills, use onClick + navigate
      }
    };

    // Animation variants for fade-in and slide-up
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <div className="browseJobs-section" ref={ref}>
        <div className="container browseJobs">
          <motion.h1
            className="title"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse Jobs
          </motion.h1>

          <motion.div
            className="tabs"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                style={
                  activeTab === tab
                    ? {
                        color: secondaryColor,
                        borderBottom: `2px solid ${secondaryColor}`,
                      }
                    : {}
                }
              >
                {tab}
              </div>
            ))}
          </motion.div>

          <div className="job-grid">
            {getCurrentData().length > 0 ? (
              getCurrentData().map((item, index) => {
                const linkPath = getLinkPath(item);
                const label = getItemLabel(item);

                return (
                  <>
                  {/* <div
                    key={item?.id || index} // Fallback to index if id is missing
                  > */}
                    {linkPath ? (
                      <Link href={linkPath}>
                        <motion.div
                          className="job-button"
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                          style={{
                            backgroundColor:
                              hoverIndex === index ? primaryColor : "white",
                            color: hoverIndex === index ? "#fff" : "#333",
                          }}
                          variants={fadeInUp}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + index * 0.1,
                          }}
                        >
                          {label}
                        </motion.div>
                      </Link>
                    ) : (
                      <div
                        className="job-button"
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={{
                          backgroundColor:
                            hoverIndex === index ? primaryColor : "white",
                          color: hoverIndex === index ? "#fff" : "#333",
                          cursor: "pointer",
                        }}
                      >
                        {label}
                      </div>
                    )}
                  {/* </div> */}
                  </>
                );
              })
            ) : (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-center text-muted">
                  {/* No items available for {activeTab}. */}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

BrowseJobs.displayName = "BrowseJobs";

export default BrowseJobs;
