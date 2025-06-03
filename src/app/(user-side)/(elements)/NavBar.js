// "use client"
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link, NavLink } from "next/link";
// import BaseApi from "@/app/(api)/BaseApi";
// import ApiKey from "@/app/(api)/ApiKey";
// import Swal from "sweetalert2";
// import { FaUser } from "react-icons/fa";
// import Cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";

// // import PersonIcon from '@mui/icons-material/Person';

// const NavBar = () => {
//   const router = useRouter();
//   const [activeItem, setActiveItem] = useState("");
//   const [searchActive, setSearchActive] = useState(false);
//   const [dynamicBlogActive, setDynamicBlogActive] = useState(false);

//   const [login, setLogin] = useState(false);
//   const [userName, setUserName] = useState();
//   const [userType, setUserType] = useState();
//   const [t, i18n] = useTranslation("common");

//   const isUkrainian = () => {
//     return i18n.language === "ukr";
//   };

//   const isGreek = () => {
//     return i18n.language === "el";
//   }

//   // Use the isUkrainian function to conditionally add padding to navitems class
//   const getNavItemsClass = () => {
//     if(isGreek()){
//       return "navitemsUkr";
//     }
//     if(isUkrainian()){
//       return "navitemsUkr";
//     }
//     return "navitems";
//   };

//   // const [navLogo, setNavLogo] = useState();
//   const [hoverLoginColor, setHoverLoginColor] = useState(false);

//   const handleLoginMouseEnter = () => {
//     setHoverLoginColor(true);
//   };

//   const handleLoginMouseLeave = () => {
//     setHoverLoginColor(false);
//   };

//   const [hoverRegisterColor, setHoverRegisterColor] = useState(false);

//   const handleRegisterMouseEnter = () => {
//     setHoverRegisterColor(true);
//   };

//   const handleRegisterMouseLeave = () => {
//     setHoverRegisterColor(false);
//   };

//   const [hoverNavLink1Color, setHoverNavLink1Color] = useState(false);
//   const [hoverNavLink2Color, setHoverNavLink2Color] = useState(false);

//   const [hoverNavLink3Color, setHoverNavLink3Color] = useState(false);

//   const [hoverNavLink4Color, setHoverNavLink4Color] = useState(false);
//   const [hoverNavLink5Color, setHoverNavLink5Color] = useState(false);
//   const [hoverNavLink6Color, setHoverNavLink6Color] = useState(false);
//   const [hoverNavLink7Color, setHoverNavLink7Color] = useState(false);

//   const handleNavLink1MouseEnter = () => {
//     setHoverNavLink1Color(true);
//   };

//   const handleNavLink1MouseLeave = () => {
//     setHoverNavLink1Color(false);
//   };
//   const handleNavLink2MouseEnter = () => {
//     setHoverNavLink2Color(true);
//   };

//   const handleNavLink2MouseLeave = () => {
//     setHoverNavLink2Color(false);
//   };
//   const handleNavLink3MouseEnter = () => {
//     setHoverNavLink3Color(true);
//   };

//   const handleNavLink3MouseLeave = () => {
//     setHoverNavLink3Color(false);
//   };
//   const handleNavLink4MouseEnter = () => {
//     setHoverNavLink4Color(true);
//   };

//   const handleNavLink4MouseLeave = () => {
//     setHoverNavLink4Color(false);
//   };
//   const handleNavLink5MouseEnter = () => {
//     setHoverNavLink5Color(true);
//   };

//   const handleNavLink5MouseLeave = () => {
//     setHoverNavLink5Color(false);
//   };
//   const handleNavLink6MouseEnter = () => {
//     setHoverNavLink6Color(true);
//   };

//   const handleNavLink6MouseLeave = () => {
//     setHoverNavLink6Color(false);
//   };
//   const handleNavLink7MouseEnter = () => {
//     setHoverNavLink7Color(true);
//   };

