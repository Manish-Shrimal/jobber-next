"use client";
import React from "react";
import { motion } from "framer-motion";
import "./KeyFeatures.css"; // Import the external CSS
import Image from "next/image";

const StepCard = React.memo(({ icon, title, description, width }) => (
  <div className="step-card">
    <div
      className="step-card__icon"
      style={{ width: width || "80px" }} // Dynamic width from prop, fallback to 80px
    >
      <Image width={80} height={80} unoptimized={true} src={icon} alt="icon" />
    </div>
    <div className="step-card__content">
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__description">{description}</p>
    </div>
  </div>


));

StepCard.displayName = "StepCard";



const KeyFeatures = () => {
  // Animation variants for fade-in and slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container">
      <div className="key-features">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StepCard
            width="80px"
            icon="/Images/feature1.png"
            title="Create an Account"
            description="Jobseekers can create an account with their basic information."
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StepCard
            width="80px"
            icon="/Images/feature2.png"
            title="Search Desired Job"
            description="Jobseekers can search for jobs which will provide them with the relevant result."
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <StepCard
            width="80px"
            icon="/Images/feature3.png"
            title="Send Your Resume"
            description="Jobseekers can apply for Job, which is a potential match to their profile."
          />
        </motion.div>
      </div>
    </div>
  );
};

KeyFeatures.displayName = "KeyFeatures";

export default KeyFeatures;