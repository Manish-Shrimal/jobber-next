"use client";


import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import "./Banner.css";
import Image from "next/image";

const Banner = React.memo(({ banner = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (banner?.length - 1 || 0) ? 0 : prevIndex + 1
    );
  }, [banner?.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (banner?.length - 1 || 0) : prevIndex - 1
    );
  }, [banner?.length]);

  // Animation variants for fade-in and slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="banner-section" ref={ref}>
      <div className="container">
        {Array.isArray(banner) && banner.length > 0 ? (
          <div className="banner-item">
            {/* Left Arrow */}
            {banner.length > 1 && currentIndex > 0 && (
              <motion.button
                className="banner-arrow banner-arrow--left"
                onClick={prevSlide}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="banner-arrow-icon">←</span>
              </motion.button>
            )}
            {/* Banner Image */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={banner[currentIndex]?.url || "#"}>
                <Image
                  width={1200}
                  height={400}
                  // priority
                  unoptimized={true}
                  src={banner[currentIndex]?.image || "/Images/placeholder.png"}
                  alt="banner"
                  className="banner-image"
                  loading="lazy"
                />
              </Link>
            </motion.div>
            {/* Right Arrow */}
            {banner.length > 1 && currentIndex < banner.length - 1 && (
              <motion.button
                className="banner-arrow banner-arrow--right"
                onClick={nextSlide}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="banner-arrow-icon">→</span>
              </motion.button>
            )}
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-center text-muted">
              {/* No banners available. Please try again later. */}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
});

Banner.displayName = "Banner";

export default Banner;