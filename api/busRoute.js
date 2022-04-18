const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.busRouteRequest = async (region, routeStr) => {
  let busRoute = {};

  if (region && routeStr) {
    const response = await axios.get(`${rootUrl}/route/${region}/${routeStr}`);
    if (response) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        busRoute = responseData.data;
      }
    }
  }

  return busRoute;
};
