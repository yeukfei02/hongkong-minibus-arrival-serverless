const { allRouteRequest } = require("../../api/allRoute");

module.exports.allRoute = async (event) => {
  console.log("### allRoute ###");
  console.log("event.queryStringParameters = ", event.queryStringParameters);

  let response = {};

  let allRoutes = [];

  if (event.queryStringParameters) {
    const { region } = event.queryStringParameters;
    if (region) {
      allRoutes = await allRouteRequest(region);
    }
  } else {
    allRoutes = await allRouteRequest();
  }

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "getAllRoute",
      allRoute: allRoutes,
    }),
  };

  console.log("response = ", response);

  return response;
};
