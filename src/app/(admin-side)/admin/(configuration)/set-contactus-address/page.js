
"use client"
import React, { useEffect, useState } from "react";
import APNavBar from "@/app/(admin-side)/admin/Components/APNavbar";
import APSidebar from "@/app/(admin-side)/admin/Components/APSidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState({
    company_name: "",
    email: "",
    address: "",
    contact: "",
  });
  const [errors, setErrors] = useState({
    company_name: "",
    email: "",
    address: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");

//   const navigate = useNavigate();
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

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BaseApi + "/admin/settings", null, {
        headers: {
          "Content-Type": "application/json",
          key: ApiKey,
          token: tokenKey,
          adminid: adminID,
        },
      });
      setLoading(false);
      setUserData(response.data.response);
    } catch (error) {
      console.log("Error at chnage username at Admin panel");
    }
  };

  const handleClick = async () => {
    try {
      const { company_name, email, contact, address } = userData;

      // Check if email fields are empty
      if (!company_name || !email || !contact || !address) {
        setErrors({
          company_name: company_name ? "" : "Company Name is required",
          email: email ? "" : "Email is required",
          contact: contact ? "" : "Contact Number is required",
          address: address ? "" : "Address is required",
        });
        return;
      }

      // Check for valid email format
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(email)) {
        setErrors({
          email: "Invalid Email Address",
        });
        return;
      }

      // Validation: Check if contact is exactly 10 digits
      const contactFormat = /^\+?\d{1,3}-?\d{9,15}$/;
      if (contact && !contactFormat.test(contact)) {
        setErrors({
          contact: "Contact must be under 15 digits",
        });
        return;
      }
      const confirmationResult = await Swal.fire({
        title: "Update?",
        text: "Do you want to update Contact Details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmationResult.isConfirmed) {
        setLoading(true);

        const response = await axios.post(
          BaseApi + "/admin/settings",
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
            title: "Contact Details updated successfully!",
            icon: "success",
            confirmButtonText: "Close",
          });
          getData();

        } else {
          Swal.fire({
            title: response.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Failed",
        text: "Could not update Contact Details. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not update contact details!", error);
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

                  <Typography color="text.primary">Contact Address</Typography>
                </Breadcrumbs>
              </div>
              <h2 className="adminPageHeading">Set Contact Us Details</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Company Name<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.company_name && "input-error"
                      }`}
                      name="company_name"
                      value={userData.company_name}
                      placeholder="Company Name"
                      onChange={handleChange}
                    />
                    {errors.company_name && (
                      <div className="text-danger">{errors.company_name}</div>
                    )}
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Contact Number<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.contact && "input-error"
                      }`}
                      name="contact"
                      value={userData.contact}
                      placeholder="Contact Number"
                      onChange={handleChange}
                    />
                    {errors.contact && (
                      <div className="text-danger">{errors.contact}</div>
                    )}
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Email Address<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.email && "input-error"
                      }`}
                      name="email"
                      value={userData.email}
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Address<span className="RedStar">*</span>
                    </label>
                    <textarea
                      type="text"
                      rows="10"
                      id="form3Example1"
                      className={`form-control ${
                        errors.address && "input-error"
                      }`}
                      name="address"
                      value={userData.address}
                      placeholder="Address"
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary button1"
                    onClick={handleClick}
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary button2"
                    onClick={() => router.push("/admin/dashboard")}
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
