// "use client";
// import { FaCheckCircle } from "react-icons/fa";
// import dynamic from "next/dynamic";

// import React, { useEffect, useState } from "react";

// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import Link from "next/link";
// import HTMLReactParser from "html-react-parser";
// import Swal from "sweetalert2";
// import { useTranslation } from "react-i18next";
// import "./MembershipPlans.css";
// // import ReactOwlCarousel from "react-owl-carousel";

// const ReactOwlCarousel = dynamic(() => import("react-owl-carousel"), {
//   ssr: false,
// })
// import Image from "next/image";

// const MembershipPlans = ({
//   membershipData,
//   primaryColor,
//   secondaryColor,
//   curr,
//   userType,
//   tokenKey,
// }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [t, i18n] = useTranslation("common");
//   const [planType, setPlanType] = useState("Months"); // State for toggler


//   useEffect(() => {
//     if (
//       tokenKey !== "" &&
//       (userType === "recruiter" || userType === "candidate")
//     ) {
//       setAuthenticated(true);
//     }
//   }, [tokenKey, userType]);

//   const [hoverMembershipButtonColor, setHoverMembershipButtonColor] =
//     useState(false);

//   const handleMembershipButtonMouseEnter = () => {
//     setHoverMembershipButtonColor(true);
//   };

//   const handleMembershipButtonMouseLeave = () => {
//     setHoverMembershipButtonColor(false);
//   };

//   const options = {
//     margin: 20,
//     responsiveClass: true,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     smartSpeed: 1000,
//     responsive: {
//       0: { items: 1 },
//       400: { items: 1 },
//       600: { items: 2 },
//       700: { items: 2 },
//       1000: { items: 3 },
//     },
//   };

//   const handleBuyWithoutLogin = () => {
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.addEventListener("mouseenter", Swal.stopTimer);
//         toast.addEventListener("mouseleave", Swal.resumeTimer);
//       },
//     });

//     Toast.fire({
//       icon: "warning",
//       title: t("userpage.pleaseLogin"),
//     });
//   };

//   // Toggle handler to ensure correct plan type is set
//   const handleToggle = (type) => {
//     setPlanType(type);
//   };

//   // Filter membership data based on the selected plan type
//   const filteredMembershipData = membershipData.filter((plan) => {
//     const validity = plan.plan_validity.toLowerCase();
//     const selectedType = planType.toLowerCase();
//     return validity === selectedType;
//   });

//   return (
//     <>
//       {membershipData.length > 0 && (
//         <div className="MembershipPlans">
//           <div className="container">
//             <div className="MembershipPlansHeader">
//               <div className="MembershipPlansHeadLine">
//               <p>Membership Plans</p>
//               </div>
              
