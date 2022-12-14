const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.busStopArrivalRequest = async (stopId) => {
  let busStopArrival = {};

  if (stopId) {
    const response = await axios.get(`${rootUrl}/eta/stop/${stopId}`);
    if (response) {
      const responseData = response.data;
      if (responseData) {
        busStopArrival = responseData.data;
      }
    }
  }

  return busStopArrival;
};