//   const handleNavLink7MouseLeave = () => {
//     setHoverNavLink7Color(false);
//   };

//   let primaryColor = Cookies.get("primaryColor");
//   let secondaryColor = Cookies.get("secondaryColor");
//   let siteLogo = Cookies.get("siteLogo");
//   const adminID = Cookies.get("adminID");

//   useEffect(() => {
//     const url = window.location.href;

//     if (url.includes("dynamicblogpage")) {
//       // console.log("The URL contains 'dynamicblogpage'.");
//       setDynamicBlogActive(true);
//       // You can add your logic here if the condition is met.
//     } else {
//       setDynamicBlogActive(false);
//       // console.log("The URL does not contain 'dynamicblogpage'.");
//       // You can add an alternative logic here if the condition is not met.
//     }
//   }, []);

//   // const tokenKey = sessionStorage.getItem("token");
//   const navSetter = () => {
//     if (tokenKey) {
//       setUserName(Cookies.get("fname"));
//       setUserType(Cookies.get("user_type"));
//       setLogin(true);
//     }
//   };

//   let fname = Cookies.get("fname");

//   const tokenKey = Cookies.get("tokenClient");

//   useEffect(() => {
//     navSetter();
//   }, []);

//   const handleLogOut = async () => {
//     try {
//       const confirmationResult = await Swal.fire({
//         title: t("navHeaders.logout"),
//         text: t("navHeaders.logoutConfirmTxt"),
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: t("navHeaders.yes"),
//         cancelButtonText: t("navHeaders.no"),
//       });
//       if (confirmationResult.isConfirmed) {
//         const response = await axios.post(BaseApi + "/users/logout", null, {
//           headers: {
//             "Content-Type": "application/json",
//             key: ApiKey,
//             token: tokenKey,
//           },
//         });
//         // sessionStorage.clear();
//         Cookies.remove("tokenClient");
//         Cookies.remove("user_type");
//         Cookies.remove("fname");
//         router.push("/");
//         window.location.reload();
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener("mouseenter", Swal.stopTimer);
//             toast.addEventListener("mouseleave", Swal.resumeTimer);
//           },
//         });

//         Toast.fire({
//           icon: "success",
//           title: t("navHeaders.successTitle"),
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: t("navHeaders.failedTitle"),
//         icon: "error",
//         confirmButtonText: t("navHeaders.close"),
//       });
//       // console.log("Cannot log out!");
//     }
//   };

//   const handleClick = (navItem) => {
//     setActiveItem(navItem);
//   };

//   return (
//     <NavBar expand="lg" className="defaultnavbar">
//       <Container>
//         <NavLink to="/">
//           <Navbar.Brand>
//           {/* <a class="navbar-brand" href="#"> */}
//             {siteLogo && (
//               <img className="frontendNavLogo" src={siteLogo} alt="Logo" />
//             )}
//             {!siteLogo && (
//               <img
//                 className="frontendNavLogo"
//                 src="/Images/logo.png"
//                 alt="Logo"
//               />
//             )}
//           </Navbar.Brand>
//           {/* </a> */}
//         </NavLink>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll" className="navbardefault">
//           <Nav
//             className="ms-auto my-2 my-lg-0 navigation"
//             navbarScroll
//             style={{ fontSize: "18px" }}
//           >
//             <NavLink
//               to="/"
//               exact
//               activeClassName="active" // Add the "active" class when the link is active
//               className={getNavItemsClass()}
//               style={{
//                 color: hoverNavLink1Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink1MouseEnter}
//               onMouseLeave={handleNavLink1MouseLeave}
//             >
//               {t("navHeaders.home")}
//             </NavLink>
//             <NavLink
//               to="/aboutus"
//               activeClassName="active" // Add the "active" class when the link is active
//               className={getNavItemsClass()}
//               style={{
//                 color: hoverNavLink2Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink2MouseEnter}
//               onMouseLeave={handleNavLink2MouseLeave}
//             >
//               {t("navHeaders.aboutus")}
//             </NavLink>
//             {userType === "recruiter" && (
//               <NavLink
//                 to="/candidates/listing"
//                 activeClassName="active" // Add the "active" class when the link is active
//                 className={getNavItemsClass()}
//                 style={{
//                   color: hoverNavLink3Color ? primaryColor : "",
//                 }}
//                 onMouseEnter={handleNavLink3MouseEnter}
//                 onMouseLeave={handleNavLink3MouseLeave}
//               >
//                 {t("navHeaders.jobseekers")}
//               </NavLink>
//             )}

