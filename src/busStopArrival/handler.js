const { busStopArrivalRequest } = require("../../api/busStopArrival");

module.exports.busStopArrival = async (event) => {
  console.log("### busStopArrival ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { stopId } = event.queryStringParameters;
    if (stopId) {
      const busStopArrival = await busStopArrivalRequest(stopId);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusStopArrival",
          busStopArrival: busStopArrival,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusStopArrival error, routeId and stopId are required",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
