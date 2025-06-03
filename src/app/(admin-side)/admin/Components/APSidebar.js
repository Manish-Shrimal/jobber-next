"use client";
import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import GroupIcon from "@mui/icons-material/Group";
import AbcIcon from "@mui/icons-material/Abc";
import AddchartIcon from "@mui/icons-material/Addchart";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from "@mui/icons-material/Payment";
import PaidIcon from "@mui/icons-material/Paid";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MonitorIcon from "@mui/icons-material/Monitor";
import EmailIcon from "@mui/icons-material/Email";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CampaignIcon from "@mui/icons-material/Campaign";
import SchoolIcon from "@mui/icons-material/School";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";
import { useRouter, usePathname, useParams } from "next/navigation";
import Link from "next/link";

const APSidebar = () => {
  const [showConfigurationDropdown, setShowConfigurationDropdown] =
    useState(false);
  const [showSettingDropdown, setShowSettingDropdown] = useState(false);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [showJobseekerDropdown, setShowJobseekerDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showSwearwordsDropdown, setShowSwearwordsDropdown] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showDesignationsDropdown, setShowDesignationsDropdown] =
    useState(false);
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showPaymentHistoryDropdown, setShowPaymentHistoryDropdown] =
    useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showNewsletterDropdown, setShowNewsletterDropdown] = useState(false);
  const [showBannerAdvertisementDropdown, setShowBannerAdvertisementDropdown] =
    useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showContentDropdown, setShowContentDropdown] = useState(false);
  const [showEmailTemplateDropdown, setShowEmailTemplateDropdown] =
    useState(false);
  const [showBlogsDropdown, setShowBlogsDropdown] = useState(false);
  const [showSlidersDropdown, setShowSlidersDropdown] = useState(false);
  const [showAnnouncementDropdown, setShowAnnouncementDropdown] =
    useState(false);
  const [showKeywordsDropdown, setShowKeywordsDropdown] = useState(false);
  const [showManagePlansDropdown, setShowManagePlansDropdown] = useState(false);
  const [isJobseekerNavLinksVisible, setIsJobseekerNavLinksVisible] =
    useState(false);
  const [screenWidth, setScreenWidth] = useState(null); // Initialize as null for SSR
  const [userAccess, setUserAccess] = useState({});

  const router = useRouter();
  const pathname = usePathname();
  const { slug, slug1, slug2 } = useParams();

  const toggle1 = () => {
    setIsJobseekerNavLinksVisible(!isJobseekerNavLinksVisible);
  };

  // Initialize screenWidth on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
    }
  }, []);

  // Handle active NavLink and dropdown
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const activeNavLink = document.querySelector(".SidebarList li.active");
      if (activeNavLink) {
        const parentDropdown = activeNavLink.closest(".dropdown");
        if (parentDropdown) {
          parentDropdown.classList.add("open");
          if (parentDropdown.offsetTop > window.innerHeight) {
            parentDropdown.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  }, [pathname]);

  // Handle resize event
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth > 768) {
          // Optionally handle logic for larger screens
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Handle user access from cookies
  useEffect(() => {
    const access = Cookies.get("access");
    if (access) {
      try {
        setUserAccess(JSON.parse(access));
      } catch (error) {
        console.error("Failed to parse user access cookie:", error);
        setUserAccess({});
      }
    } else {
      setUserAccess({});
    }
  }, []);

  const handleTest = () => {
    setShowSettingDropdown(true);
  };

  const adminID = Cookies.get("adminID");

  return (
    <>
      {screenWidth > 768 ? (
        <>
          {adminID != 1 ? (
            <div className="Sidebar">
              <ul className="SidebarList">
                <Link href="/admin/dashboard">
                  <li
                    className={`row ${
                      pathname === "/admin/dashboard" ? "active" : ""
                    }`}
                  >
                    <div id="icon">
                      <DashboardIcon />
                    </div>
                    <p id="title">Dashboard</p>
                  </li>
                </Link>

                <li
                  className="row"
                  onClick={() =>
                    setShowConfigurationDropdown(!showConfigurationDropdown)
                  }
                >
                  <div id="icon">
                    <PermDataSettingIcon />
                  </div>
                  <p id="title">Configurations</p>
                  {/* {showConfigurationDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )} */}
                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showConfigurationDropdown && ( */}
                <div
                  className={`dropdown ${
                    showConfigurationDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/change-username">
                        <li
                          className={`row ${
                            pathname === "/admin/change-username"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-username"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Username
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-password">
                        <li
                          className={`row ${
                            pathname === "/admin/change-password"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-password"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Password
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-email">
                        <li
                          className={`row ${
                            pathname === "/admin/change-email" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-email"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Email
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>

                {userAccess[0]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowEmployerDropdown(!showEmployerDropdown)
                      }
                    >
                      <div id="icon">
                        <BadgeIcon />
                      </div>
                      <p id="title">Employers</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showEmployerDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showEmployerDropdown ? "open" : ""
                      }`}
                    >
                      <div
                        className="dropdown-item"
                        onClick={() => console.log("Change Username clicked")}
                      >
                        <ul className="SidebarListInternal">
                          <Link href="/admin/employer-list">
                            <li
                              className={`row ${
                                pathname === "/admin/employer-list" ||
                                pathname === `/admin/users/editusers/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/employer-list" ||
                                    pathname ===
                                      `/admin/users/editusers/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Employer List
                              </p>
                            </li>
                          </Link>
                          {userAccess[0]?.Add === 1 && (
                            <>
                              <Link href="/admin/employer-list/add-employer">
                                <li
                                  className={`row ${
                                    pathname ===
                                    "/admin/employer-list/add-employer"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname ===
                                        "/admin/employer-list/add-employer"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Add Employer
                                  </p>
                                </li>
                              </Link>
                            </>
                          )}
                          <Link href="/admin/homepage-slider">
                            <li
                              className={`row ${
                                pathname === "/admin/homepage-slider"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/homepage-slider"
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Home Page Slider
                              </p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[2]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowJobseekerDropdown(!showJobseekerDropdown)
                      }
                    >
                      <div id="icon">
                        <GroupIcon />
                      </div>
                      <p id="title">Jobseekers</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showJobseekerDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showJobseekerDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/jobseeker-list">
                            <li
                              className={`row ${
                                pathname === "/admin/jobseeker/index" ||
                                pathname ===
                                  `/admin/jobseeker/edit-jobseeker/${slug}` ||
                                pathname ===
                                  `/admin/candidates/certificates/${slug}` ||
                                pathname === `/admin/jobs/applied/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/jobseeker/index" ||
                                    pathname ===
                                      `/admin/candidates/editcandidates/${slug}` ||
                                    pathname ===
                                      `/admin/candidates/certificates/${slug}` ||
                                    pathname === `/admin/jobs/applied/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Jobseekers List
                              </p>
                            </li>
                          </Link>

                          {userAccess[2]?.Add === 1 && (
                            <>
                              <Link href="/admin/jobseeker/add-jobseeker">
                                <li
                                  className={`row ${
                                    pathname ===
                                    "/admin/jobseeker/add-jobseeker"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname ===
                                        "/admin/jobseeker/add-jobseeker"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Add Jobseekers
                                  </p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[7]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowCategoriesDropdown(!showCategoriesDropdown)
                      }
                    >
                      <div id="icon">
                        <CategoryIcon />
                      </div>
                      <p id="title">Categories</p>
                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showCategoriesDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showCategoriesDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/categories/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Categories List</p>
                            </li>
                          </Link>
                          {userAccess[7]?.Add === 1 && (
                            <Link href="/admin/categories/add-category">
                              <li className="row">
                                <div id="innerIcon">
                                  <RadioButtonCheckedIcon />
                                </div>
                                <p id="innerTitle">Add Category</p>
                              </li>
                            </Link>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[8]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                    >
                      <div id="icon">
                        <AddchartIcon />
                      </div>
                      <p id="title">Skills</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showSkillsDropdown && ( */}
                    <div
                      className={`dropdown ${showSkillsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/skill/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Skills List</p>
                            </li>
                          </Link>
                          {userAccess[8]?.Add === 1 && (
                            <>
                              <Link href="/admin/skill/add-skill">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Skills</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {/* )} */}

                {userAccess[1]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowDesignationsDropdown(!showDesignationsDropdown)
                      }
                    >
                      <div id="icon">
                        <SchoolIcon />
                      </div>
                      <p id="title">Designations</p>
                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showDesignationsDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showDesignationsDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/designation">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Designations List</p>
                            </li>
                          </Link>
                          {userAccess[1]?.Module === 1 && (
                            <>
                              <Link href="/admin/designation/add">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Designations</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[3]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                    >
                      <div id="icon">
                        <WorkIcon />
                      </div>
                      <p id="title">Jobs</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showJobsDropdown && ( */}
                    <div
                      className={`dropdown ${showJobsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/jobs">
                            <li
                              className={`row ${
                                pathname === "/admin/jobs" ||
                                pathname === `/admin/jobs/editjob/${slug}` ||
                                pathname === `/admin/jobs/candidates/${slug}` ||
                                pathname === `/admin/jobs/addjob/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/jobs" ||
                                    pathname ===
                                      `/admin/jobs/editjob/${slug}` ||
                                    pathname ===
                                      `/admin/jobs/candidates/${slug}` ||
                                    pathname === `/admin/jobs/addjob/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Jobs List
                              </p>
                            </li>
                          </Link>

                          {userAccess[3]?.Add === 1 && (
                            <>
                              <Link href="/admin/jobs/addjob">
                                <li
                                  className={`row ${
                                    pathname === "/admin/jobs/addjob"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname === "/admin/jobs/addjob"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Add Job
                                  </p>
                                </li>
                              </Link>
                              <Link href="/admin/jobs/import">
                                <li
                                  className={`row ${
                                    pathname === "/admin/jobs/import"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname === "/admin/jobs/import"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Import Job
                                  </p>
                                </li>
                              </Link>
                              <Link href="/admin/jobs/csv-upload">
                                <li
                                  className={`row ${
                                    pathname === "/admin/jobs/csv-upload"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname === "/admin/jobs/csv-upload"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Import Job From CSV/XLSX
                                  </p>
                                </li>
                              </Link>
                              <Link href="/admin/jobs/importlist">
                                <li
                                  className={`row ${
                                    pathname === "/admin/jobs/importlist"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname === "/admin/jobs/importlist"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Auto Job Import List
                                  </p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[4]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowCurrencyDropdown(!showCurrencyDropdown)
                      }
                    >
                      <div id="icon">
                        <PaidIcon />
                      </div>
                      <p id="title">Currency</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showCurrencyDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showCurrencyDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/currencies/index">
                            <li
                              className={`row ${
                                pathname === "/admin/currencies/index" ||
                                pathname ===
                                  `/admin/currencies/edit-currency/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/currencies/index" ||
                                    pathname ===
                                      `/admin/currencies/edit-currency/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Currency List
                              </p>
                            </li>
                          </Link>

                          {userAccess[4]?.Add === 1 && (
                            <>
                              <Link href="/admin/currencies/add-currency">
                                <li
                                  className={`row ${
                                    pathname ===
                                    "/admin/currencies/add-currency"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname ===
                                        "/admin/currencies/add-currency"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Add Currency
                                  </p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[5]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                    >
                      <div id="icon">
                        <LibraryBooksIcon />
                      </div>
                      <p id="title">Course</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showCourseDropdown && ( */}
                    <div
                      className={`dropdown ${showCourseDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/course/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Course List</p>
                            </li>
                          </Link>
                          {userAccess[5]?.Add === 1 && (
                            <>
                              <Link href="/admin/course/add-course">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Course</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[9]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowContentDropdown(!showContentDropdown)
                      }
                    >
                      <div id="icon">
                        <MonitorIcon />
                      </div>
                      <p id="title">Contents</p>
                      {/* {showContentDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )} */}
                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showContentDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showContentDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/content/index">
                            <li
                              className={`row ${
                                pathname === "/admin/content/index" ||
                                pathname ===
                                  `/admin/content/edit-content/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/content/index" ||
                                    pathname ===
                                      `/admin/content/edit-content/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Pages List
                              </p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[10]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowEmailTemplateDropdown(!showEmailTemplateDropdown)
                      }
                    >
                      <div id="icon">
                        <EmailIcon />
                      </div>
                      <p id="title">Email Templates</p>
                      {/* {showEmailTemplateDropdown ? (
                <div id="icon2">
                  <RemoveIcon />
                </div>
              ) : (
                <div id="icon2">
                  <AddIcon />
                </div>
              )} */}
                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showEmailTemplateDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showEmailTemplateDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/emailtemplates">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Email Template Setting</p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[6]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowBlogsDropdown(!showBlogsDropdown)}
                    >
                      <div id="icon">
                        <RateReviewIcon />
                      </div>
                      <p id="title">Blogs</p>

                      <div id="icon2">
                        <ExpandMoreIcon />
                      </div>
                    </li>
                    {/* {showBlogsDropdown && ( */}
                    <div
                      className={`dropdown ${showBlogsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/blogs/index">
                            <li
                              className={`row ${
                                pathname === "/admin/blogs/index" ||
                                pathname === `/admin/blogs/edit-blog/${slug}`
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p
                                id="innerTitle"
                                style={{
                                  color:
                                    pathname === "/admin/blogs/index" ||
                                    pathname ===
                                      `/admin/blogs/edit-blog/${slug}`
                                      ? "#f3734c"
                                      : "inherit",
                                }}
                              >
                                Blog List
                              </p>
                            </li>
                          </Link>

                          {userAccess[6]?.Add === 1 && (
                            <>
                              <Link href="/admin/blogs/add-blog">
                                <li
                                  className={`row ${
                                    pathname === "/admin/blogs/add-blog"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p
                                    id="innerTitle"
                                    style={{
                                      color:
                                        pathname === "/admin/blogs/add-blog"
                                          ? "#f3734c"
                                          : "inherit",
                                    }}
                                  >
                                    Add Blog
                                  </p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </ul>
            </div>
          ) : (
            <div className="Sidebar">
              <ul className="SidebarList">
                <Link href="/admin/dashboard">
                  <li
                    className={`row ${
                      pathname === "/admin/dashboard" ? "active" : ""
                    }`}
                  >
                    <div id="icon">
                      <DashboardIcon />
                    </div>
                    <p id="title">Dashboard</p>
                  </li>
                </Link>

                <li
                  className="row"
                  onClick={() =>
                    setShowConfigurationDropdown(!showConfigurationDropdown)
                  }
                >
                  <div id="icon">
                    <PermDataSettingIcon />
                  </div>
                  <p id="title">Configurations</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showConfigurationDropdown && ( */}
                <div
                  className={`dropdown ${
                    showConfigurationDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/change-username">
                        <li
                          className={`row ${
                            pathname === "/admin/change-username"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-username"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Username
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-password">
                        <li
                          className={`row ${
                            pathname === "/admin/change-password"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-password"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Password
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-email">
                        <li
                          className={`row ${
                            pathname === "/admin/change-email" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-email"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Email
                          </p>
                        </li>
                      </Link>

                      <Link href="/admin/security-questions">
                        <li
                          className={`row ${
                            pathname === "/admin/security-questions"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/security-questions"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Security Questions
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-plans">
                        <li
                          className={`row ${
                            pathname === "/admin/manage-plans" ||
                            pathname === "/admin/plans/addplan" ||
                            pathname === `/admin/plans/editPlan/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/manage-plans" ||
                                pathname === "/admin/plans/addplan" ||
                                pathname === `/admin/plans/editPlan/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Manage Plans
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/set-contactus-address">
                        <li
                          className={`row ${
                            pathname === "/admin/set-contactus-address"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/set-contactus-address"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Set Contact Us Address
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/slogan-text">
                        <li
                          className={`row ${
                            pathname === "/admin/slogan-text" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/slogan-text"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Slogan Text
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-logo">
                        <li
                          className={`row ${
                            pathname === "/admin/change-logo" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-logo"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Logo
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-favicon">
                        <li
                          className={`row ${
                            pathname === "/admin/change-favicon" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-favicon"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Favicon
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-color-theme">
                        <li
                          className={`row ${
                            pathname === "/admin/change-color-theme"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-color-theme"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Color Theme
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/change-payment-details">
                        <li
                          className={`row ${
                            pathname === "/admin/change-payment-details"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/change-payment-details"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Change Payment Details
                          </p>
                        </li>
                      </Link>

                      <Link href="/admin/meta-management">
                        <li
                          className={`row ${
                            pathname === "/admin/meta-management"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/meta-management"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Meta Management
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-subadmins">
                        <li
                          className={`row ${
                            pathname === "/admin/manage-subadmins" ||
                            pathname === "/admin/addsubadmin" ||
                            pathname === `/admin/editadmins/${slug}` ||
                            pathname === `/admin/managerole/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/manage-subadmins" ||
                                pathname === "/admin/addsubadmin" ||
                                pathname === `/admin/editadmins/${slug}` ||
                                pathname === `/admin/managerole/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Manage Sub Admins
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/smtp-settings">
                        <li
                          className={`row ${
                            pathname === "/admin/smtp-settings" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/smtp-settings"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            SMTP Setting
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}

                <li
                  className="row"
                  onClick={() => setShowSettingDropdown(!showSettingDropdown)}
                >
                  <div id="icon">
                    <SettingsApplicationsIcon />
                  </div>
                  <p id="title">Settings</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showSettingDropdown && ( */}
                <div
                  className={`dropdown ${showSettingDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/site-setting">
                        <li
                          className={`row ${
                            pathname === "/admin/site-setting" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/site-setting"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Site Setting
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-email-setting">
                        <li
                          className={`row ${
                            pathname === "/admin/manage-email-setting" ||
                            pathname === `/admin/settings/editMails/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/manage-email-setting" ||
                                pathname === `/admin/settings/editMails/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Manage Email Setting
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowEmployerDropdown(!showEmployerDropdown)}
                >
                  <div id="icon">
                    <BadgeIcon />
                  </div>
                  <p id="title">Employers</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showEmployerDropdown && ( */}
                <div
                  className={`dropdown ${showEmployerDropdown ? "open" : ""}`}
                >
                  <div
                    className="dropdown-item"
                    // onClick={() => console.log("Change Username clicked")}
                  >
                    <ul className="SidebarListInternal">
                      <Link href="/admin/employer-list">
                        <li
                          className={`row ${
                            pathname === "/admin/employer-list" ||
                            pathname === `/admin/users/editusers/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/employer-list" ||
                                pathname === `/admin/users/editusers/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Employer List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/employer-list/add-employer">
                        <li
                          className={`row ${
                            pathname === "/admin/employer-list/add-employer"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/employer-list/add-employer"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Employer
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/homepage-slider">
                        <li
                          className={`row ${
                            pathname === "/admin/homepage-slider"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/homepage-slider"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Home Page Slider
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowJobseekerDropdown(!showJobseekerDropdown)
                  }
                >
                  <div id="icon">
                    <GroupIcon />
                  </div>
                  <p id="title">Jobseekers</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showJobseekerDropdown && ( */}
                <div
                  className={`dropdown ${showJobseekerDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/jobseeker/index">
                        <li
                          className={`row ${
                            pathname === "/admin/jobseeker/index" ||
                            pathname ===
                              `/admin/jobseeker/edit-jobseeker/${slug}` ||
                            pathname ===
                              `/admin/candidates/certificates/${slug}` ||
                            pathname === `/admin/jobs/applied/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobseeker/index" ||
                                pathname ===
                                  `/admin/jobseeker/edit-jobseeker/${slug}` ||
                                pathname ===
                                  `/admin/jobseeker/certificates/${slug}` ||
                                pathname === `/admin/jobs/applied/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Jobseekers List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/jobseeker/add-jobseeker">
                        <li
                          className={`row ${
                            pathname === "/admin/jobseeker/add-jobseeker"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobseeker/add-jobseeker"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Jobseekers
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowCategoriesDropdown(!showCategoriesDropdown)
                  }
                >
                  <div id="icon">
                    <CategoryIcon />
                  </div>
                  <p id="title">Categories</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showCategoriesDropdown && ( */}
                <div
                  className={`dropdown ${showCategoriesDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/categories/index">
                        <li
                          className={`row ${
                            pathname === "/admin/categories/index" ||
                            pathname ===
                              `/admin/categories/edit-category/${slug}` ||
                            pathname === `/admin/categories/subindex/${slug}` ||
                            pathname ===
                              `/admin/categories/editsubcat/${slug1}/${slug2}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/categories/index" ||
                                pathname ===
                                  `/admin/categories/edit-category/${slug}` ||
                                pathname ===
                                  `/admin/categories/subindex/${slug}` ||
                                pathname ===
                                  `/admin/categories/editsubcat/${slug1}/${slug2}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Categories List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/categories/add-category">
                        <li
                          className={`row ${
                            pathname === "/admin/categories/add-category"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/categories/add-category"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Category
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowSwearwordsDropdown(!showSwearwordsDropdown)
                  }
                >
                  <div id="icon">
                    <AbcIcon />
                  </div>
                  <p id="title">Swear Words</p>
                  {/* {showSwearwordsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )} */}
                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showSwearwordsDropdown && ( */}
                <div
                  className={`dropdown ${showSwearwordsDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/swear-words/index">
                        <li
                          className={`row ${
                            pathname === "/admin/swear-words/index" ||
                            pathname ===
                              `/admin/swear-words/edit-swear-words/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/swear-words/index" ||
                                pathname ===
                                  `/admin/swear-words/edit-swear-words/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Swear Words List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/swear-words/add-swear-words">
                        <li
                          className={`row ${
                            pathname === "/admin/swear-words/add-swear-words"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname ===
                                "/admin/swear-words/add-swear-words"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Swear Words
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                >
                  <div id="icon">
                    <AddchartIcon />
                  </div>
                  <p id="title">Skills</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showSkillsDropdown && ( */}
                <div className={`dropdown ${showSkillsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/skill/index">
                        <li
                          className={`row ${
                            pathname === "/admin/skill/index" ||
                            pathname === `/admin/skill/edit-skill/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/skill/index" ||
                                pathname === `/admin/skill/edit-skill/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Skills List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/skill/add-skill">
                        <li
                          className={`row ${
                            pathname === "/admin/skill/add-skill"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/skill/add-skill"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Skills
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowDesignationsDropdown(!showDesignationsDropdown)
                  }
                >
                  <div id="icon">
                    <SchoolIcon />
                  </div>
                  <p id="title">Designations</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showDesignationsDropdown && ( */}
                <div
                  className={`dropdown ${
                    showDesignationsDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/designation">
                        <li
                          className={`row ${
                            pathname === "/admin/designation" ||
                            pathname === `/admin/designation/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/designation" ||
                                pathname === `/admin/designation/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Designations List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/designation/add">
                        <li
                          className={`row ${
                            pathname === "/admin/designation/add"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/designation/add"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Designations
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                >
                  <div id="icon">
                    <WorkIcon />
                  </div>
                  <p id="title">Jobs</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showJobsDropdown && ( */}
                <div className={`dropdown ${showJobsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/jobs">
                        <li
                          className={`row ${
                            pathname === "/admin/jobs" ||
                            pathname === `/admin/jobs/editjob/${slug}` ||
                            pathname === `/admin/jobs/candidates/${slug}` ||
                            pathname === `/admin/jobs/addjob/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobs" ||
                                pathname === `/admin/jobs/editjob/${slug}` ||
                                pathname === `/admin/jobs/candidates/${slug}` ||
                                pathname === `/admin/jobs/addjob/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Jobs List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/addjob">
                        <li
                          className={`row ${
                            pathname === "/admin/jobs/addjob" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobs/addjob"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Job
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/import">
                        <li
                          className={`row ${
                            pathname === "/admin/jobs/import" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobs/import"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Import Job
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/csv-upload">
                        <li
                          className={`row ${
                            pathname === "/admin/jobs/csv-upload"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobs/csv-upload"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Import Job From CSV/XLSX
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/importlist">
                        <li
                          className={`row ${
                            pathname === "/admin/jobs/importlist"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/jobs/importlist"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Auto Job Import List
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowPaymentHistoryDropdown(!showPaymentHistoryDropdown)
                  }
                >
                  <div id="icon">
                    <PaymentIcon />
                  </div>
                  <p id="title">Payment History</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showPaymentHistoryDropdown && ( */}
                <div
                  className={`dropdown ${
                    showPaymentHistoryDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/transaction-list">
                        <li
                          className={`row ${
                            pathname === "/admin/transaction-list"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/transaction-list"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Transaction List
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <div id="icon">
                    <PaidIcon />
                  </div>
                  <p id="title">Currency</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showCurrencyDropdown && ( */}
                <div
                  className={`dropdown ${showCurrencyDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/currencies/index">
                        <li
                          className={`row ${
                            pathname === "/admin/currencies/index" ||
                            pathname ===
                              `/admin/currencies/edit-currency/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/currencies/index" ||
                                pathname ===
                                  `/admin/currencies/edit-currency/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Currency List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/currencies/add-currency">
                        <li
                          className={`row ${
                            pathname === "/admin/currencies/add-currency"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/currencies/add-currency"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Currency
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowNewsletterDropdown(!showNewsletterDropdown)
                  }
                >
                  <div id="icon">
                    <UnsubscribeIcon />
                  </div>
                  <p id="title">Manage Newsletter</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showNewsletterDropdown && ( */}
                <div
                  className={`dropdown ${showNewsletterDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/newsletter-list/index">
                        <li
                          className={`row ${
                            pathname === "/admin/newsletter-list/index" ||
                            pathname ===
                              "/admin/newsletter-list/add-newsletter" ||
                            pathname ===
                              `/admin/newsletter-list/edit-newsletter/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/newsletter-list/index" ||
                                pathname ===
                                  "/admin/newsletter-list/add-newsletter" ||
                                pathname ===
                                  `/admin/newsletter-list/edit-newsletter/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Newsletter List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/send-newsletter-email">
                        <li
                          className={`row ${
                            pathname === "/admin/send-newsletter-email"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/send-newsletter-email"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Send Newsletter Email
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/email-logs">
                        <li
                          className={`row ${
                            pathname === "/admin/email-logs" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/email-logs"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Email Logs
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/unsubscribed-user-list">
                        <li
                          className={`row ${
                            pathname === "/admin/unsubscribed-user-list"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/unsubscribed-user-list"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Unsubscribe User List
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowBannerAdvertisementDropdown(
                      !showBannerAdvertisementDropdown
                    )
                  }
                >
                  <div id="icon">
                    <FeaturedVideoIcon />
                  </div>
                  <p id="title">Banner Advertisement</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showBannerAdvertisementDropdown && ( */}
                <div
                  className={`dropdown ${
                    showBannerAdvertisementDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/banners/index">
                        <li
                          className={`row ${
                            pathname === "/admin/banners/index" ||
                            pathname === `/admin/banners/edit-banner/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/banners/index" ||
                                pathname ===
                                  `/admin/banners/edit-banner/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Banner List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/banners/add-banner">
                        <li
                          className={`row ${
                            pathname === "/admin/banners/add-banner"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/banners/add-banner"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Banner
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                >
                  <div id="icon">
                    <LibraryBooksIcon />
                  </div>
                  <p id="title">Course</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showCourseDropdown && ( */}
                <div className={`dropdown ${showCourseDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/course/index">
                        <li
                          className={`row ${
                            pathname === "/admin/course/index" ||
                            pathname === `/admin/course/edit-course/${slug}` ||
                            pathname === `/admin/course/${slug}/index` ||
                            pathname ===
                              `/admin/specializations/addspecialization/${slug}` ||
                            pathname ===
                              `/admin/specializations/editspecialization/${slug1}/${slug2}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/course/index" ||
                                pathname ===
                                  `/admin/course/edit-course/${slug}` ||
                                pathname === `/admin/course/${slug}/index` ||
                                pathname ===
                                  `/admin/specializations/addspecialization/${slug}` ||
                                pathname ===
                                  `/admin/specializations/editspecialization/${slug1}/${slug2}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Course List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/course/add-course">
                        <li
                          className={`row ${
                            pathname === "/admin/course/add-course"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/course/add-course"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Course
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowContentDropdown(!showContentDropdown)}
                >
                  <div id="icon">
                    <MonitorIcon />
                  </div>
                  <p id="title">Contents</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showContentDropdown && ( */}
                <div
                  className={`dropdown ${showContentDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/content/index">
                        <li
                          className={`row ${
                            pathname === "/admin/content/index" ||
                            pathname === `/admin/content/edit-content/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/content/index" ||
                                pathname ===
                                  `/admin/content/edit-content/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Pages List
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowEmailTemplateDropdown(!showEmailTemplateDropdown)
                  }
                >
                  <div id="icon">
                    <EmailIcon />
                  </div>
                  <p id="title">Email Templates</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showEmailTemplateDropdown && ( */}
                <div
                  className={`dropdown ${
                    showEmailTemplateDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/emailtemplates">
                        <li
                          className={`row ${
                            pathname === "/admin/emailtemplates" ||
                            pathname === `/admin/content/edit-content/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/emailtemplates" ||
                                pathname ===
                                  `/admin/content/edit-content/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Email Template Setting
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowBlogsDropdown(!showBlogsDropdown)}
                >
                  <div id="icon">
                    <RateReviewIcon />
                  </div>
                  <p id="title">Blogs</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showBlogsDropdown && ( */}
                <div className={`dropdown ${showBlogsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/blogs/index">
                        <li
                          className={`row ${
                            pathname === "/admin/blogs/index" ||
                            pathname === `/admin/blogs/edit-blog/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/blogs/index" ||
                                pathname === `/admin/blogs/edit-blog/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Blog List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/blogs/add-blog">
                        <li
                          className={`row ${
                            pathname === "/admin/blogs/add-blog" ? "active" : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/blogs/add-blog"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Blog
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowSlidersDropdown(!showSlidersDropdown)}
                >
                  <div id="icon">
                    <ViewCarouselIcon />
                  </div>
                  <p id="title">Sliders</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showSlidersDropdown && ( */}
                <div
                  className={`dropdown ${showSlidersDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/sliders/index">
                        <li
                          className={`row ${
                            pathname === "/admin/sliders/index" ||
                            pathname === `/admin/sliders/edit-slider/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/sliders/index" ||
                                pathname ===
                                  `/admin/sliders/edit-slider/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Slider List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/sliders/add-slider">
                        <li
                          className={`row ${
                            pathname === "/admin/sliders/add-slider"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/sliders/add-slider"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Slider
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowAnnouncementDropdown(!showAnnouncementDropdown)
                  }
                >
                  <div id="icon">
                    <CampaignIcon />
                  </div>
                  <p id="title">Announcement</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showAnnouncementDropdown && ( */}
                <div
                  className={`dropdown ${
                    showAnnouncementDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/announcements/index">
                        <li
                          className={`row ${
                            pathname === "/admin/announcements/index" ||
                            pathname ===
                              `/admin/announcements/edit-announcement/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname === "/admin/announcements/index" ||
                                pathname ===
                                  `/admin/announcements/edit-announcement/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Announcement List
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/announcements/add-announcement">
                        <li
                          className={`row ${
                            pathname === "/admin/announcements/add-announcement"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname ===
                                "/admin/announcements/add-announcement"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Add Announcement
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowKeywordsDropdown(!showKeywordsDropdown)}
                >
                  <div id="icon">
                    <FindInPageIcon />
                  </div>
                  <p id="title">Keywords</p>

                  <div id="icon2">
                    <ExpandMoreIcon />
                  </div>
                </li>
                {/* {showKeywordsDropdown && ( */}
                <div
                  className={`dropdown ${showKeywordsDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/keywords/search-keywords/index">
                        <li
                          className={`row ${
                            pathname ===
                              "/admin/keywords/search-keywords/index" ||
                            pathname ===
                              "/admin/keywords/search-keywords/add-search-keyword" ||
                            pathname ===
                              `/admin/keywords/search-keywords/edit-search-keyword/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname ===
                                  "/admin/keywords/search-keywords/index" ||
                                pathname ===
                                  "/admin/keywords/search-keywords/add-search-keyword" ||
                                pathname ===
                                  `/admin/keywords/search-keywords/edit-search-keyword/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Search Keywords
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/keywords/job-keywords/index">
                        <li
                          className={`row ${
                            pathname === "/admin/keywords/job-keywords/index" ||
                            pathname ===
                              "/admin/keywords/job-keywords/add-job-keyword" ||
                            pathname ===
                              `/admin/keywords/job-keywords/edit-job-keyword/${slug}`
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname ===
                                  "/admin/keywords/job-keywords/index" ||
                                pathname ===
                                  "/admin/keywords/job-keywords/add-job-keyword" ||
                                pathname ===
                                  `/admin/keywords/job-keywords/edit-job-keyword/${slug}`
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Job Keywords
                          </p>
                        </li>
                      </Link>
                      <Link href="/admin/keywords/requested-keywords/index">
                        <li
                          className={`row ${
                            pathname ===
                            "/admin/keywords/requested-keywords/index"
                              ? "active"
                              : ""
                          }`}
                        >
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p
                            id="innerTitle"
                            style={{
                              color:
                                pathname ===
                                "/admin/keywords/requested-keywords/index"
                                  ? "#f3734c"
                                  : "inherit",
                            }}
                          >
                            Requested Keywords
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          {adminID != 1 ? (
            <div className="Sidebar adminSidebarNavLinks">
              <div className="sidebarEachHeader">
                <h3>Menu</h3>
                <p className="adminSidebarPlusNavLink" onClick={toggle1}>
                  {isJobseekerNavLinksVisible ? (
                    <i className="fa-solid fa-circle-minus"></i>
                  ) : (
                    <i className="fa-solid fa-circle-plus"></i>
                  )}
                </p>
              </div>
              <ul
                className="SidebarList"
                style={{
                  display: isJobseekerNavLinksVisible ? "block" : "none",
                }}
              >
                <Link href="/admin/dashboard">
                  <li className="row">
                    <div id="icon">
                      <DashboardIcon />
                    </div>
                    <p id="title">Dashboard</p>
                  </li>
                </Link>

                <li
                  className="row"
                  onClick={() =>
                    setShowConfigurationDropdown(!showConfigurationDropdown)
                  }
                >
                  <div id="icon">
                    <PermDataSettingIcon />
                  </div>
                  <p id="title">Configuration</p>
                  {showConfigurationDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showConfigurationDropdown && ( */}
                <div
                  className={`dropdown ${
                    showConfigurationDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/changeusername">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Username</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-password">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Password</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-email">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Email</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>

                {userAccess[0]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowEmployerDropdown(!showEmployerDropdown)
                      }
                    >
                      <div id="icon">
                        <BadgeIcon />
                      </div>
                      <p id="title">Employers</p>
                      {showEmployerDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showEmployerDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showEmployerDropdown ? "open" : ""
                      }`}
                    >
                      <div
                        className="dropdown-item"
                        onClick={() => console.log("Change Username clicked")}
                      >
                        <ul className="SidebarListInternal">
                          <Link href="/admin/employer-list">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Employer List</p>
                            </li>
                          </Link>
                          {userAccess[0]?.Add === 1 && (
                            <>
                              <Link href="/admin/employer-list/add-employer">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Employer</p>
                                </li>
                              </Link>
                            </>
                          )}
                          <Link href="/admin/homepage-slider">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Home Page Slider</p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}
                {userAccess[2]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowJobseekerDropdown(!showJobseekerDropdown)
                      }
                    >
                      <div id="icon">
                        <GroupIcon />
                      </div>
                      <p id="title">Jobseeker</p>
                      {showJobseekerDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showJobseekerDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showJobseekerDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/jobseeker/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Jobseekers List</p>
                            </li>
                          </Link>
                          {userAccess[2]?.Add === 1 && (
                            <>
                              <Link href="/admin/jobseeker/add-jobseeker">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Jobseekers</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[7]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowCategoriesDropdown(!showCategoriesDropdown)
                      }
                    >
                      <div id="icon">
                        <CategoryIcon />
                      </div>
                      <p id="title">Categories</p>
                      {showCategoriesDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showCategoriesDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showCategoriesDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/categories/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Categories List</p>
                            </li>
                          </Link>
                          {userAccess[7]?.Add === 1 && (
                            <Link href="/admin/categories/add-category">
                              <li className="row">
                                <div id="innerIcon">
                                  <RadioButtonCheckedIcon />
                                </div>
                                <p id="innerTitle">Add Category</p>
                              </li>
                            </Link>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[8]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                    >
                      <div id="icon">
                        <AddchartIcon />
                      </div>
                      <p id="title">Skills</p>
                      {showSkillsDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showSkillsDropdown && ( */}
                    <div
                      className={`dropdown ${showSkillsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/skill/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Skills List</p>
                            </li>
                          </Link>
                          {userAccess[8]?.Add === 1 && (
                            <>
                              <Link href="/admin/skill/add-skill">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Skills</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[1]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowDesignationsDropdown(!showDesignationsDropdown)
                      }
                    >
                      <div id="icon">
                        <SchoolIcon />
                      </div>
                      <p id="title">Designations</p>
                      {showDesignationsDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showDesignationsDropdown && ( */}

                    <div
                      className={`dropdown ${
                        showDesignationsDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/designation">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Designations List</p>
                            </li>
                          </Link>
                          {userAccess[1]?.Module === 1 && (
                            <>
                              <Link href="/admin/designation/add">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Designations</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[3]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                    >
                      <div id="icon">
                        <WorkIcon />
                      </div>
                      <p id="title">Jobs</p>
                      {showJobsDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showJobsDropdown && ( */}
                    <div
                      className={`dropdown ${showJobsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/jobs">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Jobs List</p>
                            </li>
                          </Link>
                          {userAccess[3]?.Add === 1 && (
                            <>
                              <Link href="/admin/jobs/addjob">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Job</p>
                                </li>
                              </Link>
                              <Link href="/admin/jobs/import">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Import Job</p>
                                </li>
                              </Link>
                              <Link href="/admin/jobs/importlist">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Auto Job Import List</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[4]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowCurrencyDropdown(!showCurrencyDropdown)
                      }
                    >
                      <div id="icon">
                        <PaidIcon />
                      </div>
                      <p id="title">Currency</p>
                      {showCurrencyDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showCurrencyDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showCurrencyDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/currencies/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Currency List</p>
                            </li>
                          </Link>
                          {userAccess[4]?.Add === 1 && (
                            <>
                              <Link href="/admin/currencies/add-currency">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Currency</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userAccess[5]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                    >
                      <div id="icon">
                        <LibraryBooksIcon />
                      </div>
                      <p id="title">Course</p>
                      {showCourseDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showCourseDropdown && ( */}
                    <div
                      className={`dropdown ${showCourseDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/course/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Course List</p>
                            </li>
                          </Link>
                          {userAccess[5]?.Add === 1 && (
                            <>
                              <Link href="/admin/course/add-course">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Course</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[9]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowContentDropdown(!showContentDropdown)
                      }
                    >
                      <div id="icon">
                        <MonitorIcon />
                      </div>
                      <p id="title">Contents</p>
                      {showContentDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showContentDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showContentDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/content/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Pages List</p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}
                {userAccess[10]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() =>
                        setShowEmailTemplateDropdown(!showEmailTemplateDropdown)
                      }
                    >
                      <div id="icon">
                        <EmailIcon />
                      </div>
                      <p id="title">Email Templates</p>
                      {showEmailTemplateDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showEmailTemplateDropdown && ( */}
                    <div
                      className={`dropdown ${
                        showEmailTemplateDropdown ? "open" : ""
                      }`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/emailtemplates">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Email Template Setting</p>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* )} */}

                {userAccess[6]?.Module === 1 && (
                  <>
                    <li
                      className="row"
                      onClick={() => setShowBlogsDropdown(!showBlogsDropdown)}
                    >
                      <div id="icon">
                        <RateReviewIcon />
                      </div>
                      <p id="title">Blogs</p>
                      {showBlogsDropdown ? (
                        <div id="icon2">
                          <RemoveIcon />
                        </div>
                      ) : (
                        <div id="icon2">
                          <AddIcon />
                        </div>
                      )}
                    </li>
                    {/* {showBlogsDropdown && ( */}
                    <div
                      className={`dropdown ${showBlogsDropdown ? "open" : ""}`}
                    >
                      <div className="dropdown-item">
                        <ul className="SidebarListInternal">
                          <Link href="/admin/blogs/index">
                            <li className="row">
                              <div id="innerIcon">
                                <RadioButtonCheckedIcon />
                              </div>
                              <p id="innerTitle">Blog List</p>
                            </li>
                          </Link>
                          {userAccess[6]?.Add === 1 && (
                            <>
                              <Link href="/admin/blogs/add-blog">
                                <li className="row">
                                  <div id="innerIcon">
                                    <RadioButtonCheckedIcon />
                                  </div>
                                  <p id="innerTitle">Add Blog</p>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </ul>
            </div>
          ) : (
            <div className="Sidebar adminSidebarNavLinks">
              <div className="sidebarEachHeader">
                <h3>Menu</h3>
                <div className="adminSidebarPlusNavLink" onClick={toggle1}>
                  {isJobseekerNavLinksVisible ? (
                    <i className="fa-solid fa-circle-minus"></i>
                  ) : (
                    <i className="fa-solid fa-circle-plus"></i>
                  )}
                </div>
              </div>
              <ul
                className="SidebarList"
                style={{
                  display: isJobseekerNavLinksVisible ? "block" : "none",
                }}
              >
                <Link href="/admin/dashboard">
                  <li className="row">
                    <div id="icon">
                      <DashboardIcon />
                    </div>
                    <p id="title">Dashboard</p>
                  </li>
                </Link>

                <li
                  className="row"
                  onClick={() =>
                    setShowConfigurationDropdown(!showConfigurationDropdown)
                  }
                >
                  <div id="icon">
                    <PermDataSettingIcon />
                  </div>
                  <p id="title">Configuration</p>
                  {showConfigurationDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showConfigurationDropdown && ( */}
                <div
                  className={`dropdown ${
                    showConfigurationDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/change-username">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Username</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-password">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Password</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-email">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Email</p>
                        </li>
                      </Link>
                      <Link href="/admin/security-questions">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Security Questions</p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-plans">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Manage Plans</p>
                        </li>
                      </Link>
                      <Link href="/admin/set-contactus-address">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Set Contact Us Address</p>
                        </li>
                      </Link>
                      <Link href="/admin/slogan-text">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Slogan Text</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-logo">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Logo</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-favicon">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Favicon</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-color-theme">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Color Theme</p>
                        </li>
                      </Link>
                      <Link href="/admin/change-payment-details">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Payment Details</p>
                        </li>
                      </Link>

                      <Link href="/admin/change-color-theme">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Change Color Theme</p>
                        </li>
                      </Link>
                      <Link href="/admin/meta-management">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Meta Management</p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-subadmins">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Manage Sub Admins</p>
                        </li>
                      </Link>
                      <Link href="/admin/smtp-settings">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">SMTP Setting</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}

                <li
                  className="row"
                  onClick={() => setShowSettingDropdown(!showSettingDropdown)}
                >
                  <div id="icon">
                    <SettingsApplicationsIcon />
                  </div>
                  <p id="title">Setting</p>
                  {showSettingDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showSettingDropdown && ( */}
                <div
                  className={`dropdown ${showSettingDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/site-setting">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Site Setting</p>
                        </li>
                      </Link>
                      <Link href="/admin/manage-email-setting">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Manage Email Setting</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowEmployerDropdown(!showEmployerDropdown)}
                >
                  <div id="icon">
                    <BadgeIcon />
                  </div>
                  <p id="title">Employers</p>
                  {showEmployerDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showEmployerDropdown && ( */}
                <div
                  className={`dropdown ${showEmployerDropdown ? "open" : ""}`}
                >
                  <div
                    className="dropdown-item"
                    onClick={() => console.log("Change Username clicked")}
                  >
                    <ul className="SidebarListInternal">
                      <Link href="/admin/employer-list">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Employer List</p>
                        </li>
                      </Link>
                      <Link href="/admin/employer-list/add-employer">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Employer</p>
                        </li>
                      </Link>
                      <Link href="/admin/homepage-slider">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Home Page Slider</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowJobseekerDropdown(!showJobseekerDropdown)
                  }
                >
                  <div id="icon">
                    <GroupIcon />
                  </div>
                  <p id="title">Jobseeker</p>
                  {showJobseekerDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showJobseekerDropdown && ( */}
                <div
                  className={`dropdown ${showJobseekerDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/jobseeker/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Jobseekers List</p>
                        </li>
                      </Link>
                      <Link href="/admin/jobseeker/add-jobseeker">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Jobseekers</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowCategoriesDropdown(!showCategoriesDropdown)
                  }
                >
                  <div id="icon">
                    <CategoryIcon />
                  </div>
                  <p id="title">Categories</p>
                  {showCategoriesDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showCategoriesDropdown && ( */}
                <div
                  className={`dropdown ${showCategoriesDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/categories/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Categories List</p>
                        </li>
                      </Link>
                      <Link href="/admin/categories/add-category">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Category</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowSwearwordsDropdown(!showSwearwordsDropdown)
                  }
                >
                  <div id="icon">
                    <AbcIcon />
                  </div>
                  <p id="title">Swear Words</p>
                  {showSwearwordsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showSwearwordsDropdown && ( */}
                <div
                  className={`dropdown ${showSwearwordsDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/swear-words/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Swear Words List</p>
                        </li>
                      </Link>
                      <Link href="/admin/swear-words/add-swear-words">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Swear Words</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                >
                  <div id="icon">
                    <AddchartIcon />
                  </div>
                  <p id="title">Skills</p>
                  {showSkillsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showSkillsDropdown && ( */}
                <div className={`dropdown ${showSkillsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/skill/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Skills List</p>
                        </li>
                      </Link>
                      <Link href="/admin/skill/add-skill">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Skills</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowDesignationsDropdown(!showDesignationsDropdown)
                  }
                >
                  <div id="icon">
                    <SchoolIcon />
                  </div>
                  <p id="title">Designations</p>
                  {showDesignationsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showDesignationsDropdown && ( */}
                <div
                  className={`dropdown ${
                    showDesignationsDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/designation">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Designations List</p>
                        </li>
                      </Link>
                      <Link href="/admin/designation/add">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Designations</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                >
                  <div id="icon">
                    <WorkIcon />
                  </div>
                  <p id="title">Jobs</p>
                  {showJobsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showJobsDropdown && ( */}
                <div className={`dropdown ${showJobsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/jobs">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Jobs List</p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/addjob">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Job</p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/import">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Import Job</p>
                        </li>
                      </Link>
                      <Link href="/admin/jobs/importlist">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Auto Job Import List</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowPaymentHistoryDropdown(!showPaymentHistoryDropdown)
                  }
                >
                  <div id="icon">
                    <PaymentIcon />
                  </div>
                  <p id="title">Payment History</p>
                  {showPaymentHistoryDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showPaymentHistoryDropdown && ( */}
                <div
                  className={`dropdown ${
                    showPaymentHistoryDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/transaction-list">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Transaction List</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <div id="icon">
                    <PaidIcon />
                  </div>
                  <p id="title">Currency</p>
                  {showCurrencyDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showCurrencyDropdown && ( */}
                <div
                  className={`dropdown ${showCurrencyDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/currencies/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Currency List</p>
                        </li>
                      </Link>
                      <Link href="/admin/currencies/add-currency">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Currency</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowNewsletterDropdown(!showNewsletterDropdown)
                  }
                >
                  <div id="icon">
                    <UnsubscribeIcon />
                  </div>
                  <p id="title">Manage Newsletter</p>
                  {showNewsletterDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showNewsletterDropdown && ( */}
                <div
                  className={`dropdown ${showNewsletterDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/newsletter-list/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Newsletter List</p>
                        </li>
                      </Link>
                      <Link href="/admin/send-newsletter-email">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Send Newsletter Email</p>
                        </li>
                      </Link>
                      <Link href="/admin/email-logs">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Email Logs</p>
                        </li>
                      </Link>
                      <Link href="/admin/unsubscribed-user-list">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Unsubscribe User List</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowBannerAdvertisementDropdown(
                      !showBannerAdvertisementDropdown
                    )
                  }
                >
                  <div id="icon">
                    <FeaturedVideoIcon />
                  </div>
                  <p id="title">Banner Advertisement</p>
                  {showBannerAdvertisementDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showBannerAdvertisementDropdown && ( */}
                <div
                  className={`dropdown ${
                    showBannerAdvertisementDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/banners/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Banner List</p>
                        </li>
                      </Link>
                      <Link href="/admin/banners/add-banner">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Banner</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                >
                  <div id="icon">
                    <LibraryBooksIcon />
                  </div>
                  <p id="title">Course</p>
                  {showCourseDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showCourseDropdown && ( */}
                <div className={`dropdown ${showCourseDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/course/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Course List</p>
                        </li>
                      </Link>
                      <Link href="/admin/course/add-course">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Course</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowContentDropdown(!showContentDropdown)}
                >
                  <div id="icon">
                    <MonitorIcon />
                  </div>
                  <p id="title">Contents</p>
                  {showContentDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showContentDropdown && ( */}
                <div
                  className={`dropdown ${showContentDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/content/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Pages List</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowEmailTemplateDropdown(!showEmailTemplateDropdown)
                  }
                >
                  <div id="icon">
                    <EmailIcon />
                  </div>
                  <p id="title">Email Templates</p>
                  {showEmailTemplateDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showEmailTemplateDropdown && ( */}
                <div
                  className={`dropdown ${
                    showEmailTemplateDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/emailtemplates">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Email Template Setting</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowBlogsDropdown(!showBlogsDropdown)}
                >
                  <div id="icon">
                    <RateReviewIcon />
                  </div>
                  <p id="title">Blogs</p>
                  {showBlogsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showBlogsDropdown && ( */}
                <div className={`dropdown ${showBlogsDropdown ? "open" : ""}`}>
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/blogs/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Blog List</p>
                        </li>
                      </Link>
                      <Link href="/admin/blogs/add-blog">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Blog</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowSlidersDropdown(!showSlidersDropdown)}
                >
                  <div id="icon">
                    <ViewCarouselIcon />
                  </div>
                  <p id="title">Sliders</p>
                  {showSlidersDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showSlidersDropdown && ( */}
                <div
                  className={`dropdown ${showSlidersDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/sliders/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Slider List</p>
                        </li>
                      </Link>
                      <Link href="/admin/sliders/add-slider">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Slider</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() =>
                    setShowAnnouncementDropdown(!showAnnouncementDropdown)
                  }
                >
                  <div id="icon">
                    <CampaignIcon />
                  </div>
                  <p id="title">Announcement</p>
                  {showAnnouncementDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showAnnouncementDropdown && ( */}
                <div
                  className={`dropdown ${
                    showAnnouncementDropdown ? "open" : ""
                  }`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/announcements/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Announcement List</p>
                        </li>
                      </Link>
                      <Link href="/admin/announcements/add-announcement">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Add Announcement</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
                <li
                  className="row"
                  onClick={() => setShowKeywordsDropdown(!showKeywordsDropdown)}
                >
                  <div id="icon">
                    <FindInPageIcon />
                  </div>
                  <p id="title">Keywords</p>
                  {showKeywordsDropdown ? (
                    <div id="icon2">
                      <RemoveIcon />
                    </div>
                  ) : (
                    <div id="icon2">
                      <AddIcon />
                    </div>
                  )}
                </li>
                {/* {showKeywordsDropdown && ( */}
                <div
                  className={`dropdown ${showKeywordsDropdown ? "open" : ""}`}
                >
                  <div className="dropdown-item">
                    <ul className="SidebarListInternal">
                      <Link href="/admin/keywords/search-keywords/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Search Keywords</p>
                        </li>
                      </Link>
                      <Link href="/admin/keywords/job-keywords/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Job Keywords</p>
                        </li>
                      </Link>
                      <Link href="/admin/keywords/requested-keywords/index">
                        <li className="row">
                          <div id="innerIcon">
                            <RadioButtonCheckedIcon />
                          </div>
                          <p id="innerTitle">Requested Keywords</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* )} */}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default APSidebar;
