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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import Link from "next/link"
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";


const JSManageAlerts = () => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState([]);
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

    const [hoverThirdButtonColor, setHoverThirdButtonColor] = useState(false);

    const handleThirdButtonMouseEnter = () => {
        setHoverThirdButtonColor(true);
    };

    const handleThirdButtonMouseLeave = () => {
        setHoverThirdButtonColor(false);
    };

    const [hoverFourthButtonColor, setHoverFourthButtonColor] = useState(false);

    const handleFourthButtonMouseEnter = () => {
        setHoverFourthButtonColor(true);
    };

    const handleFourthButtonMouseLeave = () => {
        setHoverFourthButtonColor(false);
    };
    const [hoverFifthButtonColor, setHoverFifthButtonColor] = useState(false);

    const handleFifthButtonMouseEnter = () => {
        setHoverFifthButtonColor(true);
    };

    const handleFifthButtonMouseLeave = () => {
        setHoverFifthButtonColor(false);
    };



    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                BaseApi + "/alerts/index",
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
                setAlert(response.data.response.alerts);
                // console.log(alert);
            } else if (response.data.status === 400) {
                Cookies.remove("jobseekerToken");
                Cookies.remove("user_type");
                Cookies.remove("fname");
                router.push("/");
                Swal.fire({
                    title: response.data.message,
                    icon: "warning",
                    confirmButtonText: t("jobseekerManageAlert.close"),
                });
            } else {
                Swal.fire({
                    title: response.data.message,
                    icon: "error",
                    confirmButtonText: t("jobseekerManageAlert.close"),
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
            console.log("Cannot get payment data");
        }
    };

    useEffect(() => {

        getData();
        window.scrollTo(0, 0);

    }, []);

    const handleClick = async (slug) => {
        try {
            const confirmationResult = await Swal.fire({
                title: t("jobseekerManageAlert.confirmTitle"),
                text: t("jobseekerManageAlert.confirmTxt"),
                icon: "question",
                showCancelButton: true,
                confirmButtonText: t("jobseekerManageAlert.yes"),
                cancelButtonText: t("jobseekerManageAlert.no"),
            });
            if (confirmationResult.isConfirmed) {
                const response = await axios.post(
                    BaseApi + `/alerts/delete/${slug}`,
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
                    Swal.fire({
                        title: t("jobseekerManageAlert.successTxt"),
                        icon: "success",
                        confirmButtonText: t("jobseekerManageAlert.close"),
                    });
                } else if (response.data.status === 400) {
                    Cookies.remove("jobseekerToken");
                    Cookies.remove("user_type");
                    Cookies.remove("fname");
                    router.push("/");
                    Swal.fire({
                        title: response.data.message,
                        icon: "warning",
                        confirmButtonText: t("jobseekerManageAlert.close"),
                    });
                } else if (response.data.status === 500) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "error",
                        confirmButtonText: t("jobseekerManageAlert.close"),
                    });
                } else {
                    Swal.fire({
                        title: t("jobseekerManageAlert.failedTxt"),
                        icon: "error",
                        confirmButtonText: t("jobseekerManageAlert.close"),
                    });
                }
            }
            getData();
            // console.log("Record deleted successfully!");
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
            console.log("Cannot delete!");
        }
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const alertsPerPage = 10;

    // Get current jobs to display based on pagination
    const indexOfLastAlert = currentPage * alertsPerPage;
    const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
    const currentData = alert
        ? alert.slice(indexOfFirstAlert, indexOfLastAlert)
        : alert.slice(indexOfFirstAlert, indexOfLastAlert);

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
                                    <div className="JSMASection2">
                                        <div className="d-flex JSManageAlertHeader PageHeader">
                                            <Image
                                                width={34}
                                                height={34}
                                                unoptimized={true}
                                                src="/Images/jobseekerSide/Manage-Alerts2.png"
                                                alt=""
                                            />
                                            <h3 className="ms-1" style={{ color: "#ecd4f4" }}>
                                                {t("jobseekerManageAlert.manageAlert")}
                                            </h3>
                                        </div>
                                        <Link
                                            href="/jobseeker/alerts/add-alert"
                                            className="btn btn-primary button1 JSMAHeaderButton"
                                            style={{
                                                backgroundColor: hoverFifthButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                                border: hoverFifthButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                            }}
                                            onMouseEnter={handleFifthButtonMouseEnter}
                                            onMouseLeave={handleFifthButtonMouseLeave}
                                        >
                                            {t("jobseekerManageAlert.addAlert")}
                                        </Link>
                                    </div>
                                    <div className="PHBody mt-5">
                                        <table className="table">
                                            <thead>
                                                <tr className="table-active TrFirst">
                                                    <th className="" scope="col p-3">
                                                        {t("jobseekerManageAlert.SNo.")}
                                                    </th>
                                                    <th className="" scope="col p-3">
                                                        {t("jobseekerManageAlert.location")}
                                                    </th>
                                                    <th className="" scope="col p-3">
                                                        {t("jobseekerManageAlert.workingRelation")}
                                                    </th>
                                                    <th className="" scope="col p-3">
                                                        {t("jobseekerManageAlert.action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((i, index) => {
                                                    return (
                                                        <tr className="TrDefoult">
                                                            <td className="">{index + 1}</td>
                                                            <td className="">{i.location}</td>
                                                            <td className="">{i.designation}</td>
                                                            <td className="TrActions">
                                                                <Link
                                                                    href={`/jobseeker/alerts/edit-alert/${i.slug}`}
                                                                    className="btn btn-primary"
                                                                    style={{
                                                                        backgroundColor: hoverFirstButtonColor
                                                                            ? secondaryColor
                                                                            : primaryColor,
                                                                        border: hoverFirstButtonColor
                                                                            ? secondaryColor
                                                                            : primaryColor,
                                                                    }}
                                                                >
                                                                    <FaPenToSquare />
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleClick(i.slug)}
                                                                    className="btn btn-secondary"
                                                                    style={{
                                                                        backgroundColor: hoverSecondButtonColor
                                                                            ? primaryColor
                                                                            : secondaryColor,
                                                                        border: hoverSecondButtonColor
                                                                            ? primaryColor
                                                                            : secondaryColor,
                                                                    }}
                                                                >
                                                                    <FaRegTrashAlt />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="JSmanageAlertPagination">
                                    <p className="text-muted empPaginationData">
                                        {t("pagination.NoofRecords")}{" "}
                                        {alert.length > 0
                                            ? indexOfFirstAlert + 1
                                            : indexOfFirstAlert}
                                        -{Math.min(indexOfLastAlert, alert.length)} of{" "}
                                        {alert ? alert.length : alert.length}
                                    </p>
                                    {/* Custom Pagination */}
                                    <div className="d-flex justify-content-center empPaginationButton">
                                        <button
                                            className="navButton1 me-2"
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            style={{
                                                backgroundColor: hoverThirdButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                                border: hoverThirdButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                            }}
                                            onMouseEnter={handleThirdButtonMouseEnter}
                                            onMouseLeave={handleThirdButtonMouseLeave}
                                        >
                                            {t("pagination.Prev")}
                                        </button>
                                        <button
                                            className="navButton1"
                                            disabled={
                                                alert
                                                    ? indexOfLastAlert >= alert.length
                                                    : indexOfLastAlert >= alert.length
                                            }
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            style={{
                                                backgroundColor: hoverFourthButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                                border: hoverFourthButtonColor
                                                    ? secondaryColor
                                                    : primaryColor,
                                            }}
                                            onMouseEnter={handleFourthButtonMouseEnter}
                                            onMouseLeave={handleFourthButtonMouseLeave}
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

export default JSManageAlerts;
