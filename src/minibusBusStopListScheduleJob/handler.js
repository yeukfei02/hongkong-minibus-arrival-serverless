const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const { nanoid } = require("nanoid");
const _ = require("lodash");

const { allRouteRequest } = require("../../api/allRoute");
const { busRouteRequest } = require("../../api/busRoute");
const { routeStopRequest } = require("../../api/routeStop");
const { busStopRequest } = require("../../api/busStop");

const HongkongMinibusBusStop = require("../../model/hongkongMinibusBusStop");

module.exports.minibusBusStopListScheduleJob = async () => {
  let response = {};

  const hongkongMinibusBusStop = await HongkongMinibusBusStop.scan()
    .all()
    .exec();
  const hongkongMinibusBusStopList = hongkongMinibusBusStop.toJSON();
  console.log(
    "db hongkongMinibusBusStopList.length = ",
    hongkongMinibusBusStopList.length
  );

  if (hongkongMinibusBusStopList) {
    for (let index = 0; index < hongkongMinibusBusStopList.length; index++) {
      const item = hongkongMinibusBusStopList[index];
      const { id } = item;
      await HongkongMinibusBusStop.delete({ id });
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
            if (routeId) {
              const routeStops = await routeStopRequest(routeId);
              console.log("routeStops.length = ", routeStops.length);

              if (routeStops) {
                for (let d = 0; d < routeStops.length; d++) {
                  const routeStop = routeStops[d];
                  if (routeStop) {
                    const stopId = routeStop.stop_id;
                    const name_en = routeStop.name_en;
                    const name_tc = routeStop.name_tc;
                    const name_sc = routeStop.name_sc;

                    const busStop = await busStopRequest(stopId);

                    if (busStop) {
                      const lat = busStop.coordinates.wgs84.latitude;
                      const long = busStop.coordinates.wgs84.longitude;

                      const hongkongMinibusBusStopObj =
                        await HongkongMinibusBusStop.query({
                          name_en: { eq: name_en },
                        })
                          .using("nameEnIndex")
                          .all()
                          .exec();
                      const hongkongMinibusBusStopObjFromDb =
                        hongkongMinibusBusStopObj.toJSON();

                      if (_.isEmpty(hongkongMinibusBusStopObjFromDb)) {
                        const hongkongMinibusBusStop =
                          new HongkongMinibusBusStop({
                            id: nanoid(),
                            stop: stopId.toString(),
                            name_en: name_en,
                            name_tc: name_tc,
                            name_sc: name_sc,
                            lat: lat,
                            long: long,
                          });
                        await hongkongMinibusBusStop.save();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return response;
};
