"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(user-side)/(jobseeker-section)/jobseeker/Sidebar/Sidebar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import axios from "axios";
import ApiKey from "@/app/(api)/ApiKey";
import BaseApi from "@/app/(api)/BaseApi";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { CiCircleInfo } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import Link from "next/link"

const JSAppliedJobs = () => {
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

    const config = useRecoilValue(configState);
    const router = useRouter();
    const tokenKey = Cookies.get("jobseekerToken");
    const primaryColor = config.primary_color;
    const secondaryColor = config.secondary_color;
    const [t, i18n] = useTranslation("common");
  const [hoverFirstButtonColor, setHoverFirstButtonColor] = useState(false);

  const handleFirstButtonMouseEnter = () => {
    setHoverFirstButtonColor(true);
  };

  const handleFirstButtonMouseLeave = () => {
    setHoverFirstButtonColor(false);
  };

  const [hoverSecondButtonColor, setHoverSecondButtonColor] = useState(false);

  const handleSecondButtonMouseEnter = () => {
    setHoverSecondButtonColor(true);
  };

  const handleSecondButtonMouseLeave = () => {
    setHoverSecondButtonColor(false);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + "/job/applied",
        null, // Pass null as the request body if not required
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );
      if (response.data.status === 200) {
        setLoading(false);
        setAppliedJobs(response.data.response.jobApplyed);
        // console.log(appliedJobs);
      }
      if (response.data.status === 400) {
        setLoading(false);
        Cookies.remove("jobseekerToken");
        Cookies.remove("user_type");
        Cookies.remove("fname");
        router.push("/");
        Swal.fire({
          title: response.data.message,
          icon: "warning",
          confirmButtonText: t("searchJobPage.close"),
        });
      }
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
      console.log("Cannot get applied jobs data");
    }
  };

  useEffect(() => {
    // Check if tokenKey is not present

      getData();
     
    
  }, []);

  // useEffect(() => {
  //   if (tokenKey === null || tokenKey === "") {
  //     navigate("/user/jobseekerlogin");
  //     window.scrollTo(0, 0);
  //   }
  // }, []);

  const handleClick = async (slug1, slug2, id) => {
    router.push(`/jobdescription/${slug1}/${slug2}`);
    sessionStorage.setItem("id", id);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Get current jobs to display based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentData = appliedJobs
    ? appliedJobs.slice(indexOfFirstJob, indexOfLastJob)
    : appliedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Function to handle pagination page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="container paymentHistory">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <Sidebar />
              </div>

              <div
                className="col-lg-9 col-md-9 mb-5"
                style={{
                  borderLeft: "2px solid #e6e8e7",
                  borderRight: "2px solid #e6e8e7",
                }}
              >
                <div className="PHHeader">
                  <div className="d-flex PageHeader">
                    <Image
                                            width={34}
                                            height={34}
                                            unoptimized={true}
                      src="/Images/jobseekerSide/Applied-Jobs-color.png"
                      alt="Applied Jobs"
                    />
                    <h3 className="ms-1" style={{ color: "#8cbcdc" }}>
                      {t("jobseekerAppliedJobs.appliedJobs")}
                    </h3>
                  </div>

                  <div className="PHBody mt-5">
                    <table className="table">
                      <thead>
                        <tr className="table-active TrFirst">
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.SNo.")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.jobTitle")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.jobType")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.appliedDate")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.status")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("jobseekerAppliedJobs.action")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((i, index) => {
                          return (
                            <tr className="TrDefoult">
                              <td className="">{index + 1}</td>
                              <td className="">{i.title}</td>
                              <td className="">{i.worktype}</td>
                              <td className="">{i.created}</td>
                              <td className="">{i.status}</td>
                              <td className="TrActions">
                                <button
                                  // to={`/jobdescription/${i.slug}/${i.cat_slug}`}
                                  className="btn btn-primary"
                                  onClick={() =>
                                    handleClick(i.slug, i.cat_slug, i.id)
                                  }
                                  style={{
                                    backgroundColor: primaryColor,
                                    color: "white",
                                  }}
                                >
                                  {/* <i class="fa-solid fa-circle-info"></i> */}
                                  <CiCircleInfo />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="JSAppliedJobsPagination">
                  <p className="text-muted empPaginationData">
                    {t("pagination.NoofRecords")}{" "}
                    {appliedJobs.length > 0
                      ? indexOfFirstJob + 1
                      : indexOfFirstJob}
                    -{Math.min(indexOfLastJob, appliedJobs.length)} of{" "}
                    {appliedJobs ? appliedJobs.length : appliedJobs.length}
                  </p>
                  {/* Custom Pagination */}
                  <div className="d-flex justify-content-center empPaginationButton">
                    <button
                      className="navButton1 me-2"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{
                        backgroundColor: hoverFirstButtonColor
                          ? secondaryColor
                          : primaryColor,
                        border: hoverFirstButtonColor
                          ? secondaryColor
                          : primaryColor,
                      }}
                      onMouseEnter={handleFirstButtonMouseEnter}
                      onMouseLeave={handleFirstButtonMouseLeave}
                    >
                      {t("pagination.Prev")}
                    </button>
                    <button
                      className="navButton1"
                      disabled={
                        appliedJobs
                          ? indexOfLastJob >= appliedJobs.length
                          : indexOfLastJob >= appliedJobs.length
                      }
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{
                        backgroundColor: hoverSecondButtonColor
                          ? secondaryColor
                          : primaryColor,

                        border: hoverSecondButtonColor
                          ? secondaryColor
                          : primaryColor,
                      }}
                      onMouseEnter={handleSecondButtonMouseEnter}
                      onMouseLeave={handleSecondButtonMouseLeave}
                    >
                      {t("pagination.Next")}
                    </button>
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

export default JSAppliedJobs;
