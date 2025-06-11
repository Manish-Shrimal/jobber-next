"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import HTMLReactParser from "html-react-parser";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { BiSolidStar } from "react-icons/bi";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [favouriteListProfileData, setFavouriteListProfileData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [oldDocs, setOldDocs] = useState([]);
  const config = useRecoilValue(configState);
  let primaryColor = config.primary_color;

  let secondaryColor = config.secondary_color;

  const [mailReply, setMailReply] = useState({
    subject: "",
    message: "",

    emailFiles: [],
  });
  const [errors, setErrors] = useState({
    subject: "",
    message: "",
  });
  const [selectedFileName, setSelectedFileName] = useState([]);
  const [viewButtonEmailData, setViewButtonEmailData] = useState([]);
  const [viewButtonContactData, setViewButtonContactData] = useState([]);

  const [viewEmail, setViewEmail] = useState(false);
  const [viewContact, setViewContact] = useState(false);
  const [t, i18n] = useTranslation("common");

  const { slug } = useParams();
  const tokenKey = Cookies.get("employerToken");
  const router = useRouter();

  const [hoverSearchColor, setHoverSearchColor] = useState(false);

  const handleSearchMouseEnter = () => {
    setHoverSearchColor(true);
  };

  const handleSearchMouseLeave = () => {
    setHoverSearchColor(false);
  };

  const [hoverUploadCVColor, setHoverUploadCVColor] = useState(false);

  const handleUploadCVMouseEnter = () => {
    setHoverUploadCVColor(true);
  };

  const handleUploadCVMouseLeave = () => {
    setHoverUploadCVColor(false);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + `/candidates/profile/${slug}`,
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
      if (response.data.status === 200) {
        setFavouriteListProfileData(response.data.response);
        setOldImages(response.data.response.showOldImages);
        setOldDocs(response.data.response.showOldDocs);
        setUserData(response.data.response.userdetails);
        setUserEducation(response.data.response);
      } else if (response.data.status === 400) {
        // setLoading(false);
        Cookies.remove("employerToken");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
        Swal.fire({
          title: response.data.message,
          icon: "warning",
          confirmButtonText: t("employerFavouriteList.close"),
        });
      } else {
        Swal.fire({
          title: t("employerCreateJob.createJobFailedTitle"),
          text: response.data.message,
          icon: "error",
          confirmButtonText: t("employerFavouriteList.close"),
        });
      }

      // console.log(favouriteListProfileData);
    } catch (error) {
      setLoading(false);
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
      // console.log("Could not get user data in profile page of favourite list");
    }
  };

  const [docDownloadPath, setDocDownloadPath] = useState();
  const [downloadActive, setDownloadActive] = useState(false);
  const [fileName, setFileName] = useState();

  const handleDocDownload = async (path, doc) => {
    setDocDownloadPath(path + doc);
    setFileName(doc);
    setDownloadActive(true);
    // console.log(docDownloadPath);
  };
  useEffect(() => {
    // console.log(downloadActive, DOCDownloadURL)
    if (downloadActive && docDownloadPath) {
      // Create a hidden link element
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = docDownloadPath;
      link.download = fileName;
      document.body.appendChild(link);

      // Trigger a click on the link
      link.click();

      // Clean up
      document.body.removeChild(link);
      setDownloadActive(false);
    }
  }, [downloadActive, docDownloadPath]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailReply((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setMailSent(true);
  };

  const [imagePath, setImagePath] = useState();
  const [imageDownloadActive, setImageDownloadActive] = useState(false);

  const handleImageDownload = async (path) => {
    setImagePath(path);
    setImageDownloadActive(true);
  };
  useEffect(() => {
    // console.log(downloadActive, DOCDownloadURL)
    if (imageDownloadActive && imagePath) {
      // Create a hidden link element
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = imagePath;
      link.download = "generated-img.jpeg";
      document.body.appendChild(link);

      // Trigger a click on the link
      link.click();

      // Clean up
      document.body.removeChild(link);
      setImageDownloadActive(false);
    }
  }, [imageDownloadActive, imagePath]);

  const handleFirstTimeImageDownload = async (path) => {
    try {
      const response = await axios.post(
        BaseApi + `/candidates/downloadCandidateCV/${slug}`,
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
      if (response.data.status === 200) {
        handleImageDownload(path);
        window.location.reload();
      } else {
        Swal.fire({
          title: t("employerCreateJob.createJobFailedTitle"),
          text: response.data.message,
          icon: "error",
          confirmButtonText: t("employerFavouriteList.close"),
        });
      }
    } catch (error) {}
  };
  const handleFirstTimeDownload = async (path, doc) => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Download Document?",
        text: "On downloading this document, your total download count will decrease by one.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("employerFavouriteListProfile.yes"),
        cancelButtonText: t("employerFavouriteListProfile.no"),
      });
      if (confirmationResult.isConfirmed) {
        const response = await axios.post(
          BaseApi + `/candidates/downloadCandidateCV/${slug}`,
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
        if (response.data.status === 200) {
          handleDocDownload(path, doc);
          window.location.reload();
          // getData();
        } else {
          Swal.fire({
            title: t("employerCreateJob.createJobFailedTitle"),
            text: response.data.message,
            icon: "error",
            confirmButtonText: t("employerFavouriteList.close"),
          });
        }
      }
    } catch (error) {}
  };

  const handleFavourie = async (id) => {
    try {
      // setLoading(true)
      const response = await axios.post(
        BaseApi + `/candidates/addtoFavorite/${id}`,
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
        Swal.fire({
          title: t("employerFavouriteListProfile.addFavSuccessTitle"),
          icon: "success",
          confirmButtonText: t("employerFavouriteListProfile.close"),
        });
        getData();
      } else if (response.data.status === 400) {
        // setLoading(false);
        Cookies.remove("employerToken");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
        Swal.fire({
          title: response.data.message,
          icon: "warning",
          confirmButtonText: t("employerFavouriteListProfile.close"),
        });
      } else {
        Swal.fire({
          title: t("employerFavouriteListProfile.addFavFailedTitle"),
          text: response.data.message,
          icon: "error",
          confirmButtonText: t("employerFavouriteListProfile.close"),
        });
      }
    } catch (error) {
      setLoading(false);
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
        title: t("employerFavouriteListProfile.addFavFailedTitle"),
        text: t("employerFavouriteListProfile.addFavFailedTxt"),
        icon: "error",
        confirmButtonText: t("employerFavouriteListProfile.close"),
      });
    }
  };

  const [mailSent, setMailSent] = useState(false);

  const handleReply = async (slug) => {
    try {
      const newErrors = {};

      if (mailReply.subject === "") {
        newErrors.subject = t("employerFavouriteListProfile.subjectRequired");
        window.scrollTo(0, 0);
      }
      if (mailReply.message === "") {
        newErrors.message = t("employerFavouriteListProfile.messageRequired");
        window.scrollTo(0, 0);
      }
      setErrors(newErrors);
      setMailSent(true);

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: t("employerFavouriteListProfile.sendMailConfirmTitle"),
          text: t("employerFavouriteListProfile.sendMailConfirmTxt"),
          icon: "question",
          showCancelButton: true,
          confirmButtonText: t("employerFavouriteListProfile.yes"),
          cancelButtonText: t("employerFavouriteListProfile.no"),
        });
        if (confirmationResult.isConfirmed) {
          const updatedReply = {
            ...mailReply,
            selectedFileName: selectedFileName,
            id: userData.id,
          };

          const formData = new FormData();
          selectedFileName.forEach((fileName, index) => {
            formData.append(`selectedFileNames[${index}]`, fileName);
          });

          setLoading(true);

          const response = await axios.post(
            BaseApi + `/candidates/sendmailjobseeker/${slug}`,
            updatedReply,
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
              title: t("employerFavouriteListProfile.sendMailSuccessTitle"),
              icon: "success",
              confirmButtonText: t("employerFavouriteListProfile.close"),
            });
            setMailReply({
              ...mailReply,
              subject: "",
              message: "",
              emailFiles: [],
            });

            setSelectedFileName([]); // Clear selectedFileName array

            // Clear the input field value
            const fileInput = document.getElementById("formFile");
            if (fileInput) {
              fileInput.value = ""; // Reset input field value to empty string
            }
            setMailSent(false);

            // navigate(`/candidates/profile/${userData.slug}`);
          } else if (response.data.status === 400) {
            Cookies.remove("employerToken");
            Cookies.remove("user_type");
            Cookies.remove("fname");
            router.push("/");
            Swal.fire({
              title: response.data.message,
              icon: "warning",
              confirmButtonText: t("employerFavouriteListProfile.close"),
            });
          } else {
            Swal.fire({
              title: t("employerFavouriteListProfile.sendMailFailedTitle"),
              text: response.data.message,
              icon: "error",
              confirmButtonText: t("employerFavouriteListProfile.close"),
            });
          }
        }
      }
    } catch (error) {
      setLoading(false);
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
        title: t("employerFavouriteListProfile.sendMailFailedTitle"),
        text: t("employerFavouriteListProfile.sendMailFailedTxt"),
        icon: "error",
        confirmButtonText: t("employerFavouriteListProfile.close"),
      });
    }
  };

  const [emailViewed, setEmailViewed] = useState(false);
  const [contactViewed, setContactViewed] = useState(false);

  // const handleEmailViewClick = async () => {
  //   try {
  //     const confirmationResult = await Swal.fire({
  //       title: "View email details?",
  //       text: "On viewing the details, your profile view count will be decrease by one.",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonText: t("employerFavouriteListProfile.yes"),
  //       cancelButtonText: t("employerFavouriteListProfile.no"),
  //     });
  //     if (confirmationResult.isConfirmed) {
  //     setViewEmail(true);
  //     const response = await axios.post(
  //       BaseApi + `/candidates/getUserdetail/${slug}`,
  //       null,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           key: ApiKey,
  //           token: tokenKey,
  //         },
  //       }
  //     );
  //     if (response.data.response.status === "0") {
  //       Swal.fire({
  //         title: t("employerFavouriteListProfile.emailViewTitle"),
  //         text: t("employerFavouriteListProfile.emailViewTxt"),
  //         icon: "warning",
  //         confirmButtonText: t("employerFavouriteListProfile.close"),
  //       });
  //     }
  //     if (response.data.response.status === "1") {
  //       setViewButtonEmailData(response.data.response);
  //       if(!contactViewed) {
  //         Swal.fire({
  //           title: t("employerFavouriteListProfile.profileCountUsed"),
  //           // text: t("employerFavouriteListProfile.emailViewTxt"),
  //           icon: "warning",
  //           confirmButtonText: t("employerFavouriteListProfile.close"),
  //         });
  //       }
  //       setEmailViewed(true);

  //     }
  //   }
  //     // console.log(response.data.response);
  //   } catch (error) {
  //     if (error.message === "Network Error") {
  //       Cookies.remove("employerToken");
  //       Cookies.remove("user_type");
  //       Cookies.remove("fname");
  //       navigate("/");
  //       Swal.fire({
  //         title: t("tokenExpired.tokenExpired"),
  //         icon: "warning",
  //         confirmButtonText: t("jobDescription.close"),
  //       });
  //       setTimeout(function () {
  //         window.location.reload();
  //       }, 3000);
  //     }
  //     console.log(error);
  //   }
  // };

  // new code
  const handleEmailViewClick = async () => {
    try {
      if (!contactViewed) {
        const confirmationResult = await Swal.fire({
          title: t("employerFavouriteListProfile.profileViewConfirmTitle"),
          text: t("employerFavouriteListProfile.profileViewConfirmTxt"),
          icon: "question",
          showCancelButton: true,
          confirmButtonText: t("employerFavouriteListProfile.yes"),
          cancelButtonText: t("employerFavouriteListProfile.no"),
        });

        if (!confirmationResult.isConfirmed) {
          return; // User canceled the action
        }
      }

      setViewEmail(true);

      const response = await axios.post(
        BaseApi + `/candidates/getUserdetail/${slug}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );

      if (response.data.response.status === "0") {
        Swal.fire({
          title: t("employerFavouriteListProfile.emailViewTitle"),
          text: t("employerFavouriteListProfile.emailViewTxt"),
          icon: "warning",
          confirmButtonText: t("employerFavouriteListProfile.close"),
        });
      }

      if (response.data.response.status === "1") {
        setViewButtonEmailData(response.data.response);
        if (!contactViewed) {
          Swal.fire({
            title: t("employerFavouriteListProfile.profileCountUsed"),
            // text: t("employerFavouriteListProfile.emailViewTxt"),
            icon: "success",
            confirmButtonText: t("employerFavouriteListProfile.close"),
          });
        }
        setEmailViewed(true);
      }

      // console.log(response.data.response);
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
      // console.log(error);
    }
  };

  const handleContactViewClick = async () => {
    try {
      if (!emailViewed) {
        const confirmationResult = await Swal.fire({
          title: t("employerFavouriteListProfile.profileViewConfirmTitle"),
          text: t("employerFavouriteListProfile.profileViewConfirmTxt"),
          icon: "question",
          showCancelButton: true,
          confirmButtonText: t("employerFavouriteListProfile.yes"),
          cancelButtonText: t("employerFavouriteListProfile.no"),
        });

        if (!confirmationResult.isConfirmed) {
          return; // User canceled the action
        }
      }

      setViewContact(true);

      const response = await axios.post(
        BaseApi + `/candidates/getUserdetail/${slug}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );

      if (response.data.response.status === "0") {
        Swal.fire({
          title: t("employerFavouriteListProfile.contactViewTitle"),
          text: t("employerFavouriteListProfile.contactViewTxt"),
          icon: "warning",
          confirmButtonText: t("employerFavouriteListProfile.close"),
        });
      }

      if (response.data.response.status === "1") {
        if (!emailViewed) {
          Swal.fire({
            title: t("employerFavouriteListProfile.profileCountUsed"),
            // text: t("employerFavouriteListProfile.emailViewTxt"),
            icon: "success",
            confirmButtonText: t("employerFavouriteListProfile.close"),
          });
        }

        setViewButtonContactData(response.data.response);
        setContactViewed(true);
      }

      // console.log(response.data.response);
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
      // console.log(error);
    }
  };

  // const handleContactViewClick = async () => {
  //   try {
  //     const confirmationResult = await Swal.fire({
  //       title: "View contact details?",
  //       text: "On viewing the details, your profile view count will be decrease by one.",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonText: t("employerFavouriteListProfile.yes"),
  //       cancelButtonText: t("employerFavouriteListProfile.no"),
  //     });
  //     setViewContact(true);
  //     const response = await axios.post(
  //       BaseApi + `/candidates/getUserdetail/${slug}`,
  //       null,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           key: ApiKey,
  //           token: tokenKey,
  //         },
  //       }
  //     );
  //     if (response.data.response.status === "0") {
  //       Swal.fire({
  //         title: t("employerFavouriteListProfile.contactViewTitle"),
  //         text: t("employerFavouriteListProfile.contactViewTxt"),
  //         icon: "warning",
  //         confirmButtonText: t("employerFavouriteListProfile.close"),
  //       });
  //     }
  //     if (response.data.response.status === "1") {
  //       if(!emailViewed) {
  //         Swal.fire({
  //           title: t("employerFavouriteListProfile.profileCountUsed"),
  //           // text: t("employerFavouriteListProfile.emailViewTxt"),
  //           icon: "warning",
  //           confirmButtonText: t("employerFavouriteListProfile.close"),
  //         });
  //       }

  //       setViewButtonContactData(response.data.response);
  //       setContactViewed(true);
  //     }
  //     console.log(response.data.response);
  //   } catch (error) {
  //     if (error.message === "Network Error") {
  //       Cookies.remove("employerToken");
  //       Cookies.remove("user_type");
  //       Cookies.remove("fname");
  //       navigate("/");
  //       Swal.fire({
  //         title: t("tokenExpired.tokenExpired"),
  //         icon: "warning",
  //         confirmButtonText: t("jobDescription.close"),
  //       });
  //       setTimeout(function () {
  //         window.location.reload();
  //       }, 3000);
  //     }
  //     console.log(error);
  //   }
  // };

  const handleDocumentDownload = async (documentUrl) => {
    // Create an anchor element
    const anchor = document.createElement("a");

    // Set the href attribute to the document URL
    anchor.href = documentUrl;

    // Set the download attribute to force the browser to download the file instead of navigating to it
    anchor.setAttribute("download", "");

    // Hide the anchor element
    anchor.style.display = "none";

    // Append the anchor element to the document body
    document.body.appendChild(anchor);

    // Trigger a click on the anchor element
    anchor.click();

    // Remove the anchor element from the document body after a short delay
    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 100);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    // Check if tokenKey is not present

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
          <div className="container FavouriteListProfile editProfile">
            {/* Reply Modal  */}
            <div
              class="modal fade"
              id="ReplyModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      {t("employerFavouriteListProfile.sendMailTo")}{" "}
                      {userData.first_name} {userData.last_name}
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="form-outline mb-5 mt-4 DashBoardInputBx">
                      <label class="form-label" for="form3Example3">
                        {t("employerFavouriteListProfile.subject")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="text"
                        id="form3Example3"
                        className={`form-control ${
                          errors.subject && "input-error"
                        }`}
                        placeholder={t("employerFavouriteListProfile.subject")}
                        value={mailReply.subject}
                        name="subject"
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <div className="text-danger">{errors.subject}</div>
                      )}
                    </div>
                    <div class="form-outline mb-5 DashBoardInputBx">
                      <label class="form-label" for="form3Example3">
                        {t("employerFavouriteListProfile.message")}{" "}
                        <span className="RedStar">*</span>
                      </label>
                      <input
                        type="text"
                        id="form3Example3"
                        className={`form-control ${
                          errors.message && "input-error"
                        }`}
                        placeholder={t("employerFavouriteListProfile.message")}
                        value={mailReply.message}
                        name="message"
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <div className="text-danger">{errors.message}</div>
                      )}
                    </div>
                    <div class="form-outline mb-3 DashBoardInputBx">
                      <label for="formFile" class="form-label">
                        {t("employerFavouriteListProfile.multipleImages")}
                      </label>
                      <input
                        type="file"
                        id="formFile"
                        className="form-control"
                        name="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);

                          // Capture the selected file names
                          const fileNames = files.map((file) => file.name);
                          setSelectedFileName(fileNames);

                          // Convert each selected file to base64 encoding
                          Promise.all(
                            files.map((file) => convertFileToBase64(file))
                          )
                            .then((base64Array) => {
                              setMailReply({
                                ...mailReply,
                                emailFiles: base64Array,
                              });
                            })
                            .catch((error) => {
                              console.error(
                                "Error converting files to base64:",
                                error
                              );
                            });
                        }}
                      />{" "}
                      <div id="emailHelp" class="form-text mt-2">
                        {t("employerFavouriteListProfile.belowTxt1")}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary button1"
                      data-bs-dismiss={mailSent && `modal`}
                      aria-label={mailSent && `Close`}
                      style={{
                        backgroundColor: hoverSearchColor
                          ? secondaryColor
                          : primaryColor,
                        border: hoverSearchColor
                          ? secondaryColor
                          : primaryColor,
                      }}
                      onMouseEnter={handleSearchMouseEnter}
                      onMouseLeave={handleSearchMouseLeave}
                      onClick={() => handleReply(userData.slug)}
                    >
                      {t("employerFavouriteListProfile.submitButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-2 FLPLeftSideHeader">
                <div className="ImageSpace">
                  {userData.profile_image ? (
                    <Image
                      width={30}
                      height={30}
                      unoptimized={true}
                      className="FLPImage"
                      src={userData.profile_image}
                      alt="Profile Picture"
                    />
                  ) : (
                    <Image
                      width={30}
                      height={30}
                      unoptimized={true}
                      className="FLPImage"
                      src="/Images/jobseekerSide/dummy-profile.png"
                      alt="Profile Picture"
                    />
                  )}
                </div>
              </div>
              <div
                className="col-lg-10 mb-5"
                // style={{
                //   borderLeft: "2px solid #e6e8e7",
                //   borderRight: "2px solid #e6e8e7",
                // }}
              >
                <div className="card FLPHeaderCard">
                  <div className="FLPRightSideHeader">
                    <h4
                      className=""
                      style={{
                        color: secondaryColor,
                      }}
                    >
                      {userData.first_name} {userData.last_name}
                    </h4>
                    <div className="FLPInnerRight">
                      <Link
                        href="javascript:void(0)"
                        id="FLLink"
                        className="btn FLPlink"
                        data-bs-toggle="modal"
                        data-bs-target="#ReplyModal"
                        style={{
                          color: secondaryColor,
                        }}
                      >
                        {t("employerFavouriteListProfile.sendMail")}
                      </Link>
                      {favouriteListProfileData.fav_status === 0 ? (
                        <Link
                          href="javascript:void(0)"
                          className="btn FLPlink"
                          onClick={() => handleFavourie(userData.id)}
                          style={{
                            color: secondaryColor,
                          }}
                        >
                          {t("employerFavouriteListProfile.addToFav")}
                        </Link>
                      ) : (
                        <Link
                          href="javascript:void(0)"
                          className="btn FLPlink"
                          style={{
                            color: secondaryColor,
                          }}
                        >
                          {/* <i class="fa-solid fa-star"></i>{" "} */}
                          <BiSolidStar />{" "}
                          {t("employerFavouriteListProfile.favourite")}
                        </Link>
                      )}

                      <Link
                        href="javascript:void(0)"
                        id="FLLink"
                        className="btn FLPlink"
                        onClick={() => window.history.back()}
                        style={{
                          color: secondaryColor,
                        }}
                      >
                        {/* <i class="fa-solid fa-arrow-left"></i> */}
                        <FaArrowLeft />
                      </Link>
                    </div>
                  </div>
                  <div className="FLPRightSideBody">
                    <div className="row">
                      <div className="col-md-2">
                        <h6>
                          {t("employerFavouriteListProfile.emailAddress")}:{" "}
                        </h6>
                      </div>
                      <div className="col-md-10 emailValueFLP">
                        {viewEmail ? (
                          <>
                            <p className="pt-1">{viewButtonEmailData.email}</p>
                          </>
                        ) : (
                          <>
                            {userData.email_address?.includes("@xxxx") ? (
                              <>
                                <p className="pt-1">
                                  {userData.email_address}{" "}
                                  <Link
                                    href="javascript:void(0)"
                                    className="viewLink"
                                    type=""
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#ViewModal"
                                    onClick={handleEmailViewClick}
                                  >
                                    {t("employerFavouriteListProfile.show")}
                                  </Link>
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="pt-1">{userData.email_address}</p>
                              </>
                            )}{" "}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <h6>
                          {t("employerFavouriteListProfile.contactNumber")}:{" "}
                        </h6>
                      </div>
                      <div className="col-md-10 contactValueFLP">
                        {viewContact ? (
                          <>
                            <p className="pt-1">
                              {viewButtonContactData.contact}
                            </p>
                          </>
                        ) : (
                          <>
                            {userData.contact?.includes("+xxxx") ? (
                              <>
                                <p className="pt-1">
                                  {userData.contact}{" "}
                                  <Link
                                    href="javascript:void(0)"
                                    className="viewLink"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#ViewModal"
                                    onClick={handleContactViewClick}
                                  >
                                    {t("employerFavouriteListProfile.show")}
                                  </Link>
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="pt-1">{userData.contact}</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {userData.location && (
                      <div className="row">
                        <div className="col-md-2 listProfileParent">
                          <h6>
                            {t("employerFavouriteListProfile.nativeLocation")}:{" "}
                          </h6>
                        </div>
                        <div className="col-md-10 listProfileChild">
                          {userData.location}
                        </div>
                      </div>
                    )}
                    {userData.total_exp && (
                      <div className="row">
                        <div className="col-md-2 listProfileParent">
                          <h6>Work Experience: </h6>
                        </div>
                        <div className="col-md-10 listProfileChild">
                          {userData.total_exp}
                        </div>
                      </div>
                    )}
                    {userData.skills && (
                      <div className="row">
                        <div className="col-md-2 listProfileParent">
                          <h6>{t("employerFavouriteListProfile.skills")}: </h6>
                        </div>
                        <div className="col-md-10 listProfileChild">
                          {Object.entries(userData.skills).map(([key, val]) => {
                            return val + ", ";
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {userData.education && (
              // <div className="row">
              <>
                <div className="tableHeader">
                  <h4
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    {t("employerFavouriteListProfile.education")}:
                  </h4>
                </div>
                {userData.education != "" ? (
                  userData.education?.map((i, index) => {
                    return (
                      <>
                        <div className="dashboardSection3 FLPEducationTable">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.qualification"
                                  )}
                                </th>
                                <th>
                                  {t("employerFavouriteListProfile.courseName")}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.specialization"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.university/institute"
                                  )}
                                </th>
                                <th>
                                  {t("employerFavouriteListProfile.passed")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {i.course_name
                                    ? i.course_name
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>{i.specialization_name}</td>
                                <td>
                                  {i.basic_university
                                    ? i.basic_university
                                    : "N/A"}
                                </td>
                                <td>
                                  {i.basic_year
                                    ? i.basic_year
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="FLPNAText">
                    {t("employerFavouriteListProfile.notAvailable")}
                  </div>
                )}
                {/* </div> */}
              </>
            )}

            {userData.experience && (
              // <div className="row">
              <>
                <div className="tableHeader">
                  <h4
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    {t("employerFavouriteListProfile.experience")}:
                  </h4>
                </div>
                {userData.experience != "" ? (
                  userData.experience?.map((i, index) => {
                    return (
                      <>
                        <div className="dashboardSection3 FLPEducationTable">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  {t("employerFavouriteListProfile.experience")}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.companyName"
                                  )}
                                </th>
                                <th>
                                  {t("employerFavouriteListProfile.industry")}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.functionalArea"
                                  )}
                                </th>
                                <th>
                                  {t("employerFavouriteListProfile.role")}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.workingRelation"
                                  )}
                                </th>
                                <th>
                                  {t("employerFavouriteListProfile.duration")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {i.company_name
                                    ? i.company_name
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>
                                  {i.industry
                                    ? i.industry
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>
                                  {i.functional_area
                                    ? i.functional_area
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>
                                  {i.role
                                    ? i.role
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>
                                  {i.designation
                                    ? i.designation
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                                <td>
                                  {i.from_year
                                    ? i.from_year
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}{" "}
                                  -{" "}
                                  {i.to_year
                                    ? i.to_year
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="FLPNAText">
                    {t("employerFavouriteListProfile.notAvailable")}
                  </div>
                )}
                {/* </div> */}
              </>
            )}

            {userData.profReg && (
              // <div className="row">
              <>
                <div className="tableHeader">
                  <h4
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    {t("employerFavouriteListProfile.professionalRegistration")}
                    :
                  </h4>
                </div>
                {userData.profReg != "" ? (
                  userData.profReg?.map((i, index) => {
                    return (
                      <>
                        <div className="dashboardSection3 FLPEducationTable">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.registrationNumber"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "employerFavouriteListProfile.registrationName"
                                  )}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  {i.registration_name
                                    ? i.registration_name
                                    : t(
                                        "employerFavouriteListProfile.notAvailable"
                                      )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="FLPNAText">
                    {t("employerFavouriteListProfile.notAvailable")}
                  </div>
                )}
                {/* </div> */}
              </>
            )}

            <div className="rows">
              <div className="FLPAboutCandidateHeader">
                <h4
                  style={{
                    color: secondaryColor,
                  }}
                >
                  {t("employerFavouriteListProfile.aboutCandidate")}:
                </h4>
              </div>
              <div className="FLPAboutCandidateBody">
                {userData.company_about ? (
                  HTMLReactParser(userData.company_about)
                ) : (
                  <div className="FLPNAText">
                    {t("employerFavouriteListProfile.notAvailable")}
                  </div>
                )}
              </div>
            </div>
            <div className="rows">
              <div className="FLPCandidateCertificateHeader">
                <h4
                  style={{
                    color: secondaryColor,
                  }}
                >
                  {t("employerFavouriteListProfile.CVDoc/certificate")}:
                </h4>
              </div>
              {favouriteListProfileData.is_downloadable == 1 && (
                <div className="FLPCandidateCertificateBody">
                  <p>{t("employerFavouriteListProfile.certificate")}:</p>
                  {oldImages &&
                    oldImages?.map((i, index) => {
                      return (
                        <div
                          key={index}
                          className="imageBox"
                          onClick={() => handleImageDownload(i.image)}
                        >
                          <i class="fa-solid fa-image"></i> {i.image_name}
                          {/* <img
                      className="FLPCandidateCertificateImage"
                      src={i.document}
                      alt="document"
                    /> */}
                        </div>
                      );
                    })}
                  {oldImages.length === 0 && (
                    <div className="FLPCandidateCertificateBody">
                      <div className="FLPNAText">
                        {t("employerFavouriteListProfile.notAvailable")}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {favouriteListProfileData.is_downloadable == 0 && (
                <div className="FLPCandidateCertificateBody">
                  <p>{t("employerFavouriteListProfile.certificate")}:</p>
                  {oldImages &&
                    oldImages?.map((i, index) => {
                      return (
                        <div
                          key={index}
                          className="imageBox"
                          onClick={() => handleFirstTimeImageDownload(i.image)}
                        >
                          <i class="fa-solid fa-image"></i> {i.image_name}
                          {/* <img
                      className="FLPCandidateCertificateImage"
                      src={i.image}
                      alt="document"
                    /> */}
                        </div>
                      );
                    })}
                  {oldImages.length === 0 && (
                    <div className="FLPCandidateCertificateBody">
                      <div className="FLPNAText">
                        {t("employerFavouriteListProfile.notAvailable")}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {favouriteListProfileData.is_downloadable == 1 && (
                <div className="FLPCandidateCertificateBody">
                  <p>{t("employerFavouriteListProfile.document")}:</p>
                  {oldDocs &&
                    oldDocs?.map((i, index) => {
                      return (
                        <div
                          key={index}
                          className="documentBox"
                          onClick={() => handleDocDownload(i.path, i.doc)}
                        >
                          <i class="fa-solid fa-file"></i>{" "}
                          {/* {t("employerFavouriteListProfile.document")}{" "}
                          {index + 1} */}
                          {i.doc?.substring(0, 14)}..
                        </div>
                      );
                    })}
                  {oldDocs.length === 0 && (
                    <div className="FLPCandidateCertificateBody">
                      <div className="FLPNAText">
                        {t("employerFavouriteListProfile.notAvailable")}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {favouriteListProfileData.is_downloadable == 0 && (
                <div className="FLPCandidateCertificateBody">
                  <p>{t("employerFavouriteListProfile.document")}:</p>
                  {oldDocs &&
                    oldDocs?.map((i, index) => {
                      return (
                        <div
                        key={index}
                          className="documentBox"
                          onClick={() => handleFirstTimeDownload(i.path, i.doc)}
                        >
                          <i class="fa-solid fa-file"></i>{" "}
                          {t("employerFavouriteListProfile.document")}{" "}
                          {i.doc?.substring(0, 14)}..
                        </div>
                      );
                    })}
                  {oldDocs.length === 0 && (
                    <div className="FLPCandidateCertificateBody">
                      <div className="FLPNAText">
                        {t("employerFavouriteListProfile.notAvailable")}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {userData.video != "" && (
              <div className="rows">
                <div className="FLPAboutCandidateHeader">
                  <h4
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    {t("employerFavouriteListProfile.uploadedVideo")}:
                  </h4>
                </div>
                <div className="FLPAboutCandidateBody FLPVideoBox">
                  <ReactPlayer
                    url={userData.video}
                    controls={true}
                    width={250}
                    height={250}
                    allowfullscreen={true}
                  />
                </div>
              </div>
            )}
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
