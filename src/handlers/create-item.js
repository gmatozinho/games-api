const { create } = require("../repo/games");
/* 
const event = {
  httpMethod: "POST",
  body: '{"name":"God of war","released":"2018","website":"www.godofwar.com","description":"deus grego","created_at":"2021-06-22T01:50:24.327Z","updated_at":null,"platforms":["1b846756-4fe1-4ad7-9bee-24b6c7d544b0"],"tags":["6d11b33e-aa58-4be4-82d5-66f390f198ea","c782119a-3879-417b-b6c0-c35052db4d17"],"stores":["2ade6cbb-c948-4a57-a843-c05b8b8cb31e"]}',
}; */

exports.createItemHandler = async (event) => {
  console.log(JSON.stringify(event))
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  const body = JSON.parse(event.body);

  try {
    const game = await create(body);

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
