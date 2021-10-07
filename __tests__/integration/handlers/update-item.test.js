// Import all functions from put-item.js
const lambda = require("../../../src/handlers/update-item");

jest.mock("../../../src/lib/config", () => {
  const mockedReturning = {
    returning: jest
      .fn()
      .mockReturnThis()
      .mockReturnValue([
        {
          id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
          name: "Fifa",
          released: "2018",
          website: "www.godofwar.com",
          description: "deus grego",
          created_at: "2021-06-22T01:50:24.327Z",
          updated_at: "2021-08-06T03:09:19.322Z",
        },
      ]),
  };

  const mockedWhere = {
    where: () => mockedReturning,
  };
  const mKnex = {
    update: () => mockedWhere,
    catch: jest.fn().mockReturnThis(),
  };
  return { knex: () => mKnex };
});

// This includes all tests for putItemHandler()
describe("Test update item handler", function () {
  it("should update game in the table", async () => {
    const returnedItem = [
      {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
        name: "Fifa",
        released: "2018",
        website: "www.godofwar.com",
        description: "deus grego",
        created_at: "2021-06-22T01:50:24.327Z",
        updated_at: "2021-08-06T03:09:19.322Z",
      },
    ];

    const event = {
      httpMethod: "PATCH",
      body: '{"name":"God of war 2"}',
      pathParameters: {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
      },
    };

    const result = await lambda.updateItemHandler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
  it("should't update because its a invalid method", async () => {
    const event = {
      httpMethod: "GET",
      body: "",
    };

    try {
      const result = await lambda.updateItemHandler(event);
    } catch (e) {
      expect(e.message).toBe(
        `update method only accepts PATCH method, you tried: ${event.httpMethod} method.`
      );
    }
  });

  it("should't add because dont have parameter with id", async () => {
    const returnedItem = {
      message: "Cannot read property 'id' of undefined",
    };
    const event = {
      httpMethod: "PATCH",
      body: '{"name":"God of war 2"}',
    };

    const result = await lambda.updateItemHandler(event);
    const expectedResult = {
      statusCode: 500,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
});