//             <NavLink
//               to="/how-it-works"
//               activeClassName="active" // Add the "active" class when the link is active
//               className={getNavItemsClass()}
//               style={{
//                 color: hoverNavLink4Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink4MouseEnter}
//               onMouseLeave={handleNavLink4MouseLeave}
//             >
//               {t("navHeaders.howitworks")}
//             </NavLink>

//             <NavLink
//               to="/blog"
//               activeClassName="active"
//               className={`${getNavItemsClass()} ${
//                 dynamicBlogActive && "navbardefault active"
//               }`}
//               style={{
//                 color: hoverNavLink5Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink5MouseEnter}
//               onMouseLeave={handleNavLink5MouseLeave}
//             >
//               {t("navHeaders.blog")}
//             </NavLink>

//             <NavLink
//               to="/faq"
//               activeClassName="active" // Add the "active" class when the link is active
//               className={getNavItemsClass()}
//               style={{
//                 color: hoverNavLink6Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink6MouseEnter}
//               onMouseLeave={handleNavLink6MouseLeave}
//             >
//               {t("navHeaders.faq")}
//             </NavLink>
//             <NavLink
//               to="/contact"
//               activeClassName="active" // Add the "active" class when the link is active
//               className={getNavItemsClass()}
//               style={{
//                 color: hoverNavLink7Color ? primaryColor : "",
//               }}
//               onMouseEnter={handleNavLink7MouseEnter}
//               onMouseLeave={handleNavLink7MouseLeave}
//             >
//               {t("navHeaders.contactus")}
//             </NavLink>
//             <NavLink
//               to="/searchjob"
//               activeClassName="active"
//               onClick={() => setSearchActive(true)} // Set the active state manually
//               className="SearchIcon"
//             >
//               <i>
//                 <img
//                   className="ms-3 me-2"
//                   src="/Images/searchnavicon.png"
//                   alt="Logo"
//                 />
//               </i>
//             </NavLink>

//             {login ? (
//               <>
//                 {userType === "recruiter" && (
//                   <>
//                     <NavLink
//                       to="/user/myprofile"
//                       activeClassName="active" // Add the "active" class when the link is active
//                       className={getNavItemsClass()}
//                     >
//                       {/* <i className="fa-solid fa-user me-2"></i> */}
//                       <FaUser className="me-1 pb-1" />

//                       {userName}
//                     </NavLink>
//                     <Link
//                       onClick={handleLogOut}
//                       activeClassName="" // Add the "active" class when the link is active
//                       className={getNavItemsClass()}
//                     >
//                       {t("navHeaders.logout")}
//                     </Link>
//                   </>
//                 )}
//                 {userType === "candidate" && (
//                   <>
//                     <NavLink
//                       to="/candidates/myaccount"
//                       activeClassName="active" // Add the "active" class when the link is active
//                       className="navitems navUsername"
//                     >
//                       {/* <i className="fa-solid fa-user me-2"></i> */}
//                       <FaUser className="me-1 pb-1" />

