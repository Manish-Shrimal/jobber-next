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

const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
    url: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");

  const router = useRouter();

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

      if (userData.name === "") {
        newErrors.name = "Announcement Name is required";
      }

      if (userData.url === "") {
        newErrors.url = "URL is required";
      } else {
        // Regular expression pattern to match a valid URL
        const urlFormat =
          /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,5}(\/\S*)?$/i;

        if (!urlFormat.test(userData.url)) {
          newErrors.url = "Invalid URL format";
        }
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: "Add Announcement?",
          text: "Do you want to Add this Announcement?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (confirmationResult.isConfirmed) {
          setLoading(true);

          const response = await axios.post(
            BaseApi + "/admin/announcement/admin_add",
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
              title: "Announcement added successfully!",
              icon: "success",
              confirmButtonText: "Close",
            });

            router.push("/admin/announcements/index");
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
        text: "Could not add announcement. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not change username!", error);
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
                    href="/admin/announcements/index"
                    underline="hover"
                    color="inherit"
                  >
                    Announcement List
                  </Link>

                  <Typography color="text.primary">Add Announcement</Typography>
                </Breadcrumbs>
              </div>

              <h2 className="adminPageHeading">Add Announcement</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div className="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Announcement Name<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${errors.name && "input-error"}`}
                      name="name"
                      placeholder="Announcement Name"
                      value={userData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      URL<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${errors.url && "input-error"}`}
                      name="url"
                      placeholder="URL"
                      value={userData.url}
                      onChange={handleChange}
                    />
                    {errors.url && (
                      <div className="text-danger">{errors.url}</div>
                    )}

                    <div id="emailHelp" class="form-text">
                      (Enter URL Like http://www.google.com)
                    </div>
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
                    onClick={() =>
                      setUserData({ ...userData, name: "", url: "" })
                    }
                  >
                    RESET
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
