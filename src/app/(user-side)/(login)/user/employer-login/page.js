"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ CORRECT
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import BaseApi from "@/app/(api)/BaseApi";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { configState } from "@/app/lib/atoms/ConfigAtom";

const Page = () => {

  const config = useRecoilValue(configState);
  // console.log('Login: Current configState value:', config);

  const { t } = useTranslation("common");

  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverLoginColor, setHoverLoginColor] = useState(false);

  const primaryColor = config.primary_color || "#007bff";
  const secondaryColor = config.secondary_color || "#005a9c";
  const siteLogo = config.site_logo || "/Images/logo.png";

  const captchaKey = config.captcha_public_key;

  // const captchaKey = Cookies.get("captchaKey") || "";

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      captcha: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = t("employerLogin.emailRequired");
    } else if (!EMAIL_REGEX.test(loginData.email)) {
      newErrors.email = t("employerLogin.invalidEmail");
    }
    if (!loginData.password) {
      newErrors.password = t("employerLogin.passwordRequired");
    }
    if (!isCaptchaVerified) {
      newErrors.captcha = t("employerLogin.captchaRequired");
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.email || newErrors.password) {
        window.scrollTo(0, 0);
      }
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BaseApi}/users/login`, {
        ...loginData,
        language: Cookies.get("selectedLanguage") || "en",
      });

      const { status, response: resData } = response.data;

      if (status === 200 && resData.user.token) {
        const { user_type: userType, first_name: fname, token } = resData.user;

        if (userType !== "recruiter") {
          Swal.fire({
            title: t("employerLogin.wrongCredentials"),
            icon: "error",
            confirmButtonText: t("employerLogin.close"),
            timer: 3000,
            timerProgressBar: true,
          });
          setIsCaptchaVerified(false);
          return;
        }

        Cookies.set("tokenClient", token, { expires: 7 });
        Cookies.set("fname", fname, { expires: 7 });
        Cookies.set("user_type", userType, { expires: 7 });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `${t("employerLogin.welcome")} ${fname}`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        router.push("/user/myprofile");
        setIsCaptchaVerified(false);
      } else if (status === 500) {
        Swal.fire({
          title: response.data.message,
          icon: "error",
          confirmButtonText: t("employerLogin.close"),
          timer: 3000,
          timerProgressBar: true,
        });
        setIsCaptchaVerified(false);
      }
    } catch (error) {
      Swal.fire({
        title: t("employerLogin.failedTitle"),
        icon: "error",
        confirmButtonText: t("employerLogin.close"),
        timer: 3000,
        timerProgressBar: true,
      });
      setIsCaptchaVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mt-[20vh]"></div>
        </div>
      ) : (
        <>
          <div className="container employerLogin">
            <div className="card rounded">
              <div className="row">
                <div className="col-md-6 leftSection">
                  <Image
                    width={500}
                    height={500}
                    unoptimized={true}
                    src="/Images/employerlogin.jpg"
                    alt="Employer Login"
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <div className="text-center">
                    {siteLogo ? (
                      <Image
                        width={150}
                        height={50}
                        unoptimized={true}
                        src={siteLogo}
                        alt="Site Logo"
                      />
                    ) : (
                      <Image
                        width={100}
                        height={100}
                        unoptimized={true}
                        src="/Images/logo.png"
                        alt="Default Logo"
                      />
                    )}
                  </div>
                  <div className="card-title text-center h3 pt-5">
                    {t("employerLogin.EmployerLogin")}
                  </div>
                  <div className="card-body">
                    <form
                      className="border border-light"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <input
                          type="email"
                          id="defaultLoginFormEmail"
                          className={`form-control ${
                            errors.email ? "input-error" : ""
                          }`}
                          value={loginData.email}
                          placeholder={t("employerLogin.email")}
                          name="email"
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                      <div className="passwordBox">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="defaultLoginFormPassword"
                          className={`form-control ${
                            errors.password ? "input-error" : ""
                          }`}
                          value={loginData.password}
                          name="password"
                          placeholder={t("employerLogin.password")}
                          onChange={handleChange}
                        />
                        <div className="passwordVisibility">
                          <p
                            className="btn-primary"
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <Tooltip title="Hide Password">
                                <VisibilityOff />
                              </Tooltip>
                            ) : (
                              <Tooltip title="View Password">
                                <Visibility />
                              </Tooltip>
                            )}
                          </p>
                        </div>
                        {errors.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </div>
                      <div className="reCaptchaLogin">
                        <ReCAPTCHA
                          sitekey={captchaKey}
                          hl={Cookies.get('selectedLanguage') || 'en'}
                          onChange={(value) => setIsCaptchaVerified(!!value)}
                        />
                        {errors.captcha && (
                          <div className="text-danger CaptchaVerify">{errors.captcha}</div>
                        )}
                      </div>
                      <div className="forgotPassword">
                        <Link href="/users/forgotpassword">
                          {t("employerLogin.forgotPassword")}
                        </Link>
                      </div>
                      <div className="text-center">
                        <button
                          className="btn button1 my-4"
                          type="submit"
                          disabled={loading}
                          style={{
                            backgroundColor: hoverLoginColor
                              ? secondaryColor
                              : primaryColor,
                            border: hoverLoginColor
                              ? secondaryColor
                              : primaryColor,
                          }}
                          onMouseEnter={() => setHoverLoginColor(true)}
                          onMouseLeave={() => setHoverLoginColor(false)}
                        >
                          {t("employerLogin.login")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
