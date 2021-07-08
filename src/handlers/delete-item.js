const { remove } = require("../repo/games");

/* const event = {
  httpMethod: "DELETE",
  pathParameters: {
    id: "496ae773-2ace-4c5b-85ab-084c78dcd878",
  },
}; */
exports.deleteItemHandler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `delete only accept DELETE method, you tried: ${event.httpMethod}`
    );
  }

  try {
    const game = await remove(event.pathParameters.id);

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
