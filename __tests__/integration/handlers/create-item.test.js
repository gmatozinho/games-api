// Import all functions from put-item.js
const lambda = require("../../../src/handlers/create-item");

jest.mock("../../../src/lib/config", () => {
  const mockInsert = {
    insert: jest
      .fn()
      .mockReturnThis()
      .mockReturnValue([
        {
          id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
          name: "God of war",
          released: "2018",
          website: "www.godofwar.com",
          description: "deus grego",
          created_at: "2021-06-22T01:50:24.327Z",
          updated_at: null,
        },
      ])
  };
  const mKnex = {
    returning: () => mockInsert,
    catch: jest.fn().mockReturnThis(),
  };
  return { knex: () => mKnex };
});

// This includes all tests for putItemHandler()
describe("Test create item handler", function () {
  it("should add game to the table", async () => {
    const returnedItem = {
      id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
      name: "God of war",
      released: "2018",
      website: "www.godofwar.com",
      description: "deus grego",
      created_at: "2021-06-22T01:50:24.327Z",
      updated_at: null,
    };

    const event = {
      httpMethod: "POST",
      body: '{"name":"God of war","released":"2018","website":"www.godofwar.com","description":"deus grego","created_at":"2021-06-22T01:50:24.327Z","updated_at":null,"platforms":["1b846756-4fe1-4ad7-9bee-24b6c7d544b0"],"tags":["6d11b33e-aa58-4be4-82d5-66f390f198ea","c782119a-3879-417b-b6c0-c35052db4d17"],"stores":["2ade6cbb-c948-4a57-a843-c05b8b8cb31e"]}',
    };

    const result = await lambda.createItemHandler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
  it("should't add because its a invalid method", async () => {
    const event = {
      httpMethod: "GET",
      body: "",
    };

    try {
      const result = await lambda.createItemHandler(event);
    } catch (e) {
      expect(e.message).toBe(
        `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
      );
    }
  });

  it("should't add because its a invalid body", async () => {
    const event = {
      httpMethod: "POST",
      body: "",
    };

    const result = await lambda.createItemHandler(event);
    const expectedResult = {
      statusCode: 500,
      body: '{"message":"Unexpected end of JSON input"}',
    };

    expect(result).toEqual(expectedResult);
  });
});
