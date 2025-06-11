"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import ApiKey from "@/app/(api)/ApiKey";
import BaseApi from "@/app/(api)/BaseApi";
import { useRouter } from "next/navigation";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import Image from "next/image";
const Page = () => {
  const config = useRecoilValue(configState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState();
  const [errors, setErrors] = useState();
  const [t, i18n] = useTranslation("common");

  const tokenKey = Cookies.get("employerToken");
  //   let primaryColor = Cookies.get("primaryColor");
  //   let secondaryColor = Cookies.get("secondaryColor");

  let primaryColor = config.primary_color;
  let secondaryColor = config.secondary_color;

  const [hoverFirstButtonColor, setHoverFirstButtonColor] = useState(false);

  const handleFirstButtonMouseEnter = () => {
    setHoverFirstButtonColor(true);
  };

  const handleFirstButtonMouseLeave = () => {
    setHoverFirstButtonColor(false);
  };

  const [hoverSecondButtonColor, setHoverSecondButtonColor] = useState(false);

  const handleSecondButtonMouseEnter = () => {
    setHoverSecondButtonColor(true);
  };

  const handleSecondButtonMouseLeave = () => {
    setHoverSecondButtonColor(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeleteAccount(e.target.value);
    setErrors();
  };

  const handleDeleteAc = async () => {
    try {
      if (!deleteAccount) {
        setErrors(t("employerDeleteAccount.emptyError"));
        return;
      }
      if (deleteAccount.length < 30) {
        setErrors(t("employerDeleteAccount.lengthError"));
        return;
      }
      if (!errors) {
        const confirmationResult = await Swal.fire({
          title: t("employerDeleteAccount.confirmTitle"),
          text: t("employerDeleteAccount.confirmTxt"),
          icon: "question",
          showCancelButton: true,
          confirmButtonText: t("employerDeleteAccount.yes"),
          cancelButtonText: t("employerDeleteAccount.no"),
        });
        if (confirmationResult.isConfirmed) {
          const response = await axios.post(
            BaseApi + "/users/deleteAccount",
            { reason: deleteAccount },
            {
              headers: {
                "Content-Type": "application/json",
                key: ApiKey,
                token: tokenKey,
              },
            }
          );

          Cookies.remove("employerToken");
          Cookies.remove("user_type");
          Cookies.remove("fname");
          router.push("/");
          Swal.fire({
            title: t("employerDeleteAccount.successTitle"),
            icon: "success",
            confirmButtonText: t("employerDeleteAccount.close"),
          });
          setTimeout(function () {
            window.location.reload();
          }, 4000);
          // const Toast = Swal.mixin({
          //   toast: true,
          //   position: "top-end",
          //   showConfirmButton: false,
          //   timer: 3000,
          //   timerProgressBar: true,
          //   didOpen: (toast) => {
          //     toast.addEventListener("mouseenter", Swal.stopTimer);
          //     toast.addEventListener("mouseleave", Swal.resumeTimer);
          //   },
          // });

          // Toast.fire({
          //   icon: "success",
          //   title: "Account deleted successfully!",
          // });
        }
        // }
      }
    } catch (error) {
      if (error.message === "Network Error") {
        Cookies.remove("employerToken");
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
        title: t("employerDeleteAccount.failedTitle"),
        icon: "error",
        confirmButtonText: t("employerDeleteAccount.close"),
      });
      console.log("Cannot delete account!");
    }
  };

  return (
    <>
      <NavBar />

      <div className="container changePassword editProfile">
        <div className="row">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          {loading ? (
            <div className="loader-container"></div>
          ) : (
            <>
              <div
                className="col-lg-9 mb-5"
                style={{
                  borderLeft: "2px solid #e6e8e7",
                  borderRight: "2px solid #e6e8e7",
                }}
              >
                <div className="d-flex mx-3 PageHeader">
                  <Image
                    width={32}
                    height={32}
                    unoptimized={true}
                    src="/Images/employerSide/icon9color.png"
                    alt="icon9"
                  />
                  <h3 className="mx-2">
                    {t("employerDeleteAccount.deleteAccount")}
                  </h3>
                </div>
                <form>
                  <div className="mb-5 mt-5">
                    <div class="form-outline mb-5 DashBoardInputBx">
                      <label class="form-label" for="form3Example1">
                        {t("employerDeleteAccount.reasonOfLeaving")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="text"
                        id="form3Example1"
                        className={`form-control ${errors && "input-error"}`}
                        placeholder={t("employerDeleteAccount.reasonOfLeaving")}
                        value={deleteAccount}
                        name="deleteAccount"
                        onChange={handleChange}
                      />
                      {errors && <div className="text-danger">{errors}</div>}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary button1 mx-3"
                    onClick={handleDeleteAc}
                    style={{
                      backgroundColor: hoverFirstButtonColor
                        ? secondaryColor
                        : primaryColor,
                      border: hoverFirstButtonColor
                        ? secondaryColor
                        : primaryColor,
                    }}
                    onMouseEnter={handleFirstButtonMouseEnter}
                    onMouseLeave={handleFirstButtonMouseLeave}
                  >
                    {t("employerDeleteAccount.deleteButton")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary button2"
                    style={{
                      color: hoverSecondButtonColor
                        ? primaryColor
                        : secondaryColor,
                      backgroundColor: "white",
                      border: hoverSecondButtonColor
                        ? `2px solid ${primaryColor}`
                        : `2px solid ${secondaryColor}`,
                    }}
                    onMouseEnter={handleSecondButtonMouseEnter}
                    onMouseLeave={handleSecondButtonMouseLeave}
                    onClick={() => router.push("/employer/my-profile")}
                  >
                    {t("employerDeleteAccount.cancelButton")}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
