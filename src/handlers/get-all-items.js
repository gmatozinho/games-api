const { list } = require("../repo/games");

const event = {
  httpMethod: "GET",
};

/* exports. */getAllItemsHandler = async (/* event */) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  try {
    const games = await list();

    const response = {
      statusCode: 200,
      body: JSON.stringify(games),
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

getAllItemsHandler()