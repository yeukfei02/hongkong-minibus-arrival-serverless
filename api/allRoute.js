const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.allRouteRequest = async (region) => {
  let allRoute = {};

  let response = null;
  if (!region) {
    response = await axios.get(`${rootUrl}/route`);
  } else {
    response = await axios.get(`${rootUrl}/route/${region}`);
  }

  if (response) {
    const responseData = response.data;
    console.log("responseData = ", responseData);

    if (responseData) {
      allRoute = responseData.data;
    }
  }

  return allRoute;
};
