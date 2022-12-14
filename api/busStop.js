const axios = require("axios");
const { getRootUrl } = require("../helpers/helpers");

const rootUrl = getRootUrl();

module.exports.busStopRequest = async (stopId) => {
  let busStop = {};

  if (stopId) {
    const response = await axios.get(`${rootUrl}/stop/${stopId}`);
    if (response) {
      const responseData = response.data;
      if (responseData) {
        busStop = responseData.data;
      }
    }
  }

  return busStop;
};
