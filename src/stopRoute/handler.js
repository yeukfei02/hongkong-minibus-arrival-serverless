const { stopRouteRequest } = require("../../api/stopRoute");

module.exports.stopRoute = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { stopId } = event.queryStringParameters;
    if (stopId) {
      const stopRoute = await stopRouteRequest(stopId);
      console.log("stopRoute = ", stopRoute);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getStopRoute",
          stopRoute: stopRoute,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getStopRoute error, stopId is required",
        }),
      };
    }
  }

  return response;
};
