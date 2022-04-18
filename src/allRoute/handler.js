const { allRouteRequest } = require("../../api/allRoute");

module.exports.allRoute = async (event) => {
  let response = {};

  let allRoute = [];

  if (event.queryStringParameters) {
    const { region } = event.queryStringParameters;
    if (region) {
      allRoute = await allRouteRequest(region);
    }
  } else {
    allRoute = await allRouteRequest();
  }

  console.log("allRoute = ", allRoute);

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "getAllRoute",
      allRoute: allRoute,
    }),
  };

  return response;
};
