const { routeStopRequest } = require("../../api/routeStop");

module.exports.routeStop = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { routeId } = event.queryStringParameters;
    if (routeId) {
      const routeStop = await routeStopRequest(routeId);
      console.log("routeStop = ", routeStop);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getRouteStop",
          routeStop: routeStop,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getRouteStop error, routeId is required",
        }),
      };
    }
  }

  return response;
};
