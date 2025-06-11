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
import Cookies from "js-cookie";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"
import Image from "next/image";


const APAddSpecialization = () => {
  const [userData, setUserData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");

  const router = useRouter();


  const { specializationslug } = useParams();

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
      const response = await axios.post(
        BaseApi + `/admin/specialization/admin_add/${specializationslug}`,
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
      setUserData(response.data.response);
    } catch (error) {
      console.log("Error at change username at Admin panel");
    }
  };

  const handleClick = async () => {
    try {
      const { name } = userData;
      if (!name) {
        setErrors({
          name: name ? "" : "Specialization Name is required",
        });
        return;
      }
      const confirmationResult = await Swal.fire({
        title: "Add Specialization?",
        text: "Do you want to Add this Specialization?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmationResult.isConfirmed) {
        setLoading(true);

        const response = await axios.post(
          BaseApi + `/admin/specialization/admin_add/${specializationslug}`,
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
            title: "Specialization added successfully!",
            icon: "success",
            confirmButtonText: "Close",
          });
          getData();
          // setUserData({
          //   ...userData,
          //   new_username: "",
          //   conf_username: "",
          // });
          // window.scrollTo(0, 0)
          window.history.back();
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
        text: "Could not add specialization. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not change username!", error);
    }
  };

  useEffect(() => {

      getData();
   
    
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
                  href="/admin/courses/index"

                    underline="hover"
                    color="inherit"
                  
                  >
                    Courses
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => window.history.back()}
                  >
                    {userData.course_name}
                  </Link>

                  <Typography color="text.primary">
                    Add Specialization
                  </Typography>
                </Breadcrumbs>
              </div>

              <h2 className="adminPageHeading">Add Specialization</h2>
              <form className="adminForm">
                <div className="mb-4 mt-5">
                  <div class="mb-5 DashBoardInputBx">
                    <label for="formFile" class="form-label">
                      Specialization Name<span className="RedStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className={`form-control ${errors.name && "input-error"}`}
                      name="name"
                      placeholder="Specialization Name"
                      value={userData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
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
                    onClick={() => setUserData({...userData, name: ""})}
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

export default APAddSpecialization;
