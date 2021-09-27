// Import all functions from put-item.js
const lambda = require("../../../src/handlers/create-item");
//const mockedKnex = require("");

jest.mock("../../../src/lib/config", () => {
  const a = {
    insert: jest
      .fn()
      .mockReturnThis()
      .mockReturnValue([
        {
          id: 1,
          name: "God of war",
          released: "2018",
          website: "www.godofwar.com",
          description: "deus grego",
          created_at: "2021-06-22T01:50:24.327Z",
          updated_at: null,
        },
      ]),
  };
  const mKnex = {
    returning: () => a,

    catch: jest.fn().mockReturnThis(),
  };
  return { knex: () => mKnex };
});

// This includes all tests for putItemHandler()
describe("Test create item handler", function () {
  it("should add id to the table", async () => {
    const returnedItem = {
      id: 1,
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
});
