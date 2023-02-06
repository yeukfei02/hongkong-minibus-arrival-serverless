const HongkongMinibusBusRoute = require("../../model/hongkongMinibusBusRoute");

module.exports.getBusRouteByRouteId = async (event) => {
  console.log("### getBusRouteByRouteId ###");
  console.log("event.pathParameters = ", event.pathParameters);

  let response = {};

  if (event.pathParameters) {
    const routeId = event.pathParameters.routeId;
    if (routeId) {
      const hongkongMinibusBusRoute = await HongkongMinibusBusRoute.query({
        route_id: { eq: routeId },
      })
        .using("routeIdIndex")
        .all()
        .exec();
      const hongkongMinibusBusRouteObj = hongkongMinibusBusRoute.toJSON();

      if (hongkongMinibusBusRouteObj) {
        const busRoute = hongkongMinibusBusRouteObj[0];

        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "getBusRouteByRouteId",
            busRoute: busRoute,
          }),
        };
      }
    }
  }

  console.log("response = ", response);

  return response;
};
