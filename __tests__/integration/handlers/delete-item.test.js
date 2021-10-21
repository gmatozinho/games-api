// Import all functions from put-item.js
const lambda = require("../../../src/handlers/delete-item");

jest.mock("../../../src/lib/config", () => {
  const mockedDelete = {
    del: jest
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
      ]),
  };

  const mockedReturning = {
    returning: () => mockedDelete,
  };
  const mKnex = {
    where: () => mockedReturning,
    catch: jest.fn().mockReturnThis(),
  };
  return { knex: () => mKnex };
});

// This includes all tests for putItemHandler()
describe("T5-Remover Jogo", function () {
  it("Deve deletar um jogo da tabela", async () => {
    const returnedItem = [
      {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
        name: "God of war",
        released: "2018",
        website: "www.godofwar.com",
        description: "deus grego",
        created_at: "2021-06-22T01:50:24.327Z",
        updated_at: null,
      },
    ];

    const event = {
      httpMethod: "DELETE",
      pathParameters: {
        id: "b46cdad7-ea56-4ce3-9517-c3ff150a3abb",
      },
    };

    const result = await lambda.deleteItemHandler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
  it("Não deve deletar jogo pois o metodo esta invalido", async () => {
    const event = {
      httpMethod: "GET",
      body: "",
    };

    try {
      const result = await lambda.deleteItemHandler(event);
    } catch (e) {
      expect(e.message).toBe(
        `delete only accept DELETE method, you tried: ${event.httpMethod}`
      );
    }
  });

  it("Não deve deletar um jogo pois nao foi enviado o parametro ID", async () => {
    const returnedItem = {
      message: "Cannot read property 'id' of undefined",
    };
    const event = {
      httpMethod: "DELETE",
    };

    const result = await lambda.deleteItemHandler(event);
    const expectedResult = {
      statusCode: 500,
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });
});
