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
// import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";


const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
    code: "",
    symbol: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    code: "",
    symbol: "",
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
        BaseApi + `/admin/currency/admin_edit/${slug}`,
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
      setLoading(false);
      console.log("Error at chnage username at Admin panel");
    }
  };

  const handleClick = async () => {
    try {
      const newErrors = {};

      if (userData.name === "") {
        newErrors.name = "Currency Name is required";
      }
      if (userData.code === "") {
        newErrors.code = "Currency Code is required";
      }
      if (userData.symbol === "") {
        newErrors.symbol = "Currency Symbol is required";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const confirmationResult = await Swal.fire({
          title: "Update Currency?",
          text: "Do you want to update this Currency?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (confirmationResult.isConfirmed) {
          setLoading(true);

          const response = await axios.post(
            BaseApi + `/admin/currency/admin_edit/${slug}`,
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
              title: "Currency updated successfully!",
              icon: "success",
              confirmButtonText: "Close",
            });
        
            router.push("/admin/currencies/index");
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
        text: "Could not update currency. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not change username!", error);
    }
  };

  useEffect(() => {

      getData();
      window.scrollTo(0, 0);
    
  }, []);

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
                    href="/admin/currencies/index"
                    underline="hover"
                    color="inherit"
                  >
                    Currency List
                  </Link>

                  <Typography color="text.primary">Edit Currency</Typography>
                </Breadcrumbs>
              </div>

              <h2 className="adminPageHeading">Edit Currency</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Currency Name<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${errors.name && "input-error"}`}
                      name="name"
                      placeholder="Currency Name"
                      value={userData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Currency Code<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${errors.code && "input-error"}`}
                      name="code"
                      placeholder="Currency Code"
                      value={userData.code}
                      onChange={handleChange}
                    />
                    {errors.code && (
                      <div className="text-danger">{errors.code}</div>
                    )}
                  </div>
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Currency Symbol<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${
                        errors.symbol && "input-error"
                      }`}
                      name="symbol"
                      placeholder="Currency Symbol"
                      value={userData.symbol}
                      onChange={handleChange}
                    />
                    {errors.symbol && (
                      <div className="text-danger">{errors.symbol}</div>
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
                    onClick={() => router.push("/admin/currencies/index")}
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
