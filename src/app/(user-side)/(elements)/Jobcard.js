import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  EmailShareButton,
  InstapaperShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
  PinterestIcon,
  InstapaperIcon,
  TelegramIcon,
} from "react-share";
import { useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import HTMLReactParser from "html-react-parser";
import { IoLocation } from "react-icons/io5";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";
import { SlCalender } from "react-icons/sl";


const JobCard = (props) => {
  const config = useRecoilValue(configState);

  let curr = config.curr;
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // Track the selected payment

  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
  };

  const [t, i18n] = useTranslation("common");
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Adjusted width for mobile responsiveness
    maxWidth: "400px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const tokenKey = Cookies.get("tokenClient");

  // const handleJobView = () => {
  //   if (!tokenKey) {
  //     navigate("/user/jobseekerlogin");
  //   } else {
  //     if(props.itemSearched) {
  //       navigate(`/jobdescription/${props.slug}/${props.cat_slug}/${props.itemSearched}`);
  //     }
  //     navigate(`/jobdescription/${props.slug}/${props.cat_slug}`);
  //   }
  // };

  return (
    <div
      className="card Jcard"
      // onClick={() => handleJobView()}
    >
      <div className="card-body JcardBody">
        <div className="JcardHead d-flex flex-row justify-content-between">
          
          <Link
            href={`/job-description/${props.slug}`}
            className="h5 card-title JcardTitle"
          >
            {props.title}
          </Link>
          
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ ...style, width: 700 }}>
                <Button
                  onClick={handleClose} // Call handleClose when the button is clicked
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }} // Position the button
                >
                  {t("messageForm.close")}
                </Button>

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 6 }}>
                  <div className="modals ">
                    <div className="modalHead">
                      <h3>{t("messageForm.shareNow")}</h3>
                    </div>
                    <div className="modalBody mt-4">
                      <ul className="shareIconsList">
                        <li className="shareIconsButtons">
                          <FacebookShareButton url={props.job_url}>
                            <FacebookIcon
                              logoFillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <TwitterShareButton url={props.job_url}>
                            <TwitterIcon
                              logoFillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <WhatsappShareButton url={props.job_url}>
                            <WhatsappIcon
                              logoFillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <LinkedinShareButton url={props.job_url}>
                            <LinkedinIcon
                              logoFillColor="white"
                              round={true}
                            ></LinkedinIcon>
                          </LinkedinShareButton>
                        </li>

                        <li className="shareIconsButtons">
                          <EmailShareButton url={props.job_url}>
                            <EmailIcon
                              logoFillColor="white"
                              round={true}
                            ></EmailIcon>
                          </EmailShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <PinterestShareButton url={props.job_url}>
                            <PinterestIcon
                              logoFillColor="white"
                              round={true}
                            ></PinterestIcon>
                          </PinterestShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <InstapaperShareButton url={props.job_url}>
                            <InstapaperIcon
                              logoFillColor="white"
                              round={true}
                            ></InstapaperIcon>
                          </InstapaperShareButton>
                        </li>
                        <li className="shareIconsButtons">
                          <TelegramShareButton url={props.job_url}>
                            <TelegramIcon
                              logoFillColor="white"
                              round={true}
                            ></TelegramIcon>
                          </TelegramShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="JcardBodySection1 float-left">
          {curr}
          {props.min_salary}-{curr}
          {props.max_salary}/{t("messageForm.jobCardYear")}
        </div>
        <div className="JcardBodySection2 flex-row">
          <div className="section2Item1 float-left">
            {t("messageForm.jobCardExperience")}: {props.min_exp}{" "}
            {t("messageForm.jobCardYears")}
          </div>
          <div className="section2Item2 text-muted">
            <SlCalender /> {props.created}{" "}
            {t("messageForm.jobCardDaysAgo")}
          </div>
        </div>
        <div className="JcardBodySection3">
          {props.description
            ? HTMLReactParser(props.description.substring(0, 90))
            : ""}
        </div>
        <h6 className="card-footer JcardFooter">
          {props.logo ? (
            <>
              <div className="JcardFooterItem1DynamicImage">
                <Image
                  width={70}
                  height={100}
                  src={props.logo}
                  alt={props.logo}
                />
              </div>
            </>
          ) : (
            <>
              <div className="JcardFooterItem1">
                <Image
                  width={70}
                  height={70}
                  src="/Images/dummy-logo.png"
                  alt=""
                />
              </div>
            </>
          )}

          <div className="JcardFooterItem2">
            <h6>{props.company_name}</h6>
            <p className="text-muted" style={{
              display: "flex",
              justifyContent: "flex-start",
              placeItems: "center",
              gap: "3px"
            }}>

              <IoLocation style={{ color: "#a3a3a3" }} />
              {" "}
              {props.job_city?.substring(0, 20)}
            </p>
          </div>
          <Link
            href={`/job-description/${props.slug}`}
            className="h5 card-title JcardTitle"
          >
            <div className="JcardFooterItem3">{props.work_type}</div>
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default JobCard;