//                       {userName}
//                     </NavLink>
//                     <Link
//                       onClick={handleLogOut}
//                       activeClassName="active" // Add the "active" class when the link is active
//                       className="navitems"
//                     >
//                       {t("navHeaders.logout")}
//                     </Link>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="dropdown">
//                   <button
//                     className="btn navButton1 dropdown-toggle"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       backgroundColor: hoverLoginColor
//                         ? secondaryColor
//                         : primaryColor,
//                       border: hoverLoginColor ? secondaryColor : primaryColor,
//                       fontWeight: "500",
//                       fontSize: "16px",
//                       padding: "8px 15px",
//                       borderRadius: "10px",
//                       marginLeft: "15px",
//                       minWidth: "115px",
//                       color: "white",
//                     }}
//                     onMouseEnter={handleLoginMouseEnter}
//                     onMouseLeave={handleLoginMouseLeave}
//                   >
//                     {t("navHeaders.login")}
//                   </button>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <Link to="/user/employerlogin" className="dropdown-item">
//                         {t("navHeaders.employerLogin")}
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/user/jobseekerlogin" className="dropdown-item">
//                         {t("navHeaders.jobseekerLogin")}
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="dropdown mx-2">
//                   <button
//                     className="btn navButton2 dropdown-toggle"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       color: hoverRegisterColor ? primaryColor : secondaryColor,
//                       backgroundColor: "white",
//                       border: hoverRegisterColor
//                         ? `2px solid ${primaryColor}`
//                         : `2px solid ${secondaryColor}`,
//                       fontSize: "16px",
//                       padding: "6px 15px",
//                       borderRadius: "10px",
//                       marginLeft: "15px",
//                       fontWeight: "500",
//                     }}
//                     onMouseEnter={handleRegisterMouseEnter}
//                     onMouseLeave={handleRegisterMouseLeave}
//                   >
//                     {t("navHeaders.register")}
//                   </button>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <Link
//                         to="/user/register/employer"
//                         className="dropdown-item"
//                       >
//                         {t("navHeaders.employerRegister")}
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/user/register/jobseeker"
//                         className="dropdown-item"
//                       >
//                         {t("navHeaders.jobseekerRegister")}
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </NavBar>
//   );
// };

// export default NavBar;

// New code with tarnslation

// "use client";

// import React, { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";
// import { useTranslation } from "react-i18next";

// import BaseApi from "@/app/(api)/BaseApi";
// import ApiKey from "@/app/(api)/ApiKey";

// const NavBar = () => {
//   const router = useRouter();
//   const { t, i18n } = useTranslation("common");

//   const [login, setLogin] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const [hoverLink, setHoverLink] = useState(null);
//   const [dynamicBlogActive, setDynamicBlogActive] = useState(false);

//   const tokenKey = Cookies.get("tokenClient");
//   const siteLogo = Cookies.get("siteLogo");
//   const primaryColor = Cookies.get("primaryColor");

//   useEffect(() => {
//     const isDynamicBlog = window.location.href.includes("dynamicblogpage");
//     setDynamicBlogActive(isDynamicBlog);

//     if (tokenKey) {
//       setLogin(true);
//       setUserType(Cookies.get("user_type"));
//     }
//   }, [tokenKey]);

//   const getNavItemsClass = () => {
//     const lang = i18n.language;
//     return lang === "ukr" || lang === "el" ? "navitemsUkr" : "navitems";
//   };

