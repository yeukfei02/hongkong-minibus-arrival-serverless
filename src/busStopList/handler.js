const HongkongMinibusBusStop = require("../../model/hongkongMinibusBusStop");

module.exports.busStopList = async () => {
  console.log("### busStopList ###");

  let response = {};

  const hongkongMinibusBusStop = await HongkongMinibusBusStop.scan()
    .all()
    .exec();
  const hongkongMinibusBusStopList = hongkongMinibusBusStop.toJSON();

  if (hongkongMinibusBusStopList) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "getBusStopList",
        busStopList: hongkongMinibusBusStopList,
      }),
    };
  }

  console.log("response = ", response);

  return response;
};
