// import React from "react";
// import { Link } from "react-router-dom";
// import "./DownloadApp.css"; // Assuming you have a CSS file for styles

// const DownloadApp = () => {
//   return (
//     <div className="download-app-section">
//       <div className="container">
//         <div className="download-app-items">
//           <div className="mobile-app">
//             <Image
//               width={500}
//               height={500}
//               src="/Images/mobile-app.png"
//               alt="mobile app"
//               className="mobile-app-image"
//             />
//           </div>
//           <div className="download-app-content">
//             <h2>DOWNLOAD OUR APP</h2>
//             <p>and find your dream job.</p>
//             <div className="download-buttons">
//               <Link
//                 className="download-button"
//                 to="https://play.google.com/store/apps/details?id=ls.lsjobseeker"
//                 target="_blank"
//               >
//                 <Image
//                   width={150}
//                   height={50}
//                   src="/Images/android-download.png"
//                   alt="android download"
//                 />
//               </Link>
//               <Link
//                 className="download-button"
//                 to="https://apps.apple.com/us/app/ls-job-seeker-candidate/id1403773426?ls=1"
//                 target="_blank"
//               >
//                 <Image width={150} height={50} src="/Images/ios-download.png" alt="ios download" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadApp;


import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import "./DownloadApp.css";
import Image from "next/image";

const DownloadApp = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  // Animation variants for fade-in and slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="download-app-section" ref={ref}>
      <div className="container">
        <div className="download-app-items">
          <motion.div
            className="mobile-app"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              width={500}
              height={500}
              unoptimized={true}
              src="/Images/mobile-app.png"
              alt="mobile app"
              className="mobile-app-image"
            />
          </motion.div>
          <div className="download-app-content">
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              DOWNLOAD OUR APP
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              and find your dream job.
            </motion.p>
            <motion.div
              className="download-buttons"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                className="download-button"
                href="https://play.google.com/store/apps/details?id=ls.lsjobseeker"
                target="_blank"
              >
                <Image
                  width={150}
                  height={50}
                  unoptimized={true}
                  src="/Images/android-download.png"
                  alt="android download"
                />
              </Link>
              <Link
                className="download-button"
                href="https://apps.apple.com/us/app/ls-job-seeker-candidate/id1403773426?ls=1"
                target="_blank"
              >
                <Image width={150} height={50} unoptimized={true} src="/Images/ios-download.png" alt="ios download" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

DownloadApp.displayName = "DownloadApp";

export default DownloadApp;