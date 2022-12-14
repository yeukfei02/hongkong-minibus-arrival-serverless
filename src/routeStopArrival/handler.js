const { routeStopArrivalRequest } = require("../../api/routeStopArrival");

module.exports.routeStopArrival = async (event) => {
  console.log("### routeStopArrival ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { routeId, stopId } = event.queryStringParameters;
    if (routeId && stopId) {
      const routeStopArrival = await routeStopArrivalRequest(routeId, stopId);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getRouteStopArrival",
          routeStopArrival: routeStopArrival,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getRouteStopArrival error, routeId and stopId are required",
        }),
      };
    }
  }

  console.log("response = ", response);

  return response;
};
