const { update } = require("../repo/games");

/* const event = {
  httpMethod: "PATCH",
  body: '{"name":"God of war 2","released":"2022","website":"www.godofwar.com","description":"deus grego","created_at":"2021-06-22T01:50:24.327Z","updated_at":null ,"platforms":["1b846756-4fe1-4ad7-9bee-24b6c7d544b0"],"tags":["6d11b33e-aa58-4be4-82d5-66f390f198ea"],"stores":["2ade6cbb-c948-4a57-a843-c05b8b8cb31e"]}', 
  pathParameters: { 
    id: "65104acd-b704-48bd-8fb2-a8713f0e550f",
  },
}; */

exports.updateItemHandler = async (event) => {
  if (event.httpMethod !== "PATCH") {
    throw new Error(
      `update method only accepts PATCH method, you tried: ${event.httpMethod} method.`
    );
  }
  const body = JSON.parse(event.body);

  try {
    const game = await update(event.pathParameters.id, body);

    const response = {
      statusCode: 200,
      body: JSON.stringify(game),
    };

    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
    return response;
  }
};
