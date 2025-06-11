"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const tokenKey = Cookies.get("employerToken");
  const router = useRouter();
  const { t } = useTranslation("common");

  const [isQuickLinksVisible, setIsQuickLinksVisible] = useState(false);
  const [isDashboardLinksVisible, setIsDashboardLinksVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0 or a default value

  const toggle1 = () => {
    setIsQuickLinksVisible(!isQuickLinksVisible);
  };
  const toggle2 = () => {
    setIsDashboardLinksVisible(!isDashboardLinksVisible);
  };

  useEffect(() => {
    // Set initial screen width on mount
    setScreenWidth(window.innerWidth);

    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        window.location.reload();
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
        title: t("employerSidebar.confirmTitle"),
        text: t("employerSidebar.confirmTxt"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("employerSidebar.yes"),
        cancelButtonText: t("employerSidebar.no"),
      });
      if (confirmationResult.isConfirmed) {
        const response = await axios.post(BaseApi + "/users/logout", null, {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        });
        Cookies.remove("employerToken");
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
          title: t("employerSidebar.successTitle"),
        });
      }
    } catch (error) {
      Swal.fire({
        title: t("employerSidebar.failedTitle"),
        icon: "error",
        confirmButtonText: t("employerSidebar.close"),
      });
      console.log("Cannot logout!");
    }
  };


  return (
    <>
      {screenWidth > 768 ? (
        <>
          <div className="SidebarSection1 pe-4">
            <div className="SBHeader">
              <h3>{t("employerSidebar.quickLinks")}</h3>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className="SBBody">
              <Link
                href="/employer/job/create-job"
                className="bodyItem SidebarCreatJob"
              >
                <div className="SidebarImages SidebarCreatJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon1color.png"
                    alt="icon1"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.createJob")}
                </div>
              </Link>
              <Link
                href="/employer/manage-jobs"
                className="bodyItem SidebarManageJob"
              >
                <div className="SidebarImages SidebarManageJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon2color.png"
                    alt="icon2"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.manageJobs")}
                </div>
              </Link>
              <Link
                href="/employer/payment-history"
                className="bodyItem SidebarPaymentJob"
              >
                <div className="SidebarImages SidebarPaymentJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon3color.png"
                    alt="icon3"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.paymentHistory")}
                </div>
              </Link>
              <Link
                href="/employer/favourite-list"
                className="bodyItem SidebarFavouriteJob"
              >
                <div className="SidebarImages SidebarFavouriteJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon4color.png"
                    alt="icon4"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.favouriteList")}
                </div>
              </Link>
              <Link
                href="/employer/import-jobseekers"
                className="bodyItem SidebarImportJob"
              >
                <div className="SidebarImages SidebarImportJobBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon5color.png"
                    alt="icon5"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.importJobseekers")}
                </div>
              </Link>
            </div>
          </div>
          <div className="SidebarSection2 pe-4">
            <div className="SBHeader mt-5">
              <h3>{t("employerSidebar.myDashboard")}</h3>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className="body">
              <Link
                href="/employer/mail-history"
                className="bodyItem SidebarMailHistory"
              >
                <div className="SidebarImages SidebarMailHistoryBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon6color.png"
                    alt="icon6"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.mailHistory")}
                </div>
              </Link>
              <Link
                href="/employer/my-profile"
                className="bodyItem SidebarMyProfile"
              >
                <div className="SidebarImages SidebarMyProfileBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon7color.png"
                    alt="icon7"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.myProfile")}
                </div>
              </Link>
              <Link
                href="/employer/edit-profile"
                className="bodyItem SidebarEditProfile"
              >
                <div className="SidebarImages SidebarEditProfileBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon8color.png"
                    alt="icon8"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.editProfile")}
                </div>
              </Link>
              <Link
                href="/employer/change-password"
                className="bodyItem SidebarChangePass"
              >
                <div className="SidebarImages SidebarChangePassBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon9color.png"
                    alt="icon9"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.changePassword")}
                </div>
              </Link>
              <Link
                href="/employer/change-logo"
                className="bodyItem SidebarChangeLogo"
              >
                <div className="SidebarImages SidebarChangeLogoBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon10color.png"
                    alt="icon10"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.changeLogo")}
                </div>
              </Link>
              <div className="bodyItem SidebarLogOut">
                <div className="SidebarImages SidebarLogOutBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon11color.png"
                    alt="icon11"
                  />
                </div>
                <div className="menuTitle" onClick={handleLogOut}>
                  {t("employerSidebar.logout")}
                </div>
              </div>
              <Link
                href="/employer/delete-account"
                className="bodyItem SidebarDeleteAcc"
              >
                <div className="SidebarImages SidebarDeleteAccBg">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    className=""
                    src="/Images/employerSide/icon12color.png"
                    alt="icon12"
                  />
                </div>
                <div className="menuTitle">
                  {t("employerSidebar.deleteAccount")}
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="SidebarSection1 pe-4">
            <div className="SBHeader">
              <div className="sidebarEachHeader">
                <h3>{t("employerSidebar.quickLinks")}</h3>
                <div className="sidebarPlusLink" onClick={toggle1}>
                  {isQuickLinksVisible ? (
                    <i class="fa-solid fa-circle-minus"></i>
                  ) : (
                    <i class="fa-solid fa-circle-plus"></i>
                  )}
                </div>
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
                    href="/employer/job/create-job"
                    className="bodyItem SidebarCreatJob"
                  >
                    <div className="SidebarImages SidebarCreatJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon1color.png"
                        alt="icon1"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.createJob")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/manage-jobs"
                    className="bodyItem SidebarManageJob"
                  >
                    <div className="SidebarImages SidebarManageJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon2color.png"
                        alt="icon2"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.manageJobs")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/payment-history"
                    className="bodyItem SidebarPaymentJob"
                  >
                    <div className="SidebarImages SidebarPaymentJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon3color.png"
                        alt="icon3"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.paymentHistory")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/favourite-list"
                    className="bodyItem SidebarFavouriteJob"
                  >
                    <div className="SidebarImages SidebarFavouriteJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon4color.png"
                        alt="icon4"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.favouriteList")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/import-jobseekers"
                    className="bodyItem SidebarImportJob"
                  >
                    <div className="SidebarImages SidebarImportJobBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon5color.png"
                        alt="icon5"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.importJobseekers")}
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="SidebarSection2 pe-4">
            <div className="SBHeader mt-3">
              <div className="sidebarEachHeader">
                <h3>{t("employerSidebar.myDashboard")}</h3>
                <div className="sidebarPlusLink" onClick={toggle2}>
                  {isDashboardLinksVisible ? (
                    <i class="fa-solid fa-circle-minus"></i>
                  ) : (
                    <i class="fa-solid fa-circle-plus"></i>
                  )}
                </div>
              </div>
              <hr style={{ border: "1px solid rgb(211 209 209)" }} />
            </div>
            <div className={`SBBody ${isDashboardLinksVisible ? "open" : ""}`}>
              <ul
                style={{
                  display: isDashboardLinksVisible ? "block" : "none",
                }}
              >
                <li>
                  <Link
                    href="/employer/mail-history"
                    className="bodyItem SidebarMailHistory"
                  >
                    <div className="SidebarImages SidebarMailHistoryBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon6color.png"
                        alt="icon6"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.mailHistory")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/my-profile"
                    className="bodyItem SidebarMyProfile"
                  >
                    <div className="SidebarImages SidebarMyProfileBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon7color.png"
                        alt="icon7"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.myProfile")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/edit-profile"
                    className="bodyItem SidebarEditProfile"
                  >
                    <div className="SidebarImages SidebarEditProfileBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon8color.png"
                        alt="icon8"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.editProfile")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/change-password"
                    className="bodyItem SidebarChangePass"
                  >
                    <div className="SidebarImages SidebarChangePassBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon9color.png"
                        alt="icon9"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.changePassword")}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/change-logo"
                    className="bodyItem SidebarChangeLogo"
                  >
                    <div className="SidebarImages SidebarChangeLogoBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon10color.png"
                        alt="icon10"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.changeLogo")}
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="bodyItem SidebarLogOut">
                    <div className="SidebarImages SidebarLogOutBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon11color.png"
                        alt="icon11"
                      />
                    </div>
                    <div className="menuTitle" onClick={handleLogOut}>
                      {t("employerSidebar.logout")}
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="/employer/delete-account"
                    className="bodyItem SidebarDeleteAcc"
                  >
                    <div className="SidebarImages SidebarDeleteAccBg">
                      <Image
                        width={34}
                        height={34}
                        unoptimized={true}
                        className=""
                        src="/Images/employerSide/icon12color.png"
                        alt="icon12"
                      />
                    </div>
                    <div className="menuTitle">
                      {t("employerSidebar.deleteAccount")}
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

export default Sidebar;
