const { routeStopRequest } = require("../../api/routeStop");

module.exports.routeStop = async (event) => {
  console.log("### routeStop ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  if (event.queryStringParameters) {
    const { routeId } = event.queryStringParameters;
    if (routeId) {
      const routeStop = await routeStopRequest(routeId);

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

  console.log("response = ", response);

  return response;
};
