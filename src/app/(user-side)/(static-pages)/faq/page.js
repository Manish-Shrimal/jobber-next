"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";
import HTMLReactParser from "html-react-parser";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // *******************************
  const [t, i18n] = useTranslation("common");
  // ***********************************

  const recaptchaLanguage = Cookies.get("selectedLanguage");
  const currentLanguage = Cookies.get("selectedLanguage") || "en";
  //   const navigate = useNavigate();
  const userType = Cookies.get("user_type");
  const tokenKey = Cookies.get("tokenClient");

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  let primaryColor = Cookies.get("primaryColor");
  let secondaryColor = Cookies.get("secondaryColor");
  let captchaKey = Cookies.get("captchaKey");

  const [hoverColor, setHoverColor] = useState(false);

  const handleMouseEnter = () => {
    setHoverColor(true);
  };

  const handleMouseLeave = () => {
    setHoverColor(false);
  };

  const [pageContent, setPageContent] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BaseApi + `/page/staticpage/faq`, {
        language: currentLanguage,
      });
      setLoading(false);
      setPageContent(response.data.response);
    } catch (error) {
      setLoading(false);
      console.log("Cannot get data of faq page");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (
  //     (!tokenKey && userType != "recruiter") ||
  //     (!tokenKey && userType != "candidate")
  //   ) {
  //     navigate("/user/jobseekerlogin");
  //   } else {
  //     getData();

  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {};

      if (formData.name === "") {
        newErrors.name = t("messageForm.nameRequired");
      }
      if (formData.email === "") {
        newErrors.email = t("messageForm.emailRequired");
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (formData.subject === "") {
        newErrors.subject = t("messageForm.subjectRequired");
      }
      if (formData.message === "") {
        newErrors.message = t("messageForm.messageRequired");
      }
      if (!isCaptchaVerified) {
        newErrors.captcha = t("messageForm.captchaRequired");
      }

      setErrors(newErrors);

      // Function to validate email format
      function isValidEmail(email) {
        // Use a regular expression to validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      }

      if (Object.keys(newErrors).length === 0) {
        if (isCaptchaVerified) {
          setLoading(true);
          const response = await axios.post(
            BaseApi + `/page/staticpage/faq.html`,
            formData
          );
          setLoading(false);
          if (response.data.status === 200) {
            Swal.fire({
              title: t("messageForm.messageSuccessTitle"),
              icon: "success",
              confirmButtonText: t("messageForm.close"),
            });
            window.location.reload();
          } else if (response.data.status === 500) {
            Swal.fire({
              title: response.data.message,
              icon: "error",
              confirmButtonText: t("messageForm.close"),
            });
          } else {
            Swal.fire({
              title: response.data.message,
              icon: "error",
              confirmButtonText: t("messageForm.close"),
            });
          }
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: t("messageForm.messageFailedTitle"),
        text: t("messageForm.messageFailedTxt"),
        icon: "error",
        confirmButtonText: t("messageForm.close"),
      });
    }
    console.log(formData);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="">
            <div className="faqSection1">
              <div className="section1Faq text-center">
                <h1 className="">{pageContent.page_title}</h1>
                <h6 className="text-muted fw-normal">
                  {" "}
                  <Link href="/" style={{ color: "grey" }}>
                    {t("navHeaders.home")}
                  </Link>{" "}
                  / {pageContent.page_title}
                </h6>
              </div>
              <div className="container section2Faq">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="faqBodySection1">
                      <h3>
                        {t("faq.header1.1")} <br /> {t("faq.header1.2")}{" "}
                        <span className="textGradient">
                          {" "}
                          <span className="SubHaddingTxt">
                            {t("faq.header1.3")}
                          </span>
                        </span>
                      </h3>
                    </div>

                    <Image
                      className="mt-3"
                      src="/Images/Faq.png"
                      alt="FAQ icon"
                      width={300} // Replace with actual image size
                      height={300}
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="upperPart">
                      {pageContent.page_description &&
                        HTMLReactParser(pageContent.page_description)}
                      
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className="card container faqSection2">
                <div className="card-body">
                  <h2 className="pb-4 pt-2 text-center">
                    {t("faq.header2.1")}
                    <span className="textGradient">
                      {" "}
                      <span className="SubHaddingTxt">
                        {t("faq.header2.2")}
                      </span>
                    </span>
                  </h2>
                  <form>
                    <div className="mb-4">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name && "input-error"
                        }`}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="name"
                        value={formData.name}
                        placeholder={t("faq.namePlaceholder")}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email && "input-error"
                        }`}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={formData.email}
                        placeholder={t("faq.emailPlaceholder")}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <select
                        className={`form-select ${
                          errors.subject && "input-error"
                        }`}
                        aria-label="Default select example"
                        value={formData.subject}
                        name="subject"
                        onChange={handleChange}
                      >
                        <option>{t("faq.selectPlaceholder")}</option>
                        <option value="1">
                          {t("faq.messageFormSelectOption1")}
                        </option>
                        <option value="2">
                          {t("faq.messageFormSelectOption2")}
                        </option>
                        <option value="3">
                          {t("faq.messageFormSelectOption3")}
                        </option>
                        <option value="3">
                          {t("faq.messageFormSelectOption4")}
                        </option>
                        <option value="3">
                          {t("faq.messageFormSelectOption5")}
                        </option>
                      </select>
                      {errors.subject && (
                        <div className="text-danger">{errors.subject}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <textarea
                        className={`form-control ${
                          errors.message && "input-error"
                        }`}
                        id="exampleFormControlTextarea1"
                        rows="5"
                        name="message"
                        value={formData.message}
                        placeholder={t("faq.descPlaceholder")}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && (
                        <div className="text-danger">{errors.message}</div>
                      )}
                    </div>
                    <div className="reCaptchaLogin mb-4">
                      <ReCAPTCHA
                        // sitekey={captchaKey}
                        hl={recaptchaLanguage}
                        sitekey="6Ld8bV8nAAAAAEp24xWlKsVFhVDYlBctFF50MI1x"
                        onChange={(value) => setIsCaptchaVerified(value)}
                      />
                      {errors.captcha && (
                        <div className="text-danger">{errors.captcha}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn w-100"
                      onClick={handleClick}
                      style={{
                        backgroundColor: `${
                          secondaryColor &&
                          (hoverColor ? secondaryColor : primaryColor)
                        }`,
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* SEND MESSAGE */}
                      {t("faq.sendMessageButton")}
                    </button>
                  </form>
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
