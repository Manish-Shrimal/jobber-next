"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const Announcement = React.memo(
  ({ announcement = [], primaryColor = "#007bff" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Debug: Log announcement and primaryColor props
    useEffect(() => {
      // console.log("Announcement - Props:", { announcement, primaryColor });
    }, [announcement, primaryColor]);

    // Animation variants for fade-in and slide-up
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <div className="announcement-section" ref={ref}>
        <div className="">
          {Array.isArray(announcement) && announcement.length > 0 ? (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Marquee
                className="marqueeText"
                pauseOnHover={true}
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {announcement.map((item, index) => (
                  <Link
                    key={item.name || index} // Fallback to index if name is missing
                    href={item.url || "#"}
                    className="marqueeLink"
                    target="_blank"
                  >
                    | {item.name || "Announcement"} |
                  </Link>
                ))}
              </Marquee>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-center text-muted">
                {/* No announcements available. Please check back later. */}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

Announcement.displayName = "Announcement";


export default Announcement;