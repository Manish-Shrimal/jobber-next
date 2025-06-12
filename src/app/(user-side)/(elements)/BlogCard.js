"use client"

// import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image"

const BlogCard = (props) => {

  const [t, i18n] = useTranslation("global")
  const [hoverColor, setHoverColor] = useState(false);

  const handleMouseEnter = () => {
    setHoverColor(true);
  };

  const handleMouseLeave = () => {
    setHoverColor(false);
  };

  return (
    <>
      <div className="blogCard card ">
        <div className="view">
          <Link href={`/blog/${props.slug}`}>
            {props.image ? (
              <Image 
              width={100}
              height={100}
              unoptimized={true}
                className="card-img-top p-2 "
                src={props.image}
                alt="Card cap"
              />
            ) : (
              <Image 
              width={100}
              height={100}
              unoptimized={true}
                className="card-img-top p-2 "
                src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).webp"
                alt="Card cap"
              />
            )}
          </Link>
        </div>

        <div className="blogCardBody card-body">
          <Link href={`/blog/${props.slug}`}>
            <p className="text-muted mb-2">{t("blogPage.posted")}: {props.created}</p>
            <h4 className="card-title">
              {props.title ? HTMLReactParser(props.title) : ""}
            </h4>
            <p className="card-text text-muted">
              {props.description
                ? HTMLReactParser(props.description.substring(0, 100))
                : ""}
              ...
            </p>
          </Link>
        </div>
        <div className="card-footer blogCardFooter">
          <Link
            href={`/blog/${props.slug}`}
            style={{
              color: `${
                props.secondaryColor &&
                (hoverColor
                  ? props.secondaryColor
                  : props.primaryColor)
              }`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="mt-3"
          >
            {t("blogPage.learnMore")} &gt;
            {/* </p> */}
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
