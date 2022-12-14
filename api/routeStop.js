const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.routeStopRequest = async (routeId) => {
  let routeStop = {};

  if (routeId) {
    const routeSeq = `1`;
    const response = await axios.get(
      `${rootUrl}/route-stop/${routeId}/${routeSeq}`
    );
    if (response) {
      const responseData = response.data;
      if (responseData) {
        routeStop = responseData.data.route_stops;
      }
    }
  }

  return routeStop;
};
