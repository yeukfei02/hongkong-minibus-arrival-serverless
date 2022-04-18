const { routeStopArrivalRequest } = require("../../api/routeStopArrival");

module.exports.routeStopArrival = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { routeId, stopId } = event.queryStringParameters;
    if (routeId && stopId) {
      const routeStopArrival = await routeStopArrivalRequest(routeId, stopId);
      console.log("routeStopArrival = ", routeStopArrival);

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

  return response;
};
