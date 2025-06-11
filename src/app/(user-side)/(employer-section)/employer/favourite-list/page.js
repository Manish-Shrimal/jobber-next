"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import { FaUser } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const FavouriteList = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenKey = Cookies.get("employerToken");
  const config = useRecoilValue(configState);
 let primaryColor = config.primary_color;

  let secondaryColor = config.secondary_color;
  const [t, i18n] = useTranslation("common");

    const router = useRouter();


  useEffect(() => {

      getData();
      window.scrollTo(0, 0);
    
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BaseApi + "/candidates/favorite",
        null, // Pass null as the request body if not required
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
        setFavouriteData(response.data.response.Favorite);
        // console.log(favouriteData);
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
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmationResult = await Swal.fire({
        title: t("employerFavouriteList.removeProfileConfirmTitle"),
        text: t("employerFavouriteList.removeProfileConfirmTxt"),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("employerFavouriteList.yes"),
        cancelButtonText: t("employerFavouriteList.no"),
      });
      if (confirmationResult.isConfirmed) {
        setLoading(true);
        const response = await axios.post(
          BaseApi + `/candidates/deleteFavoriteList/${id}`,
          null, // Pass null as the request body if not required
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
            title: t("employerFavouriteList.removeSuccessTitle"),
            icon: "success",
            confirmButtonText: t("employerFavouriteList.close"),
          });
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

        getData();
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
        title: t("employerFavouriteList.removeFailedTitle"),
        text: t("employerFavouriteList.removeFailedTxt"),
        icon: "error",
        confirmButtonText: t("employerFavouriteList.close"),
      });
      console.log("Couldn't delete the record!", error.message);
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  // Get current jobs to display based on pagination
  const indexOfLastRecord = currentPage * dataPerPage;
  const indexOfFirstRecord = indexOfLastRecord - dataPerPage;
  const currentData = favouriteData
    ? favouriteData.slice(indexOfFirstRecord, indexOfLastRecord)
    : favouriteData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Function to handle pagination page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="container favouriteList">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <Sidebar />
          </div>
          {loading ? (
            <div className="loader-container"></div>
          ) : (
            <>
              <div
                className="col-lg-9 col-md-9 mb-5"
                style={{
                  borderLeft: "2px solid #e6e8e7",
                  borderRight: "2px solid #e6e8e7",
                }}
              >
                <div className="FLHeader">
                  <div className="d-flex PageHeader">
                    <Image
                          width={30}
                          height={30}
                          unoptimized={true} src="/Images/employerSide/icon4color.png" alt="Icon4" />
                    <h3 className="mx-2">
                      {t("employerFavouriteList.favouriteJobseeker")}
                    </h3>
                  </div>

                  <div className="PHBody mt-5">
                    <table className="table">
                      <thead>
                        <tr className="table-active TrFirst">
                          <th className="" scope="col p-3">
                            {t("employerFavouriteList.SNo.")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("employerFavouriteList.jobseekerName")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("employerFavouriteList.email")}
                          </th>
                          <th className="" scope="col p-3">
                            {t("employerFavouriteList.action")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((i, index) => {
                          return (
                            <tr className="TrDefoult" key={index}>
                              <td className="">{index + 1}</td>
                              <td className="">
                                {i.first_name} {i.last_name}
                              </td>
                              <td className="">{i.email_address}</td>
                              <td className="TrActions">
                                <Link
                                  href={`/candidate-profile/${i.slug}`}
                                  className="btn btn-primary"
                                  style={{
                                    backgroundColor: primaryColor,
                                    color: "white",
                                  }}
                                >
                                  <FaUser />
                                </Link>
                                <button
                                  onClick={() => handleDelete(i.id)}
                                  className="btn btn-secondary"
                                  style={{
                                    backgroundColor: secondaryColor,
                                    color: "white",
                                  }}
                                >
                                 <FaTrashCan />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="favListPagination">
                  <p className="text-muted empPaginationData">
                    {t("pagination.NoofRecords")} {favouriteData.length > 0 ? indexOfFirstRecord + 1 : indexOfFirstRecord}-
                    {Math.min(indexOfLastRecord, favouriteData.length)} of{" "}
                    {favouriteData
                      ? favouriteData.length
                      : favouriteData.length}
                  </p>
                  {/* Custom Pagination */}
                  <div className="d-flex justify-content-center empPaginationButton">
                    <button
                      className="navButton1 me-2"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      {t("pagination.Prev")}
                    </button>
                    <button
                      className="navButton1"
                      disabled={
                        favouriteData
                          ? indexOfLastRecord >= favouriteData.length
                          : indexOfLastRecord >= favouriteData.length
                      }
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      {t("pagination.Next")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FavouriteList;