//   const handleLogOut = async () => {
//     const confirm = await Swal.fire({
//       title: t("navHeaders.logout"),
//       text: t("navHeaders.logoutConfirmTxt"),
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: t("navHeaders.yes"),
//       cancelButtonText: t("navHeaders.no"),
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.post(`${BaseApi}/users/logout`, null, {
//           headers: {
//             "Content-Type": "application/json",
//             key: ApiKey,
//             token: tokenKey,
//           },
//         });

//         Cookies.remove("tokenClient");
//         Cookies.remove("user_type");
//         Cookies.remove("fname");

//         Swal.fire({
//           icon: "success",
//           title: t("navHeaders.successTitle"),
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 3000,
//         });

//         router.push("/");
//         window.location.reload();
//       } catch (err) {
//         Swal.fire({
//           title: t("navHeaders.failedTitle"),
//           icon: "error",
//           confirmButtonText: t("navHeaders.close"),
//         });
//       }
//     }
//   };

//   const navItems = [
//     { path: "/", label: t("navHeaders.home"), id: 1 },
//     { path: "/aboutus", label: t("navHeaders.aboutus"), id: 2 },
//     ...(userType === "recruiter"
//       ? [{ path: "/candidates/listing", label: t("navHeaders.jobseekers"), id: 3 }]
//       : []),
//     { path: "/how-it-works", label: t("navHeaders.howitworks"), id: 4 },
//     { path: "/blog", label: t("navHeaders.blog"), id: 5 },
//     { path: "/faq", label: t("navHeaders.faq"), id: 6 },
//   ];

//   return (
//     <Navbar expand="lg" className="defaultnavbar">
//       <Container>
//         <Link href="/" className="navbar-brand">
//           <img
//             className="frontendNavLogo"
//             src={siteLogo || "/Images/logo.png"}
//             alt="Logo"
//           />
//         </Link>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll" className="navbardefault">
//           <Nav className="ms-auto navigation" style={{ fontSize: "18px" }}>
//             {navItems.map(({ path, label, id }) => (
//               <Link
//                 key={id}
//                 href={path}
//                 className={`${getNavItemsClass()} ${
//                   dynamicBlogActive && path === "/blog" ? "active" : ""
//                 }`}
//                 style={{ color: hoverLink === id ? primaryColor : "" }}
//                 onMouseEnter={() => setHoverLink(id)}
//                 onMouseLeave={() => setHoverLink(null)}
//               >
//                 {label}
//               </Link>
//             ))}

//             {login ? (
//               <button onClick={handleLogOut} className="logout-button">
//                 {t("navHeaders.logout")}
//               </button>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className="navitems"
//                   style={{ color: hoverLink === 7 ? primaryColor : "" }}
//                   onMouseEnter={() => setHoverLink(7)}
//                   onMouseLeave={() => setHoverLink(null)}
//                 >
//                   {t("navHeaders.login")}
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="navitems"
//                   style={{ color: hoverLink === 8 ? primaryColor : "" }}
//                   onMouseEnter={() => setHoverLink(8)}
//                   onMouseLeave={() => setHoverLink(null)}
//                 >
//                   {t("navHeaders.register")}
//                 </Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import NavDropdown from "react-bootstrap/NavDropdown"; // Add to your imports
// import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();
  const [t, i18n] = useTranslation("common");

  const [hoverLoginColor, setHoverLoginColor] = useState(false);

  const handleLoginMouseEnter = () => {
    setHoverLoginColor(true);
  };

  const handleLoginMouseLeave = () => {
    setHoverLoginColor(false);
  };

  const [hoverRegisterColor, setHoverRegisterColor] = useState(false);

  const handleRegisterMouseEnter = () => {
    setHoverRegisterColor(true);
  };

  const handleRegisterMouseLeave = () => {
    setHoverRegisterColor(false);
  };

  const [hoverColors, setHoverColors] = useState({
    login: false,
    register: false,
    nav1: false,
    nav2: false,
    nav3: false,
    nav4: false,
    nav5: false,
    nav6: false,
    nav7: false,
  });

  const tokenKey = Cookies.get("tokenClient");
  const siteLogo = Cookies.get("siteLogo");
  const primaryColor = Cookies.get("primaryColor");
  let secondaryColor = Cookies.get("secondaryColor");

  useEffect(() => {
    if (tokenKey) {
      setUserName(Cookies.get("fname"));
      setUserType(Cookies.get("user_type"));
      setLogin(true);
    }
  }, [tokenKey]);

  const isGreekOrUkrainian = () => {
    return i18n.language === "ukr" || i18n.language === "el";
  };

  const getNavItemsClass = () => {
    return isGreekOrUkrainian() ? "navitemsUkr" : "navitems";
  };

  const handleLogOut = async () => {
    try {
      const result = await Swal.fire({
        title: t("navHeaders.logout"),
        text: t("navHeaders.logoutConfirmTxt"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("navHeaders.yes"),
        cancelButtonText: t("navHeaders.no"),
      });

      if (result.isConfirmed) {
        await axios.post(
          BaseApi + "/users/logout",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              key: ApiKey,
              token: tokenKey,
            },
          }
        );

        Cookies.remove("tokenClient");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
        window.location.reload();

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("navHeaders.successTitle"),
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: t("navHeaders.failedTitle"),
        icon: "error",
        confirmButtonText: t("navHeaders.close"),
      });
    }
  };

  const navItems = [
    { href: "/", label: t("navHeaders.home"), key: "nav1" },
    { href: "/about-us", label: t("navHeaders.aboutus"), key: "nav2" },
    {
      href: "/candidates/listing",
      label: t("navHeaders.jobseekers"),
      key: "nav3",
      condition: userType === "recruiter",
    },
    { href: "/how-it-works", label: t("navHeaders.howitworks"), key: "nav4" },
    {
      href: "/blog",
      label: t("navHeaders.blog"),
      key: "nav5",
      extraClass: pathname.includes("dynamicblogpage") ? "active" : "",
    },
    { href: "/faq", label: t("navHeaders.faq"), key: "nav6" },
    { href: "/contact-us", label: t("navHeaders.contactus"), key: "nav7" },
    // { href: "/contact-us", label: t("navHeaders.contactus"), key: "nav7" },
    //   {
    //   href: '/searchjobs',
    //   label: <i class="fa fa-search" aria-hidden="true"></i>,
    //   key: 'nav8',
    // },

    // {
    //   href: "/search-job",
    //   label: (
    //     <Image
    //      Width ={500}
    //      height ={500}
    //      unoptimized={true}
    //       src="/Images/searchnavicon.png"
    //       alt="Search"
    //       className="me-3 ms-2"
    //     />
    //   ),
    //   key: "nav8",
    // },

    {
  href: "/search-job",
  label: (
    <>
      <Image
        width={20} // Set realistic dimensions for nav icons
        height={20}
        unoptimized={true}
        src="/Images/searchnavicon.png"
        alt="Search"
        className="me-3 ms-2"
      />
    </>
  ),
  key: "nav8",
}
  ];

  return (
    <Navbar expand="lg" className="defaultnavbar">
      <Container>
        <Link href="/" className="navbar-brand">
          <Image
        width={500} // Set realistic dimensions for nav icons
        height={50}
        unoptimized={true}
            className="frontendNavLogo"
            src={siteLogo || "/Images/logo.png"}
            alt="Logo"
          />
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbardefault">
          <Nav className="ms-auto navigation" style={{ fontSize: "18px" }}>
            {navItems.map(
              (item) =>
                (item.condition === undefined || item.condition) && (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`${getNavItemsClass()} ${
                      pathname === item.href || item.extraClass ? "active" : ""
                    }`}
                    style={{
                      color: hoverColors[item.key] ? primaryColor : "",
                      textDecoration: "none",
                      // marginRight: "15px",
                    }}
                    onMouseEnter={() =>
                      setHoverColors({ ...hoverColors, [item.key]: true })
                    }
                    onMouseLeave={() =>
                      setHoverColors({ ...hoverColors, [item.key]: false })
                    }
                  >
                    {item.label}
                  </Link>
                )
            )}

            {login ? (
              <>
                <span className={`${getNavItemsClass()} mx-2`}>
                  <i className="fa fa-user"></i> {userName}
                </span>
                <button
                  className={`${getNavItemsClass()} logout-btn`}
                  onClick={handleLogOut}
                >
                  {t("navHeaders.logout")}
                </button>
              </>
            ) : (
              <>
                {/* <Link
                  href="/login"
                  className={`${getNavItemsClass()} mx-2`}
                  style={{
                    color: hoverColors.login ? primaryColor : "",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() =>
                    setHoverColors({ ...hoverColors, login: true })
                  }
                  onMouseLeave={() =>
                    setHoverColors({ ...hoverColors, login: false })
                  }
                >
                  {t("navHeaders.login")}
                </Link>
                <Link
                  href="/register"
                  className={`${getNavItemsClass()} mx-2`}
                  style={{
                    color: hoverColors.register ? primaryColor : "",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() =>
                    setHoverColors({ ...hoverColors, register: true })
                  }
                  onMouseLeave={() =>
                    setHoverColors({ ...hoverColors, register: false })
                  }
                >
                  {t("navHeaders.register")}
                </Link> */}

                {/* <NavDropdown
  title={t("navHeaders.login")}
  id="login-dropdown"
  className={`${getNavItemsClass()} mx-2`}
  onMouseEnter={() =>
    setHoverColors({ ...hoverColors, login: true })
  }
  onMouseLeave={() =>
    setHoverColors({ ...hoverColors, login: false })
  }
  style={{
    color: hoverColors.login ? primaryColor : "",
  }}
>
  <Link className="dropdown-item" href="/login/jobseeker">
    {t("navHeaders.jobseekerLogin")}
  </Link>
  <Link className="dropdown-item" href="/login/employer">
    {t("navHeaders.employerLogin")}
  </Link>
</NavDropdown>

<NavDropdown
  title={t("navHeaders.register")}
  id="register-dropdown"
  className={`${getNavItemsClass()} mx-2`}
  onMouseEnter={() =>
    setHoverColors({ ...hoverColors, register: true })
  }
  onMouseLeave={() =>
    setHoverColors({ ...hoverColors, register: false })
  }
  style={{
    color: hoverColors.register ? primaryColor : "",
  }}
>
  <Link className="dropdown-item" href="/register/jobseeker">
    {t("navHeaders.jobseekerRegister")}
  </Link>
  <Link className="dropdown-item" href="/register/employer">
    {t("navHeaders.employerRegister")}
  </Link>
</NavDropdown> */}
                <div className="dropdown">
                  <button
                    className="btn  dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: hoverLoginColor
                        ? secondaryColor
                        : primaryColor,
                      border: hoverLoginColor ? secondaryColor : primaryColor,
                      fontWeight: "500",
                      fontSize: "16px",
                      padding: "9px 25px",
                      borderRadius: "10px",
                      marginLeft: "15px",
                      minWidth: "115px",
                      color: "white",
                    }}
                    onMouseEnter={handleLoginMouseEnter}
                    onMouseLeave={handleLoginMouseLeave}
                  >
                    {t("navHeaders.login")}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/user/employer-login"
                        className="dropdown-item"
                      >
                        {t("navHeaders.employerLogin")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/jobseeker-login"
                        className="dropdown-item"
                      >
                        {t("navHeaders.jobseekerLogin")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown mx-2">
                  <button
                    className="btn navButton2 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: hoverRegisterColor ? primaryColor : secondaryColor,
                      backgroundColor: "white",
                      border: hoverRegisterColor
                        ? `2px solid ${primaryColor}`
                        : `2px solid ${secondaryColor}`,
                      fontSize: "16px",
                      padding: "6px 15px",
                      borderRadius: "10px",
                      marginLeft: "15px",
                      fontWeight: "500",
                    }}
                    onMouseEnter={handleRegisterMouseEnter}
                    onMouseLeave={handleRegisterMouseLeave}
                  >
                    {t("navHeaders.register")}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/user/employer"
                        className="dropdown-item"
                      >
                        {t("navHeaders.employerRegister")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/jobseeker"
                        className="dropdown-item"
                      >
                        {t("navHeaders.jobseekerRegister")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
