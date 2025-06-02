// import React from "react";
// import "./TopEmployers.css";
// import { Link } from "react-router-dom";

// const TopEmployers = ({ TopEmployer }) => {
//   return (
//     <>
//       {TopEmployer.length > 0 && (
//         <div className="top-employers-section">
//           <div className="container">
//             <div className="top-employers-header">
//               <h2>Top Employers</h2>
//             </div>
//             <div className="top-employers">
//               <div className="top-employers-list">
//                 {TopEmployer.map((employer, index) => (
//                   <div className="employer-card" key={index}>
//                     <Link to={`/companyprofile/${employer.slug}`} key={index}>
//                       <img src={employer.profile_image} alt={employer.slug} />
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TopEmployers;

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "./TopEmployers.css";
import Link from "next/link";
import Image from "next/image";

const TopEmployers = React.memo(({ TopEmployer = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  // Animation variants for fade-in and slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="top-employers-section" ref={ref}>
      <div className="container">
        <motion.div
          className="top-employers-header"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Top Employers</h2>
        </motion.div>
        {Array.isArray(TopEmployer) && TopEmployer.length > 0 ? (
          <div className="top-employers">
            <div className="top-employers-list">
              {TopEmployer.map((employer, index) => (
                <motion.div
                  className="employer-card"
                  key={employer.slug || index} // Fallback to index if slug is missing
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link href={`/company-profile/${employer.slug || ''}`}>
                    <Image
                      width={100}
                      height={100}
                      src={employer.profile_image || "/Images/placeholder.png"}
                      alt={employer.slug || "Employer"}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-center text-muted">
              {/* No top employers available. Please try again later. */}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
});

TopEmployers.displayName = "TopEmployers";

export default TopEmployers;
