// Import all functions from put-item.js
const lambda = require("../../../src/handlers/get-all-items");
const knexnest = require("knexnest");
jest.mock("knexnest");

jest.mock("../../../src/lib/config", () => {
  const mockedInnerJoin = {
    innerJoin: jest.fn().mockReturnThis(),
  };
  const mKnex = {
    select: () => mockedInnerJoin,
    catch: jest.fn().mockReturnThis(),
  };
  return { knex: () => mKnex };
});

// This includes all tests for putItemHandler()
describe("Test get all items handler", function () {
  it("should get all games from the table", async () => {
    const returnedItem = [
      {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
        name: "Fifa",
        released: "2018",
        description: "deus grego",
        createdAt: "2021-06-22T01:50:24.327Z",
        website: "www.godofwar.com",
        updatedAt: "2021-08-06T03:09:19.322Z",
        platforms: [
          {
            id: "1b846756-4fe1-4ad7-9bee-24b6c7d544b0",
            name: "PlayStation 5",
            yearStart: 2020,
            yearEnd: null,
          },
        ],
        stores: [
          {
            id: "2ade6cbb-c948-4a57-a843-c05b8b8cb31e",
            name: "PlayStation Store",
            website: "store.playstation.com",
          },
        ],
        tags: [
          {
            id: "6d11b33e-aa58-4be4-82d5-66f390f198ea",
            name: "Singleplayer",
          },
        ],
      },
    ];

    await knexnest.mockResolvedValueOnce([
      {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
        name: "Fifa",
        released: "2018",
        description: "deus grego",
        createdAt: "2021-06-22T01:50:24.327Z",
        website: "www.godofwar.com",
        updatedAt: "2021-08-06T03:09:19.322Z",
        platforms: [
          {
            id: "1b846756-4fe1-4ad7-9bee-24b6c7d544b0",
            name: "PlayStation 5",
            yearStart: 2020,
            yearEnd: null,
          },
        ],
        stores: [
          {
            id: "2ade6cbb-c948-4a57-a843-c05b8b8cb31e",
            name: "PlayStation Store",
            website: "store.playstation.com",
          },
        ],
        tags: [
          {
            id: "6d11b33e-aa58-4be4-82d5-66f390f198ea",
            name: "Singleplayer",
          },
        ],
      },
    ]);
    const event = {
      httpMethod: "GET",
    };

    const result = await lambda.getAllItemsHandler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
  it("should't get because its a invalid method", async () => {
    const event = {
      httpMethod: "DELETE",
    };

    try {
      const result = await lambda.getAllItemsHandler(event);
    } catch (e) {
      expect(e.message).toBe(
        `getAllItems only accept GET method, you tried: ${event.httpMethod}`
      );
    }
  });

  it("should't get because have knexnest error", async () => {
    const returnedItem = {
      message: "knexnest error",
    };
    await knexnest.mockResolvedValueOnce(
      Promise.reject(new Error("knexnest error"))
    );
    const event = {
      httpMethod: "GET",
    };

    const result = await lambda.getAllItemsHandler(event);
    const expectedResult = {
      statusCode: 500,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
});
