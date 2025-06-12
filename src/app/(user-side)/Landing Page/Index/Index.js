"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BaseApi from "@/app/(api)/BaseApi";
import ApiKey from "@/app/(api)/ApiKey";
import { configState } from "@/app/lib/atoms/ConfigAtom";
import { useRecoilValue } from "recoil";

// Lazy-load components
const NavBar = lazy(() => import("@/app/(user-side)/(elements)/NavBar"));
const Footer = lazy(() => import("@/app/(user-side)/(elements)/Footer"));
const TopSlider = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/Slider/TopSlider")
);
const KeyFeatures = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/KeyFeatures/KeyFeatures")
);
const ExploreCategory = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/Categories/ExploreCategories")
);
const BrowseJobs = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/BrowseJobs/BrowseJobs")
);
const FeaturedJobs = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/FeaturedJobs/FeaturedJobs")
);
const MembershipPlans = lazy(() =>
  import(
    "@/app/(user-side)/Landing Page/Sections/MembershipPlans/MembershipPlans"
  )
);
const TopEmployers = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/TopEmployers/TopEmployers")
);
const DownloadApp = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/DownloadApp/DownloadApp")
);
const Banner = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/BannerAdvertisement/Banner")
);
const Announcement = lazy(() =>
  import("@/app/(user-side)/Landing Page/Sections/Announcement/Announcement")
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

const Index = () => {
    const config = useRecoilValue(configState);
  

  const [skills, setSkills] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [job_title, setJob_title] = useState([]);
  const [categoryListing, setCategoryListing] = useState([]);
  const [jobCardData, setJobCardData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [topEmployer, setTopEmployer] = useState([]);
  const [bannerDetails, setBannerDetails] = useState([]);
  const [announcementDetails, setAnnouncementDetails] = useState([]);
  const [slider, setSlider] = useState([]);
  const [homePageSloganTxt, setHomePageSloganTxt] = useState("");
  const [homePageSloganTitle, setHomePageSloganTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cookies once
  const cookieData = useMemo(
    () => ({
      tokenKey: Cookies.get("employerToken") || Cookies.get("jobseekerToken"),
      primaryColor: config.primary_color || "#294a9c", // Default blue
      secondaryColor: config.secondary_color || "#f3734c", // Default pink
      curr: config.curr,
      userType: Cookies.get("user_type"),
    }),
    []
  );

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(BaseApi + `/home`, {
        headers: {
          "Content-Type": "application/json",
          key: ApiKey,
          token: cookieData.tokenKey,
        },
      });

      setSkills(response.data.response.skillList || []);
      setCategoryData(response.data.response.categories || []);
      setPopularSearches(response.data.response.keywords || []);
      setJob_title(response.data.response.job_title || []);
      setHomePageSloganTxt(
        response.data.response.site_setting?.slogan_text || ""
      );
      setHomePageSloganTitle(
        response.data.response.site_setting?.slogan_title || ""
      );
      setCategoryListing(response.data.response.categories_listing || []);
      setJobCardData(response.data.response.latestJobList || []);
      setMembershipData(response.data.response.plans_details || []);
      setTopEmployer(response.data.response.top_employer || []);
      setBannerDetails(response.data.response.bannerDetails || []);
      setAnnouncementDetails(response.data.response.announcementList || []);
      setSlider(response.data.response.sliderList || []);

      // Set cookies for social links
      Cookies.set(
        "fbLink",
        response.data.response.site_setting?.facebook_link || ""
      );
      Cookies.set(
        "instaLink",
        response.data.response.site_setting?.instagram_link || ""
      );
      Cookies.set(
        "linkedInLink",
        response.data.response.site_setting?.linkedin_link || ""
      );
      Cookies.set(
        "pinterestLink",
        response.data.response.site_setting?.pinterest || ""
      );
      Cookies.set(
        "twitterLink",
        response.data.response.site_setting?.twitter_link || ""
      );
    } catch (error) {
      console.error("Cannot get home page data!", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [cookieData.tokenKey]);

  useEffect(() => {
    getData();
    // console.log(getData)
  }, [getData]);

  // Memoize sliced data to prevent re-computation
  const slicedJobTitle = useMemo(() => job_title.slice(0, 20), [job_title]);
  const slicedSkills = useMemo(() => skills.slice(0, 20), [skills]);
  const slicedCategoryData = useMemo(
    () => categoryData.slice(0, 20),
    [categoryData]
  );
  const slicedPopularSearches = useMemo(
    () => popularSearches.slice(0, 20),
    [popularSearches]
  );
  const slicedJobCardData = useMemo(
    () => jobCardData.slice(0, 6),
    [jobCardData]
  );

  // if (loading) {
  //   return <div className="loader-container"></div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div></div>}>
        <NavBar />
        <TopSlider
          slider={slider}
          primaryColor={cookieData.primaryColor}
          secondaryColor={cookieData.secondaryColor}
          title={homePageSloganTitle}
          subtitle={homePageSloganTitle}
          description={homePageSloganTxt}
          userType={cookieData.userType}
          tokenKey={cookieData.tokenKey}
        />
        <KeyFeatures />
        <ExploreCategory
          category={categoryListing}
          primaryColor={cookieData.primaryColor}
        />
        <BrowseJobs
          jobTitle={slicedJobTitle}
          skillList={slicedSkills}
          category={slicedCategoryData}
          popularSearches={slicedPopularSearches}
          primaryColor={cookieData.primaryColor}
          secondaryColor={cookieData.secondaryColor}
        />
        <FeaturedJobs
          jobCardData={slicedJobCardData}
          primaryColor={cookieData.primaryColor}
          secondaryColor={cookieData.secondaryColor}
          curr={cookieData.curr}
        />
        <MembershipPlans
          membershipData={membershipData}
          primaryColor={cookieData.primaryColor}
          secondaryColor={cookieData.secondaryColor}
          curr={cookieData.curr}
          userType={cookieData.userType}
          tokenKey={cookieData.tokenKey}
        />
        <TopEmployers TopEmployer={topEmployer} />
        <DownloadApp />
        <Banner banner={bannerDetails} />
        <Announcement
          announcement={announcementDetails}
          primaryColor={cookieData.primaryColor}
        />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Index;
