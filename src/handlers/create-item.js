const { create } = require("../repo/games");

/* const event = {
  httpMethod: "POST",
  body: '{"name":"God of war","released":"2018","website":"www.godofwar.com","description":"deus grego","created_at":"2021-06-22T01:50:24.327Z","updated_at":null,"platforms":["4cefcd09-558c-40ff-973f-ed81b40dc69d"],"tags":["546cccae-831f-48d7-9234-3313d7db445a"],"stores":["2a06b53b-0f1d-43e9-8b33-316720e32ff9"]}',
}; */

exports.createItemHandler = async (event) => {
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
