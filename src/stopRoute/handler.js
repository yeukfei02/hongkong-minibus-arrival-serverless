const { stopRouteRequest } = require("../../api/stopRoute");

module.exports.stopRoute = async (event) => {
  console.log("### stopRoute ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { stopId } = event.queryStringParameters;
    if (stopId) {
      const stopRoute = await stopRouteRequest(stopId);

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

  console.log("response = ", response);

  return response;
};
