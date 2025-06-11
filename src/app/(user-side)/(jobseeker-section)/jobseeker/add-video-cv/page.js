"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(user-side)/(jobseeker-section)/jobseeker/Sidebar/Sidebar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Swal from "sweetalert2";
import axios from "axios";
import ApiKey from "@/app/(api)/ApiKey";
import BaseApi from "@/app/(api)/BaseApi";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";

const Page = () => {
  const config = useRecoilValue(configState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const tokenKey = Cookies.get("jobseekerToken");

  const [t, i18n] = useTranslation("common");

  const primaryColor = config.primary_color;
  const secondaryColor = config.secondary_color;

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + "/candidates/addVideoCv",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );
      setLoading(false);
      setVideo(response.data.response.path);
    } catch (error) {
      setLoading(false);
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
    }
  };

  const handleVideoRemove = async () => {
    try {
      const confirmationResult = await Swal.fire({
        title: t("jobseekerVideoCV.confirmTitleVideoRemove"),
        text: t("jobseekerVideoCV.confirmTxtVideoRemove"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("jobseekerVideoCV.yes"),
        cancelButtonText: t("jobseekerVideoCV.no"),
      });
      if (confirmationResult.isConfirmed) {
        setLoading(true);
        const response = await axios.post(
          BaseApi + "/candidates/deleteVideo",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              key: ApiKey,
              token: tokenKey,
            },
          }
        );
        setLoading(false);
        getData();
        Swal.fire({
          title: t("jobseekerVideoCV.successTxtVideoRemove"),
          icon: "success",
          confirmButtonText: t("jobseekerVideoCV.close"),
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
        title: t("jobseekerVideoCV.failedTxtVideoRemove"),
        icon: "error",
        confirmButtonText: t("jobseekerVideoCV.close"),
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // Check if the file size is greater than 20MB
    if (file.size > 20 * 1024 * 1024) {
      // Convert MB to bytes
      Swal.fire({
        title: t("jobseekerVideoCV.fileSizeExceeded"),
        icon: "warning",
        confirmButtonText: t("jobseekerVideoCV.close"),
      });
      e.target.value = "";
      return; // Stop execution
    }
    const formData = new FormData();
    formData.append("video", file);

    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + "/candidates/addVideoCv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );
      setLoading(false);
      setVideo(response.data.response.path);
      Swal.fire({
        title: t("jobseekerVideoCV.successTxtVideoUpload"),
        icon: "success",
        confirmButtonText: t("jobseekerVideoCV.close"),
      });
    } catch (error) {
      setLoading(false);
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
        title: t("jobseekerVideoCV.failedTxtVideoUpload"),
        icon: "error",
        confirmButtonText: t("jobseekerVideoCV.close"),
      });
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="container editProfile">
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
                <div className="mx-3 d-flex PageHeader">
                  <Image
                    width={34}
                    height={34}
                    unoptimized={true}
                    src="/Images/employerSide/icon8color.png"
                    alt="Icon8"
                  />
                  <h3 className="">{t("jobseekerVideoCV.videoCV")}</h3>
                </div>
                <form>
                  <div className="mb-5 mt-5 mx-4">
                    <div className="form-outline mb-4 DashBoardInputBx">
                      <label className="form-label" htmlFor="form3Example3">
                        {t("jobseekerVideoCV.addVideoFile")}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        name="video"
                        accept=".mp4, .3gp, .avi, .mov"
                        onChange={(e) => handleFileUpload(e)}
                      />
                      <div id="emailHelp" className="form-text">
                        {t("jobseekerVideoCV.belowTxt")}
                      </div>
                    </div>
                    {video && (
                      <div className="form-outline mb-5 DashBoardInputBx">
                        <label htmlFor="formFile" className="form-label">
                          {t("jobseekerVideoCV.uploadedVideo")}
                        </label>
                        <div className="ChoosPlanBx checkCertificate">
                          <div className="EPJobseekerCertificatesDetails EPJobseekerVidio">
                            <ul>
                              <li>
                                <i
                                  className="fa-regular fa-circle-xmark jsprofileCross"
                                  onClick={handleVideoRemove}
                                ></i>
                                <i>
                                  <ReactPlayer
                                    url={video}
                                    controls={true}
                                    width={250}
                                    height={250}
                                    allowfullscreen={true}
                                  />
                                </i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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

export default Page;
