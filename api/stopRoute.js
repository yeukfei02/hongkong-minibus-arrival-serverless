const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.stopRouteRequest = async (stopId) => {
  let stopRoute = {};

  if (stopId) {
    const response = await axios.get(`${rootUrl}/stop-route/${stopId}`);
    if (response) {
      const responseData = response.data;
      if (responseData) {
        stopRoute = responseData.data;
      }
    }
  }

  return stopRoute;
};
