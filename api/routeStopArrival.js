const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.routeStopArrivalRequest = async (routeId, stopId) => {
  let routeStopArrival = {};

  if (routeId && stopId) {
    const response = await axios.get(
      `${rootUrl}/eta/route-stop/${routeId}/${stopId}`
    );
    if (response) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        routeStopArrival = responseData.data;
      }
    }
  }

  return routeStopArrival;
};
