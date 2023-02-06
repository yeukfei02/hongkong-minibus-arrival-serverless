const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-1",
});

const hongkongMinibusBusRouteSchema = new dynamoose.Schema(
  {
    id: String,
    route_id: {
      type: String,
      index: {
        name: "routeIdIndex",
        global: true,
      },
    },
    region: String,
    route_code: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const hongkongMinibusBusRouteModel = dynamoose.model(
  "HongKongMinibusBusRoute",
  hongkongMinibusBusRouteSchema
);

module.exports = hongkongMinibusBusRouteModel;
