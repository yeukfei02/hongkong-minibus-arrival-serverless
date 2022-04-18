const { busStopRequest } = require("../../api/busStop");

module.exports.busStop = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { stopId } = event.queryStringParameters;
    if (stopId) {
      const busStop = await busStopRequest(stopId);
      console.log("busStop = ", busStop);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStop",
          busStop: busStop,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusStop error, stopId is required",
        }),
      };
    }
  }

  return response;
};
