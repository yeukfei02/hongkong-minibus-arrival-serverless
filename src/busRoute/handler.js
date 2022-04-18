const { busRouteRequest } = require("../../api/busRoute");

module.exports.busRoute = async (event) => {
  let response = {};

  if (event.queryStringParameters) {
    const { region, routeStr } = event.queryStringParameters;
    if (region && routeStr) {
      const busRoute = await busRouteRequest(region, routeStr);
      console.log("busRoute = ", busRoute);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "getBusRoute",
          busRoute: busRoute,
        }),
      };
    } else {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "getBusRoute error, region and routeStr are required",
        }),
      };
    }
  }

  return response;
};