//               {/* Toggler for Monthly/Yearly */}
//               <div className="plan-toggle-separator">
//                 <div
//                   className="plan-toggle"
//                   style={{
//                     marginTop: "10px",
//                     borderRadius: "30px",
//                   }}
//                 >
//                   <button
//                     style={{
//                       padding: "7px 20px",
//                       border: "none",
//                       borderRadius: "40px",
//                       backgroundColor:
//                         planType === "Months" ? "#FF6F61" : "#FFF",
//                       color: planType === "Months" ? "#FFF" : "#000",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleToggle("Months")}
//                   >
//                     Monthly
//                   </button>
//                   <button
//                     style={{
//                       padding: "7px 20px",
//                       border: "none",
//                       borderRadius: "40px",
//                       backgroundColor:
//                         planType === "Years" ? "#FF6F61" : "#FFF",
//                       color: planType === "Years" ? "#FFF" : "#000",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleToggle("Years")}
//                   >
//                     Yearly
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {filteredMembershipData.length > 0 ? (
//               <ReactOwlCarousel
//                 className="owl-theme"
//                 autoplay
//                 autoplaySpeed={1000}
//                 center={true}
//                 loop
//                 margin={0}
//                 {...options}
//               >
//                 {filteredMembershipData.map((i) => {
//                   return (
//                     <div className="item" key={i.plan_name}>
//                       <div className="MembershipCard">
//                         <Image
//                           className="MembershipIcon"
//                           src="/Images/membership-pen-icon.png"
//                           alt="pen"
//                           width={50}
//                           height={50}
//                         />
//                         <div className="MembershipCardHeader">
//                           <p>{i.plan_name}</p>
//                         </div>
//                         <div className="MembershipCardPrice">
//                           <p>
//                             <span>
//                               {curr}
//                               {i.amount}
//                             </span>
//                             /{i.plan_validity}
//                              </p>
//                         </div>
//                         <ul className="applyoption">
//                           {Object.entries(i.features).map(([key, value]) => (
//                             <li key={key}>
//                               <FaCheckCircle style={{ color: "#294A9C", size: "15px" }} />{" "}
//                               {value ? HTMLReactParser(value) : ""}
//                             </li>
//                           ))}
//                         </ul>
//                         {authenticated ? (
//                           <Link
//                             href="/plans/purchase"
//                             className="btn btn-primary"
                  
//                           >
//                             {t("userpage.buyThisPlan")}
//                           </Link>
//                         ) : (
//                           <Link
//                             href="/user/jobseeker-login"
//                             className="btn btn-primary"
//                             onClick={handleBuyWithoutLogin}
                            
//                           >
//                             {t("userpage.buyThisPlan")}
//                           </Link>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </ReactOwlCarousel>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MembershipPlans;















"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MembershipPlans.css";

const MembershipPlans = ({
  membershipData,
  primaryColor,
  secondaryColor,
  curr,
  userType,
  tokenKey,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [t, i18n] = useTranslation("common");
  const [planType, setPlanType] = useState("Months");

  useEffect(() => {
    if (
      tokenKey !== "" &&
      (userType === "recruiter" || userType === "candidate")
    ) {
      setAuthenticated(true);
    }
  }, [tokenKey, userType]);

  const handleBuyWithoutLogin = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: t("userpage.pleaseLogin"),
    });
  };

  const handleToggle = (type) => {
    setPlanType(type);
  };

  const filteredMembershipData = membershipData.filter((plan) => {
    const validity = plan.plan_validity.toLowerCase();
    const selectedType = planType.toLowerCase();
    return validity === selectedType;
  });

  return (
    <>
      {membershipData.length > 0 && (
        <div className="MembershipPlans">
          <div className="container">
            <div className="MembershipPlansHeader">
              <div className="MembershipPlansHeadLine">
                <p>Membership Plans</p>
              </div>

              <div className="plan-toggle-separator">
                <div className="plan-toggle" style={{ marginTop: "10px", borderRadius: "30px" }}>
                  <button
                    style={{
                      padding: "7px 20px",
                      border: "none",
                      borderRadius: "40px",
                      backgroundColor: planType === "Months" ? "#FF6F61" : "#FFF",
                      color: planType === "Months" ? "#FFF" : "#000",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggle("Months")}
                  >
                    Monthly
                  </button>
                  <button
                    style={{
                      padding: "7px 20px",
                      border: "none",
                      borderRadius: "40px",
                      backgroundColor: planType === "Years" ? "#FF6F61" : "#FFF",
                      color: planType === "Years" ? "#FFF" : "#000",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggle("Years")}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>

            {filteredMembershipData.length > 0 && (
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500 }}
                breakpoints={{
                  600: { slidesPerView: 2 },
                  1000: { slidesPerView: 3 },
                }}
              >
                {filteredMembershipData.map((i, index) => (
                  <SwiperSlide key={index}>
                    <div className="MembershipCard">
                      <Image
                        className="MembershipIcon"
                        src="/Images/membership-pen-icon.png"
                        alt="pen"
                        width={50}
                        height={50}
                      />
                      <div className="MembershipCardHeader">
                        <p>{i.plan_name}</p>
                      </div>
                      <div className="MembershipCardPrice">
                        <p>
                          <span>
                            {curr}
                            {i.amount}
                          </span>
                          /{i.plan_validity}
                        </p>
                      </div>
                      <ul className="applyoption">
                        {Object.entries(i.features).map(([key, value]) => (
                          <li key={key}>
                            <FaCheckCircle style={{ color: "#294A9C", marginRight: "5px" }} />
                            {value ? HTMLReactParser(value) : ""}
                          </li>
                        ))}
                      </ul>
                      {authenticated ? (
                        <Link href="/plans/purchase" className="btn btn-primary">
                          {t("userpage.buyThisPlan")}
                        </Link>
                      ) : (
                        <Link
                          href="/user/jobseeker-login"
                          className="btn btn-primary"
                          onClick={handleBuyWithoutLogin}
                        >
                          {t("userpage.buyThisPlan")}
                        </Link>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipPlans;
