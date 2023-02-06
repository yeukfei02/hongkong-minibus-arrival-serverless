const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");

const { allRouteRequest } = require("../../api/allRoute");
const { busRouteRequest } = require("../../api/busRoute");

const HongkongMinibusBusRoute = require("../../model/hongkongMinibusBusRoute");

module.exports.minibusBusRouteListScheduleJob = async () => {
  const hongkongMinibusBusRoute = await HongkongMinibusBusRoute.scan()
    .all()
    .exec();
  const hongkongMinibusBusRouteList = hongkongMinibusBusRoute.toJSON();
  console.log(
    "db hongkongMinibusBusRouteList.length = ",
    hongkongMinibusBusRouteList.length
  );

  if (hongkongMinibusBusRouteList) {
    for (let index = 0; index < hongkongMinibusBusRouteList.length; index++) {
      const item = hongkongMinibusBusRouteList[index];
      const { id } = item;
      await HongkongMinibusBusRoute.delete({ id });
    }
  }

  const regions = ["HKI", "KLN", "NT"];
  for (let a = 0; a < regions.length; a++) {
    const region = regions[a];

    const allRoute = await allRouteRequest(region);
    console.log("allRoute = ", allRoute);

    if (allRoute) {
      const routes = allRoute.routes;
      console.log("routes.length = ", routes.length);

      if (routes) {
        for (let b = 0; b < routes.length; b++) {
          const routeStr = routes[b];
          const busRoutes = await busRouteRequest(region, routeStr);
          console.log("busRoutes.length = ", busRoutes.length);

          for (let c = 0; c < busRoutes.length; c++) {
            const busRoute = busRoutes[c];

            const routeId = busRoute.route_id;
            const region = busRoute.region;
            const routeCode = busRoute.route_code;

            const hongkongMinibusBusRoute = new HongkongMinibusBusRoute({
              id: nanoid(),
              route_id: routeId.toString(),
              region: region,
              route_code: routeCode,
            });
            await hongkongMinibusBusRoute.save();
          }
        }
      }
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "minibusBusRouteListScheduleJob",
    }),
  };

  return response;
};
