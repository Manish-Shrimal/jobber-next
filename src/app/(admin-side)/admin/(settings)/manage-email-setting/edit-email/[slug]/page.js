"use client";
import React, { useEffect, useState } from "react";
import APNavBar from "@/app/(admin-side)/admin/Components/APNavbar";
import APSidebar from "@/app/(admin-side)/admin/Components/APSidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
// import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState({
    mail_value: "",
  });

  const [errors, setErrors] = useState({
    mail_value: "",
  });
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");

   const router = useRouter();


 const { slug } = useParams();

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

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + `/admin/settings/editMails/${slug}`,
        null,
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
      setUserData(response.data.response);
    } catch (error) {
      console.log("Error at chnage username at Admin panel");
    }
  };

  const handleClick = async () => {
    try {
      const newErrors = {};

      if (userData.mail_value === "") {
        newErrors.mail_value = "Email is required";
      } else if (!isValidEmail(userData.mail_value)) {
        newErrors.mail_value = "Invalid email format";
      }
      setErrors(newErrors);
      // Function to validate email format
      function isValidEmail(email) {
        // Use a regular expression to validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      }

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: "Update?",
          text: "Do you want to update email setting?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (confirmationResult.isConfirmed) {
          setLoading(true);

          const response = await axios.post(
            BaseApi + `/admin/settings/editMails/${slug}`,
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
              title: "Email Setting updated successfully!",
              icon: "success",
              confirmButtonText: "Close",
            });
            getData();
     
            navigate("/admin/settings/manageMails");
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
        text: "Could not update. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not update email setting!", error);
    }
  };

  useEffect(() => {

      // TokenKey is present, fetch data or perform other actions
      getData();
      window.scrollTo(0, 0);
    
  }, [tokenKey]);

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
                  href="/admin/manage-email-setting"

                    underline="hover"
                    color="inherit"
                   
                  >
                    Manage Email Settings
                  </Link>
                  <Typography color="text.primary">
                    Edit Email Setting
                  </Typography>
                </Breadcrumbs>
              </div>

              <h2 className="adminPageHeading">Edit Email Settings</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Email Name<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      name="mail_name"
                      placeholder="Email Name"
                      value={userData.mail_name}
                      // onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Email Address<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.mail_value && "input-error"
                      }`}
                      name="mail_value"
                      placeholder="Email Address"
                      value={userData.mail_value}
                      onChange={handleChange}
                    />
                    {errors.mail_value && (
                      <div className="text-danger">{errors.mail_value}</div>
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
                    onClick={() => router.push("/admin/manage-email-setting")}
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
