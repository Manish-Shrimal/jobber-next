"use client"
import React, { useEffect, useRef, useState } from "react";
import APNavBar from "@/app/(admin-side)/admin/Components/APNavbar";
import APSidebar from "@/app/(admin-side)/admin/Components/APSidebar";
import { motion, useInView } from "framer-motion";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import APFooter from "@/app/(admin-side)/admin/Components/APFooter";
import { useRouter } from "next/navigation";
import { ChromePicker } from "react-color";
import Image from "next/image";
// Prepare FontAwesome icons for the picker
const iconList = Object.keys(faIcons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((key) => `fa${key}`);

const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    icon: "",
    icon_color: "#000000",
    icon_hover_color: "#000000",
    meta_keywords: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    icon: "",
    icon_color: "",
    icon_hover_color: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tokenKey = Cookies.get("token");
  const adminID = Cookies.get("adminID");
//   const navigate = useNavigate();
  const router = useRouter();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [useWebsiteTheme, setUseWebsiteTheme] = useState(false);
  const [themeColors, setThemeColors] = useState({
    primary_color: "#000000",
    secondary_color: "#000000",
  });

  // Debug: Log userData, selectedImage, and selectedIcon
  useEffect(() => {
    console.log("Page - userData:", userData);
    console.log("Page - selectedImage:", selectedImage);
    console.log("Page - selectedIcon:", selectedIcon);
  }, [userData, selectedImage, selectedIcon]);

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

  const fetchThemeColors = async () => {
    try {
      const response = await axios.get(
        BaseApi + "/admin/category/fetch-theme-color",
        {
          headers: {
            "Content-Type": "application/json",
            key: ApiKey,
            token: tokenKey,
          },
        }
      );
      if (response.data.status === 200) {
        setThemeColors(response.data.response);
      } else {
        console.error("Failed to fetch theme colors:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch theme colors:", error);
    }
  };

  useEffect(() => {
    fetchThemeColors();
  }, []);

  const handleThemeCheckboxChange = (e) => {
    const checked = e.target.checked;
    setUseWebsiteTheme(checked);
    if (checked) {
      setUserData((prev) => ({
        ...prev,
        icon_color: themeColors.primary_color,
        icon_hover_color: themeColors.secondary_color,
      }));
      setErrors((prev) => ({
        ...prev,
        icon_color: "",
        icon_hover_color: "",
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        icon_color: "#000000",
        icon_hover_color: "#000000",
      }));
    }
  };

  const handleIconSelect = (iconName) => {
    setUserData((prev) => ({
      ...prev,
      icon: iconName,
    }));
    setSelectedIcon(iconName);
    setErrors((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  const handleIconDeselect = () => {
    setUserData((prev) => ({
      ...prev,
      icon: "",
    }));
    setSelectedIcon(null);
  };

  const handleColorChange = (e) => {
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
      const { name, icon, icon_color, icon_hover_color } = userData;
      const newErrors = {
        name: name ? "" : "Category Name is required",
        icon: icon ? "" : "Category Icon is required",
        icon_color: icon_color ? "" : "Icon Color is required",
        icon_hover_color: icon_hover_color ? "" : "Icon Hover Color is required",
        image: "",
      };

      if (newErrors.name || newErrors.icon || newErrors.icon_color || newErrors.icon_hover_color) {
        setErrors(newErrors);
        return;
      }

      const confirmationResult = await Swal.fire({
        title: "Add Category?",
        text: "Do you want to add this category?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmationResult.isConfirmed) {
        setLoading(true);

        const response = await axios.post(
          BaseApi + "/admin/category/admin_add",
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
            title: "Category added successfully!",
            icon: "success",
            confirmButtonText: "Close",
          });
          router.push("/admin/categories");
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
        text: "Could not add category. Please try again later!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log("Could not add category!", error);
    }
  };

  const handleFileUpload1 = async (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
      convertToBase64(file).then((base64) => {
        setUserData((prev) => ({
          ...prev,
          image: base64,
        }));
        setSelectedImage(base64);
      });
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setUserData((prev) => ({
      ...prev,
      image: "",
    }));
    const fileInput = document.getElementById("formFile");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleReset = () => {
    setUserData({
      name: "",
      image: "",
      icon: "",
      icon_color: "#000000",
      icon_hover_color: "#000000",
      meta_keywords: "",
      meta_title: "",
      meta_description: "",
      keywords: "",
    });
    setSelectedImage(null);
    setSelectedIcon(null);
    setSearchQuery("");
    setUseWebsiteTheme(false);
    const fileInput = document.getElementById("formFile");
    if (fileInput) {
      fileInput.value = "";
    }
  };



  const filteredIcons = iconList.filter((icon) =>
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <APNavBar />
      <div className="APBasic">
        <APSidebar />
        {loading ? (
          <div className="loader-container"></div>
        ) : (
          <motion.div
            className="site-min-height"
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="breadCumb1"
              role="presentation"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
              >
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => router.push("/admin/dashboard")}
                >
                  Dashboard
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => router.push("/admin/categories")}
                >
                  Categories List
                </Link>
                <Typography color="text.primary">Add Category</Typography>
              </Breadcrumbs>
            </motion.div>

            <motion.h2
              className="adminPageHeading"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Add Category
            </motion.h2>

            <form className="adminForm mb-5">
              <div className="mb-5 mt-5">
                <motion.div
                  className="mb-5 DashBoardInputBx"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="name" className="form-label">
                    Category Name<span className="RedStar">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control ${errors.name && "input-error"}`}
                    name="name"
                    value={userData.name}
                    placeholder="Category Name"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </motion.div>

                <motion.div
                  className="mb-5 DashBoardInputBx"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="form-label">
                    Category Icon<span className="RedStar">*</span>
                  </label>
                  {selectedIcon && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faIcons[selectedIcon.replace("fa", "")]}
                        size="2x"
                        style={{ color: userData.icon_color }}
                      />
                      <span>{selectedIcon}</span>
                      <button
                        type="button"
                        className="APButton3"
                        onClick={handleIconDeselect}
                        style={{ marginLeft: "auto" }}
                      >
                        Deselect
                      </button>
                    </div>
                  )}
                  <div
                    className={`form-control ${errors.icon && "input-error"}`}
                    style={{
                      padding: "10px",
                      border: errors.icon
                        ? "1px solid #dc3545"
                        : "1px solid #ced4da",
                      borderRadius: "4px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      height: "300px",
                      maxWidth: "1100px !important",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search icons..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: "10px", }}
                    />
                    {filteredIcons.length > 0 ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(50px, 1fr))",
                          gap: "10px",
                        }}
                      >
                        {filteredIcons.map((icon) => (
                          <div
                            key={icon}
                            onClick={() => handleIconSelect(icon)}
                            style={{
                              cursor: "pointer",
                              padding: "5px",
                              textAlign: "center",
                              background:
                                selectedIcon === icon
                                  ? "#e9ecef"
                                  : "transparent",
                              borderRadius: "4px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faIcons[icon.replace("fa", "")]}
                              size="lg"
                              style={{ color: userData.icon_color }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No icons found</p>
                    )}
                  </div>
                  {errors.icon && (
                    <div className="text-danger">{errors.icon}</div>
                  )}
                  <p>Select an icon for the category.</p>
                </motion.div>

                <div class="d-flex flex-wrap gap-5 mb-2">
  <motion.div
    className="DashBoardInputBx w-full md:w-[48%]"
    variants={fadeInUp}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <label htmlFor="icon_color" className="form-label">
      Icon Color<span className="RedStar">*</span>
    </label>
    <ChromePicker
      color={userData.icon_color}
      onChangeComplete={(color) =>
        handleColorChange({ target: { name: "icon_color", value: color.hex } })
      }
      disableAlpha
    />
    {errors.icon_color && (
      <div className="text-danger mt-2">{errors.icon_color}</div>
    )}
    <p className="mt-2">Choose a color for the category icon.</p>
  </motion.div>

  <motion.div
    className="DashBoardInputBx w-full md:w-[48%]"
    variants={fadeInUp}
    transition={{ duration: 0.5, delay: 0.7 }}
  >
    <label htmlFor="icon_hover_color" className="form-label">
      Icon Hover Color<span className="RedStar">*</span>
    </label>
    <ChromePicker
      color={userData.icon_hover_color}
      onChangeComplete={(color) =>
        handleColorChange({
          target: { name: "icon_hover_color", value: color.hex },
        })
      }
      disableAlpha
    />
    {errors.icon_hover_color && (
      <div className="text-danger mt-2">{errors.icon_hover_color}</div>
    )}
    <p className="mt-2">Choose a hover color for the category icon.</p>
  </motion.div>
</div>

                <motion.div
                  className="mb-5 DashBoardInputBx"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="useWebsiteTheme"
                      checked={useWebsiteTheme}
                      onChange={handleThemeCheckboxChange}
                      style={{
                        width: "20px",
                        height: "20px",
                        minWidth: "20px",
                        padding: "0px",
                      }}
                    />
                    <label
                      className="form-check-label mt-1"
                      htmlFor="useWebsiteTheme"

                    >
                      Add website theme color
                    </label>
                  </div>
                  <p className="text-muted">
                    Use website theme colors for icon and hover.
                  </p>
                </motion.div>

                {[
                  {
                    label: "Meta Keywords",
                    name: "meta_keywords",
                    placeholder: "Meta Keywords",
                    type: "text",
                  },
                  {
                    label: "Meta Title",
                    name: "meta_title",
                    placeholder: "Meta Title",
                    type: "text",
                  },
                  {
                    label: "Meta Description",
                    name: "meta_description",
                    placeholder: "Meta Description",
                    type: "text",
                    note: "Note: Meta details are important please fill these information. If you don't filled it by default information will be show.",
                  },
                  {
                    label: "Keywords",
                    name: "keywords",
                    placeholder: "Keywords",
                    type: "text",
                    note: "(comma (,) separated)",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    className="mb-5 DashBoardInputBx"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      className={`form-control ${
                        errors[field.name] && "input-error"
                      }`}
                      name={field.name}
                      value={userData[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    />
                    {errors[field.name] && (
                      <div className="text-danger">{errors[field.name]}</div>
                    )}
                    {field.note && (
                      <div className="form-text">{field.note}</div>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  className="mb-5 DashBoardInputBx"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <label htmlFor="formFile" className="form-label">
                    Category Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image"
                    accept=".jpeg, .png, .jpg, .gif"
                    onChange={handleFileUpload1}
                  />
                  <p>
                    Supported File Types: gif, jpg, jpeg, png (Max. 600 KB).
                  </p>
                  {selectedImage && (
                    <div>
                      <Image
                        className="selectedInputImage"
                        src={selectedImage}
                        alt="Selected"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="APButton3"
                        onClick={deleteImage}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
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
                  onClick={handleReset}
                >
                  RESET
                </button>
              </motion.div>
            </form>
            <APFooter />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default React.memo(Page);

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