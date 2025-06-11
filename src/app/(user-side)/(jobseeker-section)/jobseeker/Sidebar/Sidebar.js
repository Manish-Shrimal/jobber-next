"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Link, Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

const Page = () => {
  // const [isActive, setIsActive] = useState(false);

  const tokenKey = Cookies.get("jobseekerToken");
  const router = useRouter();
  const [t, i18n] = useTranslation("common");

  const [isMyprofileLinksVisible, setIsMyprofileLinksVisible] = useState(false);
  const [isQuickLinksVisible, setIsQuickLinksVisible] = useState(false);
  const [isSettingLinksVisible, setIsSettingLinksVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0 or a default value

  const toggle1 = () => {
    setIsMyprofileLinksVisible(!isMyprofileLinksVisible);
  };
  const toggle2 = () => {
    setIsQuickLinksVisible(!isQuickLinksVisible);
  };
  const toggle3 = () => {
    setIsSettingLinksVisible(!isSettingLinksVisible);
  };

  useEffect(() => {
    // Set initial screen width on mount
    setScreenWidth(window.innerWidth);

    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        // window.location.reload();
      }
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      const confirmationResult = await Swal.fire({
        title: t("jobseekerSidebar.confirmTitle"),
        text: t("jobseekerSidebar.confirmTxt"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("jobseekerSidebar.yes"),
        cancelButtonText: t("jobseekerSidebar.no"),
      });
      if (confirmationResult.isConfirmed) {
        const response = await axios.post(BaseApi + "/users/logout", null, {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        });

        // sessionStorage.clear();
        Cookies.remove("jobseekerToken");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
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
          icon: "success",
          title: t("jobseekerSidebar.successTitle"),
        });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        Cookies.remove("jobseekerToken");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
        Swal.fire({
          title: t("tokenExpired.tokenExpired"),
          icon: "warning",
          confirmButtonText: t("jobDescription.close"),
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      }
      Swal.fire({
        title: t("jobseekerSidebar.failedTitle"),
        icon: "error",
        confirmButtonText: t("jobseekerSidebar.close"),
      });
    }
  };

  const handleDeleteAc = async () => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Delete Account",
        text: "Do you want to delete this account?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (confirmationResult.isConfirmed) {
        const response = await axios.post(
          BaseApi + "/users/deleteAccount",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              key: ApiKey,
              token: tokenKey,
            },
          }
        );
        if (response.data.status === 200) {
          sessionStorage.clear();
          router.push("/");
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
            icon: "success",
            title: "Account deleted successfully!",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Could not delete account!",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <>
      {screenWidth > 768 ? (
        <>
          <div className="SidebarSection1 pe-4">
            <div className="SBHeader">
              <h3>{t("jobseekerSidebar.myProfile")}</h3>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className="SBBody">
              <Link
                href="/jobseeker/my-account"
                className="bodyItem SidebarCreatJob"
              >
                <div className="SidebarImages SidebarCreatJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon7color.png"
                    alt="Icon7"
                  />
                </div>
                <div className="menuTitle">
                  {" "}
                  {t("jobseekerSidebar.myProfile")}
                </div>
              </Link>
              <Link
                href="/jobseeker/edit-profile"
                className="bodyItem SidebarManageJob"
              >
                <div className="SidebarImages SidebarManageJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon8color.png"
                    alt="Icon8"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.editProfile")}
                </div>
              </Link>
              <Link
                href="/jobseeker/edit-education"
                className="bodyItem SidebarPaymentJob"
              >
                <div className="SidebarImages SidebarPaymentJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Education-black.png"
                    alt="Education-img"
                  />
                </div>
                <div className="menuTitle">
                  {" "}
                  {t("jobseekerSidebar.education")}
                </div>
              </Link>
              <Link
                href="/jobseeker/edit-experience"
                className="bodyItem SidebarFavouriteJob"
              >
                <div className="SidebarImages SidebarFavouriteJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Experience-Black.png"
                    alt="ExperienceImg"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.experience")}
                </div>
              </Link>
              <Link
                href="/jobseeker/edit-professional"
                className="bodyItem SidebarImportJob"
              >
                <div className="SidebarImages SidebarImportJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Professional-Registration-Black.png"
                    alt="RegistrationImg"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.professionalRegistration")}
                </div>
              </Link>
              <Link
                href="/jobseeker/add-video-cv"
                className="bodyItem SidebarMailHistory"
              >
                <div className="SidebarImages SidebarMailHistoryBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon5color.png"
                    alt="Icon5"
                  />
                </div>
                <div className="menuTitle">{t("jobseekerSidebar.videoCV")}</div>
              </Link>
              <Link
                href="/jobseeker/make-cv"
                className="bodyItem SidebarChangeLogo"
              >
                <div className="SidebarImages SidebarChangeLogoBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Make-A-CV-black.png"
                    alt="CV"
                  />
                </div>
                <div className="menuTitle">{t("jobseekerSidebar.makeCV")}</div>
              </Link>
              <Link
                href="/jobseeker/add-cv-document"
                className="bodyItem SidebarChangeLogo"
              >
                <div className="SidebarImages SidebarChangeLogoBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Make-A-CV-black.png"
                    alt="CV"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.addCvDocuments")}
                </div>
              </Link>
            </div>
          </div>
          <div className="SidebarSection2 pe-4">
            <div className="SBHeader mt-3">
              <h3>{t("jobseekerSidebar.quickLinks")}</h3>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className="body">
              <Link
                href="/jobseeker/payment-history"
                activeClassName="active"
                className="bodyItem SidebarPaymentJob"
              >
                <div className="SidebarImages SidebarPaymentJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon3color.png"
                    alt="Icon3"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.paymentHistory")}
                </div>
              </Link>
              <Link
                href="/jobseeker/alerts/index"
                className="bodyItem SidebarMyProfile"
                activeClassName="active"
              >
                <div className="SidebarImages SidebarMyProfileBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Manage-Alerts.png"
                    alt="Alerts"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.manageAlerts")}
                </div>
              </Link>
              <Link
                href="/jobseeker/saved-jobs"
                activeClassName="active"
                className="bodyItem SidebarFavouriteJob"
              >
                <div className="SidebarImages SidebarFavouriteJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon4color.png"
                    alt="Icon4"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.savedJobs")}
                </div>
              </Link>
              <Link
                href="/jobseeker/applied-jobs"
                activeClassName="active"
                className="bodyItem SidebarChangePass"
              >
                <div className="SidebarImages SidebarChangePassBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/Applied-Jobs-black.png"
                    alt="Applied-Jobs"
                  />
                </div>
                <div className="menuTitle">
                  {" "}
                  {t("jobseekerSidebar.appliedJobs")}
                </div>
              </Link>
              <Link
                href="/search-job"
                activeClassName="Active"
                className="bodyItem SidebarChangeLogo"
              >
                <div className="SidebarImages SidebarChangeLogoBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/jobseekerSide/search-icon.png"
                    alt="search-icon"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.searchJobs")}
                </div>
              </Link>
            </div>
          </div>
          <div className="SidebarSection3 pe-4">
            <div className="SBHeader mt-3">
              <h3 className="text-black">{t("jobseekerSidebar.setting")}</h3>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className="body">
              <Link
                href="/jobseeker/mail-history"
                activeClassName="Active"
                className="bodyItem SidebarMailHistory"
              >
                <div className="SidebarImages SidebarMailHistoryBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon6color.png"
                    alt="Icon6"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.mailHistory")}
                </div>
              </Link>
              <Link
                href="/jobseeker/change-password"
                activeClassName="Active"
                className="bodyItem SidebarChangePass"
              >
                <div className="SidebarImages SidebarChangePassBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon9color.png"
                    alt="Icon9"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.changePassword")}
                </div>
              </Link>
              <Link
                href="/jobseeker/change-profile-picture"
                activeClassName="active"
                className="bodyItem SidebarChangeLogo"
              >
                <div className="SidebarImages SidebarChangeLogoBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon10color.png"
                    alt="Icon10"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.changePhoto")}
                </div>
              </Link>
              <Link
                href="javascript:void(0);"
                activeClassName="active"
                className="bodyItem SidebarImportJob"
              >
                <div className="SidebarImages SidebarImportJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon11color.png"
                    alt="Icon11"
                  />
                </div>
                <div className="menuTitle" onClick={handleLogOut}>
                  {t("jobseekerSidebar.logOut")}
                </div>
              </Link>
              <Link
                href="/jobseeker/delete-account"
                activeClassName="Active"
                className="bodyItem SidebarEditProfile"
              >
                <div className="SidebarImages SidebarEditProfileBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon12color.png"
                    alt="Icon12"
                  />
                </div>
                <div className="menuTitle">
                  {t("jobseekerSidebar.deleteAccount")}
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="SidebarSection1 mt-3 pe-4">
            <div className="SBHeader">
              <div className="sidebarEachHeader">
                <h3>{t("jobseekerSidebar.myProfile")}</h3>
                <Link href="javascript:void(0);" className="sidebarPlusLink" onClick={toggle1}>
                  {isMyprofileLinksVisible ? (
                    <FaCircleMinus />
                  ) : (
                    <FaPlusCircle />
                  )}
                </Link>
              </div>

              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className={`SBBody ${isMyprofileLinksVisible ? "open" : ""}`}>
              <ul
                style={{
                  display: isMyprofileLinksVisible ? "block" : "none",
                }}
              >
                <li>
                  <Link
                    href="/jobseeker/my-account"
                    className="bodyItem SidebarCreatJob"
                  >
                    <div className="SidebarImages SidebarCreatJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon7color.png"
                        alt="Icon7"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.myProfile")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/edit-profile"
                    className="bodyItem SidebarManageJob"
                  >
                    <div className="SidebarImages SidebarManageJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon8color.png"
                        alt="Icon8"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.editProfile")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/edit-education"
                    className="bodyItem SidebarPaymentJob"
                  >
                    <div className="SidebarImages SidebarPaymentJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Education-black.png"
                        alt="Education-black"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.education")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/edit-experience"
                    className="bodyItem SidebarFavouriteJob"
                  >
                    <div className="SidebarImages SidebarFavouriteJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Experience-Black.png"
                        alt="Experience"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.experience")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/edit-professional"
                    className="bodyItem SidebarImportJob"
                  >
                    <div className="SidebarImages SidebarImportJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Professional-Registration-Black.png"
                        alt="Registration"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.professionalRegistration")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/add-video-cv"
                    className="bodyItem SidebarMailHistory"
                  >
                    <div className="SidebarImages SidebarMailHistoryBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon5color.png"
                        alt="Icon5"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.videoCV")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/make-cv"
                    className="bodyItem SidebarChangeLogo"
                  >
                    <div className="SidebarImages SidebarChangeLogoBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Make-A-CV-black.png"
                        alt="CV"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.makeCV")}
                    </div>
                  </Link>
                  <Link
                    href="/jobseeker/add-cv-document"
                    className="bodyItem SidebarChangeLogo sidebarSection1"
                  >
                    <div className="SidebarImages backgroundImagesItem1">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Make-A-CV-black.png"
                        alt="CV"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.addCvDocuments")}
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="SidebarSection2 pe-4">
            <div className="SBHeader mt-3">
              <div className="sidebarEachHeader">
                <h3>{t("jobseekerSidebar.quickLinks")}</h3>
                <Link href="javascript:void(0);" className="sidebarPlusLink" onClick={toggle2}>
                  {isQuickLinksVisible ? <FaCircleMinus /> : <FaPlusCircle />}
                </Link>
              </div>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className={`SBBody ${isQuickLinksVisible ? "open" : ""}`}>
              <ul
                style={{
                  display: isQuickLinksVisible ? "block" : "none",
                }}
              >
                <li>
                  <Link
                    href="/jobseeker/payment-history"
                    activeClassName="active"
                    className="bodyItem SidebarPaymentJob"
                  >
                    <div className="SidebarImages SidebarPaymentJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon3color.png"
                        alt="Icon3"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.paymentHistory")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/alerts/index"
                    className="bodyItem SidebarMyProfile"
                    activeClassName="active"
                  >
                    <div className="SidebarImages SidebarMyProfileBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Manage-Alerts.png"
                        alt="Alerts"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.manageAlerts")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/saved-jobs"
                    activeClassName="active"
                    className="bodyItem SidebarFavouriteJob"
                  >
                    <div className="SidebarImages SidebarFavouriteJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon4color.png"
                        alt="Icon4"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.savedJobs")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/applied-jobs"
                    activeClassName="active"
                    className="bodyItem SidebarChangePass"
                  >
                    <div className="SidebarImages SidebarChangePassBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/Applied-Jobs-black.png"
                        alt="Jobs"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.appliedJobs")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search-job"
                    activeClassName="Active"
                    className="bodyItem SidebarChangeLogo"
                  >
                    <div className="SidebarImages SidebarChangeLogoBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/jobseekerSide/search-icon.png"
                        alt="search"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.searchJobs")}
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="SidebarSection3 pe-4">
            <div className="SBHeader mt-3">
              <div className="sidebarEachHeader">
                <h3 className="text-black">Setting</h3>
                <Link href="javascript:void(0);" className="sidebarPlusLink" onClick={toggle3}>
                  {isSettingLinksVisible ? <FaCircleMinus /> : <FaPlusCircle />}
                </Link>
              </div>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className={`SBBody ${isSettingLinksVisible ? "open" : ""}`}>
              <ul
                style={{
                  display: isSettingLinksVisible ? "block" : "none",
                }}
              >
                <li>
                  <Link
                    href="/jobseeker/mail-history"
                    activeClassName="Active"
                    className="bodyItem SidebarMailHistory"
                  >
                    <div className="SidebarImages SidebarMailHistoryBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon6color.png"
                        alt="Icon6"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.mailHistory")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/change-password"
                    activeClassName="Active"
                    className="bodyItem SidebarChangePass"
                  >
                    <div className="SidebarImages SidebarChangePassBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon9color.png"
                        alt="Icon9"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.changePassword")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/change-profile-picture"
                    activeClassName="active"
                    className="bodyItem SidebarChangeLogo"
                  >
                    <div className="SidebarImages SidebarChangeLogoBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon10color.png"
                        alt="Icon10"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.changePhoto")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="javascript:void(0);"
                    activeClassName="active"
                    className="bodyItem SidebarImportJob"
                  >
                    <div className="SidebarImages SidebarImportJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon11color.png"
                        alt="Icon10"
                      />
                    </div>
                    <div className="menuTitle" onClick={handleLogOut}>
                      {t("jobseekerSidebar.logOut")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseeker/delete-account"
                    activeClassName="Active"
                    className="bodyItem SidebarEditProfile"
                  >
                    <div className="SidebarImages SidebarEditProfileBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon12color.png"
                        alt="Icon12"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("jobseekerSidebar.deleteAccount")}
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
