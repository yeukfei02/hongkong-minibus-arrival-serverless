const { busStopRequest } = require("../../api/busStop");

module.exports.busStop = async (event) => {
  console.log("### busStop ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { stopId } = event.queryStringParameters;
    if (stopId) {
      const busStop = await busStopRequest(stopId);

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

  console.log("response = ", response);

  return response;
};
