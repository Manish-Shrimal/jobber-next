"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(user-side)/(jobseeker-section)/jobseeker/Sidebar/Sidebar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import axios from "axios";
import ApiKey from "@/app/(api)/ApiKey";
import BaseApi from "@/app/(api)/BaseApi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import Link from "next/link";

const JSChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    conf_password: "",
  });
  const [errors, setErrors] = useState({
    old_password: "",
    new_password: "",
    conf_password: "",
  });

  const config = useRecoilValue(configState);
  const router = useRouter();
  const tokenKey = Cookies.get("jobseekerToken");
  const primaryColor = config.primary_color;
  const secondaryColor = config.secondary_color;
  const [t, i18n] = useTranslation("common");
  const currentLanguage = Cookies.get("selectedLanguage") || "en";

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

  const handleClick = async () => {
    try {
      const newErrors = {};

      if (password.old_password === "") {
        newErrors.old_password = t("jobseekerChangePassword.oldPassRequired");
        window.scrollTo(0, 0);
      }

      if (password.new_password === "") {
        newErrors.new_password = t("jobseekerChangePassword.newPassRequired");
        window.scrollTo(0, 0);
      }
      if (password.conf_password === "") {
        newErrors.conf_password = t("jobseekerChangePassword.confPassRequired");
        window.scrollTo(0, 0);
      }
      if (password.new_password) {
        if (password.new_password.length < 8) {
          newErrors.new_password = t("jobseekerChangePassword.passLengthError");
        }
      }
      if (password.conf_password) {
        if (password.conf_password.length < 8) {
          newErrors.conf_password = t(
            "jobseekerChangePassword.passLengthError"
          );
        }
      }
      if (password.new_password && password.conf_password) {
        if (password.new_password !== password.conf_password) {
          newErrors.conf_password = t("jobseekerChangePassword.passMatchError");
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: t("jobseekerChangePassword.confirmTitle"),
          text: t("jobseekerChangePassword.confirmTxt"),
          icon: "question",
          showCancelButton: true,
          confirmButtonText: t("jobseekerChangePassword.yes"),
          cancelButtonText: t("jobseekerChangePassword.no"),
        });
        if (confirmationResult.isConfirmed) {
          setLoading(true);

          const updatedData = {
            ...password,
            language: currentLanguage,
          };
          const response = await axios.post(
            BaseApi + "/candidates/changePassword",
            updatedData, // Pass null as the request body if not required
            {
              headers: {
                "Content-Type": "application/json",
                key: ApiKey,
                token: tokenKey,
              },
            }
          );
          setLoading(false);
          if (response.data.status === 200) {
            Swal.fire({
              title: t("jobseekerChangePassword.successTxt"),
              icon: "success",
              confirmButtonText: t("jobseekerChangePassword.close"),
            });
            router.push("/jobseeker/my-account");
          } else if (response.data.status === 400) {
            // setLoading(false);
            Cookies.remove("tokenClient");
            Cookies.remove("user_type");
            Cookies.remove("fname");
            router.push("/");
            Swal.fire({
              title: response.data.message,
              icon: "warning",
              confirmButtonText: t("searchJobPage.close"),
            });
          } else {
            Swal.fire({
              title: response.data.message,
              icon: "warning",
              confirmButtonText: t("searchJobPage.close"),
            });
          }
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "Network Error") {
        Cookies.remove("tokenClient");
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
        title: t("jobseekerChangePassword.failedTxt"),
        icon: "error",
        confirmButtonText: t("jobseekerChangePassword.close"),
      });
      console.log("Couldn't change jobseeker password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="container changePassword editProfile">
            <div className="row">
              <div className="col-lg-3">
                <Sidebar />
              </div>

              <div
                className="col-lg-9 mb-5"
                style={{
                  borderLeft: "2px solid #e6e8e7",
                  borderRight: "2px solid #e6e8e7",
                }}
              >
                <div className="d-flex mx-3">
                  <img src="/Images/employerSide/icon9color.png" alt="" />
                  <h3 className="mx-2">
                    {t("jobseekerChangePassword.changeYourPassword")}
                  </h3>
                </div>
                <form>
                  <div className="mb-5 mt-5">
                    <div class="form-outline mb-5 DashBoardInputBx">
                      <label class="form-label" for="form3Example1">
                        {t("jobseekerChangePassword.oldPassword")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="password"
                        id="form3Example1"
                        className={`form-control ${
                          errors.old_password && "input-error"
                        }`}
                        placeholder={t("jobseekerChangePassword.oldPassword")}
                        value={password.old_password}
                        name="old_password"
                        onChange={handleChange}
                      />
                      {errors.old_password && (
                        <div className="text-danger">{errors.old_password}</div>
                      )}
                    </div>
                    <div class="form-outline mb-5 DashBoardInputBx">
                      <label class="form-label" for="form3Example3">
                        {t("jobseekerChangePassword.newPassword")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="password"
                        id="form3Example3"
                        className={`form-control ${
                          errors.new_password && "input-error"
                        }`}
                        placeholder={t("jobseekerChangePassword.newPassword")}
                        value={password.new_password}
                        name="new_password"
                        onChange={handleChange}
                      />
                      {errors.new_password && (
                        <div className="text-danger">{errors.new_password}</div>
                      )}
                      {password.new_password && (
                        <PasswordStrengthBar password={password.new_password} />
                      )}{" "}
                    </div>
                    <div class="form-outline mb-5 DashBoardInputBx">
                      <label class="form-label" for="form3Example3">
                        {t("jobseekerChangePassword.confirmPassword")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="password"
                        id="form3Example3"
                        className={`form-control ${
                          errors.conf_password && "input-error"
                        }`}
                        placeholder={t(
                          "jobseekerChangePassword.confirmPassword"
                        )}
                        value={password.conf_password}
                        name="conf_password"
                        onChange={handleChange}
                      />
                      {errors.conf_password && (
                        <div className="text-danger">
                          {errors.conf_password}
                        </div>
                      )}
                      {password.conf_password && (
                        <PasswordStrengthBar
                          password={password.conf_password}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary button1 mx-3"
                    onClick={handleClick}
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
                    {t("jobseekerChangePassword.updateButton")}
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
                    onClick={() => router.push("/jobseeker/my-account")}
                  >
                    {t("jobseekerChangePassword.cancelButton")}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default JSChangePassword;
