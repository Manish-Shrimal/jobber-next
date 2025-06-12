"use client"
import React, { useEffect, useState } from "react";
import NavBar from "@/app/(user-side)/(elements)/NavBar";
import Footer from "@/app/(user-side)/(elements)/Footer";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useTranslation } from "react-i18next";
import BaseApi from "@/app/(api)/BaseApi";
import Link from "next/link";
import Image from "next/image";

const Page = ({ params }) => {
  const slug = params.slug;
  const [dynamicBlogData, setdynamicBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation("common");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BaseApi + `/blog/${slug}`);
      setdynamicBlogData(response.data.response.Blog);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getting blog data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <div className="dynamicBlogPage">
            <div className="DBPSection1 text-center">
              <h1>
                {dynamicBlogData.title
                  ? HTMLReactParser(dynamicBlogData.title)
                  : ""}
              </h1>
              <h6 className="text-muted fw-normal">
                {" "}
                <Link href="/" style={{ color: "grey" }}>
                  {t("navHeaders.home")}
                </Link>
                /
                <Link href="/blog" style={{ color: "grey" }}>
                  {t("blogPage.blog")}
                </Link>
              </h6>
            </div>
            <div className="container DBPSection2">
              <div className="">
                <div className="text-center">
                  {dynamicBlogData.image ? (
                    <Image
                      width={400}
                      height={400}
                      unoptimized={true}
                      className=""
                      src={dynamicBlogData.image}
                      alt="blog-image"
                    />
                  ) : (
                    <Image
                      width={500}
                      height={400}
                      unoptimized={true}
                      className=""
                      src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).webp"
                      alt="This is a relevant visual of post"
                    />
                  )}
                </div>
                <div className="text-left pb-0">
                  <h5 className="blue-text pb-2">
                    <p>
                      {t("blogPage.posted")}: {dynamicBlogData.created}
                    </p>
                  </h5>
                  <hr />
                  <p className="text-justify card-text ">
                    {dynamicBlogData.description
                      ? HTMLReactParser(dynamicBlogData.description)
                      : ""}
                  </p>
                  <div className="text-muted text-center mt-4"></div>
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

export default Page;
