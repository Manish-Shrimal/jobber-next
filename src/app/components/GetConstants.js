// import React, { useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const BaseApi = "https://job-board-software.logicspice.com/job-board-script/api";

// const getConstantData = async () => {
//   try {
//     const response = await axios.get(BaseApi  + "/getconstant");
//     const responseData = response.data.response;

//     // Set cookies
//     Cookies.set("siteLogo", responseData.site_logo);
//     Cookies.set("siteLink", responseData.site_link);
//     Cookies.set("siteTitle", responseData.site_title);
//     Cookies.set("siteFavicon", responseData.site_favicon);
//     Cookies.set("siteEmail", responseData.site_email);
//     Cookies.set("captchaKey", responseData.captcha_public_key);
//     Cookies.set("primaryColor", responseData.primary_color);
//     Cookies.set("secondaryColor", responseData.secondary_color);
//     Cookies.set("mapKey", responseData.map_key);
//     Cookies.set("curr", responseData.curr);
//     Cookies.set("stripe_pk", responseData.stripe_key);

//     // Set document title
//     document.title = responseData.site_title;
//   } catch (error) {
//     console.log("Error getting constant information:", error);
//   }



//   useEffect(() => {
//     getConstantData();
//   }, []);

// };


// export default GetConstants;










import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BaseApi = "https://job-board-software.logicspice.com/job-board-script/api";

const GetConstants = () => {
  useEffect(() => {
    const getConstantData = async () => {
      try {
        const response = await axios.get(BaseApi + "/getconstant");
        const responseData = response.data.response;

        // Set cookies
        Cookies.set("siteLogo", responseData.site_logo);
        Cookies.set("siteLink", responseData.site_link);
        Cookies.set("siteTitle", responseData.site_title);
        Cookies.set("siteFavicon", responseData.site_favicon);
        Cookies.set("siteEmail", responseData.site_email);
        Cookies.set("captchaKey", responseData.captcha_public_key);
        Cookies.set("primaryColor", responseData.primary_color);
        Cookies.set("secondaryColor", responseData.secondary_color);
        Cookies.set("mapKey", responseData.map_key);
        Cookies.set("curr", responseData.curr);
        Cookies.set("stripe_pk", responseData.stripe_key);

        // Set document title
        document.title = responseData.site_title;
      } catch (error) {
        console.error("Error getting constant information:", error);
      }
    };

    getConstantData();
  }, []);

  return null; // Since it only fetches and sets cookies
};

export default GetConstants;

