// import React from 'react'

// const APNavbar = () => {
//   return (
//     <>
      
//     </>
//   )
// }

// export default APNavbar








"use client"

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useParams } from "next/navigation";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

const APNavBar = () => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      
      Cookies.remove("token");
      Cookies.remove("adminName");
      Cookies.remove("adminuser_type");
      Cookies.remove("adminID");

      router.push("/admin/login");
      window.location.reload();
    } catch (error) {
      console.log("Couldn't log out");
    }
  };

  let siteLogo = Cookies.get("siteLogo");
  let adminID = Cookies.get("adminID");
  let adminName = Cookies.get("adminName");

  return (
    <div className="APNavbar">
      <Navbar expand="lg" className="defaultnavbar">
        {/* <Container className=""> */}
        <div className="APNavSectionLeft">
          <Link href="/admin/dashboard">
            <Navbar.Brand>
              {siteLogo && (
                <Image width={50} height={10} className="adminNavLogo" src={siteLogo} alt="Logo" />
              )}
              {!siteLogo && (
                <Image 
                  width={120}
                  height={50}
                  className="adminNavLogo"
                  src="/Images/logo.png"
                  alt="Logo"
                />
              )}
            </Navbar.Brand>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbardefault">
          <Nav
            className="ms-auto my-2 my-lg-0 navigation"
            navbarScroll
            style={{ fontSize: "18px" }}
          >
            <div className="APNavSectionRight">
              <div className="part1">
     

                <Link href="/admin/employer-list" className="SearchIcon">
                  <i>
                    <Image width={20} height={20} src="/Images/adminpanel/search.svg" alt="Search" />
                  </i>
                </Link>
                <div className="bellIndicator">
                  <i>
                    <Image
                      width={20}
                      height={120}
                      className="bell"
                      src="/Images/adminpanel/bell.svg"
                      alt="Bell"
                    />
                  </i>
                  <i>
                    <Image
                      width={10}
                      height={10}
                      className="indicator"
                      src="/Images/adminpanel/indicator.svg"
                      alt="Bell"
                    />
                  </i>
                </div>
              </div>

              <div className="part2">
                <div className="APNavInner1">
                  <Link href="/admin/dashboard" className="SearchIcon">
                    {/* <i>
                      <img src="/Images/adminpanel/avatar.png" alt="Avatar" />
                    </i> */}
                  </Link>
                </div>
                <div className="APNavInner3">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle SearchIcon"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {adminID === "1" && "Admin"}
                      {adminID !== "1" && adminName}
                    </button>
                    <ul
                      className="dropdown-menu custom-dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <div className="row">
                        <div className="dropdownMenu col-md-4 text-black">
                          <Link href="/admin/change-username">
                            <PersonIcon />
                            Change Username
                          </Link>
                        </div>
                        <div className="dropdownMenu col-md-4">
                          <Link href="/admin/change-password">
                            <LockIcon />
                            Change Password
                          </Link>
                        </div>
                        <div className="dropdownMenu col-md-4">
                          <Link href="/admin/change-email">
                            <EmailIcon />
                            Change Email
                          </Link>
                        </div>
                      </div>
                      <button onClick={() => handleLogout()}>
                        <div className="dropdownMenuLower row">
                          <div className="col-md-12">
                            <KeyIcon />
                            Logout
                          </div>
                        </div>
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
};

export default APNavBar;

