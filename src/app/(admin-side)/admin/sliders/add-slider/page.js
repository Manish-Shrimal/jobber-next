"use client";
import React, { useEffect, useState } from "react";
import APNavBar from "@/app/(admin-side)/admin/Components/APNavbar";
import APSidebar from "@/app/(admin-side)/admin/Components/APSidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [userData, setUserData] = useState({
    title: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");

  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleClick = async () => {
    try {
      const newErrors = {};

      if (userData.title === "") {
        newErrors.title = "Slider Title is required";
      }

      if (userData.image === "") {
        newErrors.image = "Slider Image is required";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: "Add Slider?",
          text: "Do you want to Add this Slider?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (confirmationResult.isConfirmed) {
          setLoading(true);

          const response = await axios.post(
            BaseApi + "/admin/slider/admin_add",
            userData,
            {
              headers: {
                "Content-Type": "application/json",
                key: ApiKey,
                token: tokenKey,
                adminid: adminID,
              },
            }
          );

          setLoading(false);

          if (response.data.status === 200) {
            Swal.fire({
              title: "Slider added successfully!",
              icon: "success",
              confirmButtonText: "Close",
            });
            setUserData({
              ...userData,
              title: "",
              image: "",
            });

            router.push("/admin/sliders/index");
          } else {
            Swal.fire({
              title: response.data.message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Failed",
        text: "Could not Add Slider. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not add slider!", error);
    }
  };

  const handleFileUpload1 = async (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    // Check if the file is selected
    if (file) {
      // Check the file size (in bytes)
      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 800 * 1024; // 800 KB
      if (fileSizeInBytes > maxSizeInBytes) {
        Swal.fire({
          title: "Image size should be under 800 KB",
          icon: "warning",
          confirmButtonText: "Close",
        });

        // Clear the file input
        fileInput.value = ""; // This clears the input
        setSelectedImage("");
        setUserData({ ...userData, image: "" });
        return;
      }

      // Check image resolution
      const img = new Image();
      img.src = window.URL.createObjectURL(file);

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (width !== 1920 || height > 354 || height < 352) {
          Swal.fire({
            title: "Image resolution should be 1920x353 pixels",
            icon: "warning",
            confirmButtonText: "Close",
          });

          // Clear the file input
          fileInput.value = ""; // This clears the input
          setSelectedImage("");
          setUserData({ ...userData, image: "" });
        } else {
          // Clear the image error
          setErrors({
            ...errors,
            image: "",
          });

          // Convert the image to base64
          convertToBase64(file).then((base64) => {
            setUserData({ ...userData, image: base64 });
            setSelectedImage(base64);
          });
        }
      };
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setUserData({ ...userData, image: "" });

    // Reset the value of the file input
    const fileInput = document.getElementById("formFile"); // Replace with the actual ID of your file input
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      <APNavBar />
      <div className="APBasic">
        <APSidebar />

        {loading ? (
          <>
            <div className="loader-container"></div>
          </>
        ) : (
          <>
            <div className="site-min-height">
              <div className="breadCumb1" role="presentation">
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon fontSize="small" />}
                >
                  <Link
                    href="/admin/dashboard"
                    underline="hover"
                    color="inherit"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/sliders/index"
                    underline="hover"
                    color="inherit"
                  >
                    Sliders
                  </Link>

                  <Typography color="text.primary">Add Slider</Typography>
                </Breadcrumbs>
              </div>

              <h2 className="adminPageHeading">Add Slider</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Slider Title<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.title && "input-error"
                      }`}
                      name="title"
                      placeholder="Slider Title"
                      value={userData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="text-danger">{errors.title}</div>
                    )}
                  </div>

                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Image<span className="RedStar">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.image && "input-error"
                      }`}
                      type="file"
                      id="formFile"
                      label="Image"
                      name="logo"
                      accept=".jpeg, .png, .jpg, .gif"
                      onChange={(e) => handleFileUpload1(e)}
                    />
                    {errors.image && (
                      <div className="text-danger">{errors.image}</div>
                    )}
                    <div id="emailHelp" class="form-text">
                      Supported File Types: gif, jpg, jpeg, png (Max. 600 KB).
                      Best file size 1920 X 353 pixels.
                    </div>
                    {selectedImage && (
                      <div>
                        <Image
                          width={1920}
                          height={353}
                          className="selectedInputImage"
                          src={selectedImage}
                          alt="Selected"
                        />
                        <button className="APButton3" onClick={deleteImage}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary button1"
                    onClick={handleClick}
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary button2"
                    onClick={() => router.push("/admin/sliders/index")}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
            <APFooter />
          </>
        )}
      </div>
    </>
  );
};

export default Page;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
