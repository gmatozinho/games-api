const { knex } = require("../lib/config");
var knexnest = require("knexnest");

const buildGame = ({ name, released, website, description, created_at }) => {
  return { name, released, website, description, created_at };
};

const create = async (game) => {
  try {
    const gameInserted = (
      await knex("game").returning("*").insert(buildGame(game))
    )[0];
    const gameTagsInserted = await insertTagsRelation(
      gameInserted.id,
      game.tag
    );
    const gameStoresInserted = await insertStoresRelation(
      gameInserted.id,
      game.stores
    );
    const gamePlatformsInserted = await insertPlatformsRelation(
      gameInserted.id,
      game.platforms
    );
    return gameInserted;
  } catch (error) {
    throw error;
  }
};

const list = async () => {
  try {
    const sql = knex("game")
      .select(
        "game.id    AS _id",
        "game.name AS _name",
        "game.released AS _released",
        "game.description AS _description",
        "game.created_at AS _createdAt",
        "game.website AS _website",
        "game.updated_at AS _updatedAt",
        "p.id    AS _platforms__id",
        "p.name    AS _platforms__name",
        "p.year_start    AS _platforms__yearStart",
        "p.year_end    AS _platforms__yearEnd",
        "s.id    AS _stores__id",
        "s.name    AS _stores__name",
        "s.website    AS _stores__website",
        "t.id    AS _tags__id",
        "t.name    AS _tags__name"
      )
      .innerJoin("game_platform AS gp", "gp.game_id", "game.id")
      .innerJoin("game_store AS gs", "gs.game_id", "game.id")
      .innerJoin("game_tag AS gt", "gt.game_id", "game.id")
      .innerJoin("platform AS p", "p.id", "gp.platform_id")
      .innerJoin("store AS s", "s.id", "gs.store_id")
      .innerJoin("tag AS t", "t.id", "gt.tag_id");
    const select = await knexnest(sql);
    return select;
  } catch (error) {
    throw error;
  }
};

const getById = (id) => {
  const sql = knex("game")
    .select(
      "game.id    AS _id",
      "game.name AS _name",
      "game.released AS _released",
      "game.description AS _description",
      "game.created_at AS _createdAt",
      "game.website AS _website",
      "game.updated_at AS _updatedAt",
      "p.id    AS _platforms__id",
      "p.name    AS _platforms__name",
      "p.year_start    AS _platforms__yearStart",
      "p.year_end    AS _platforms__yearEnd",
      "s.id    AS _stores__id",
      "s.name    AS _stores__name",
      "s.website    AS _stores__website",
      "t.id    AS _tags__id",
      "t.name    AS _tags__name"
    )
    .innerJoin("game_platform AS gp", "gp.game_id", "game.id")
    .innerJoin("game_store AS gs", "gs.game_id", "game.id")
    .innerJoin("game_tag AS gt", "gt.game_id", "game.id")
    .innerJoin("platform AS p", "p.id", "gp.platform_id")
    .innerJoin("store AS s", "s.id", "gs.store_id")
    .innerJoin("tag AS t", "t.id", "gt.tag_id")
    .where("game.id", id);
  const select = await knexnest(sql);
  return select;
};

const update = () => {};

const remove = () => {};

const insertTagsRelation = (gameId, tags) => {
  const gameTagInserted = (
    await knex("game_tag")
      .returning("*")
      .insert(insertGamesRelations(gameId, tags, "TAG"))
  )[0];

  return gameTagInserted;
};

const insertStoresRelation = (gameId, stores) => {
  const gameStoreInserted = (
    await knex("game_store")
      .returning("*")
      .insert(insertGamesRelations(gameId, stores, "STORE"))
  )[0];

  return gameStoreInserted;
};

const insertPlatformsRelation = (gameId, platforms) => {
  const gamePlatformInserted = (
    await knex("game_platform")
      .returning("*")
      .insert(insertGamesRelations(gameId, platforms, "PLATFORM"))
  )[0];

  return gamePlatformInserted;
};

const insertGamesRelations = (gameId, array, relation) => {
  const fieldsToInsert = array.map((id) => {
    return {
      game_id: gameId,
      [returnRelationFieldName(relation)]: id,
    };
  });

  return fieldsToInsert;
};

const returnRelationFieldName = (relation) => {
  switch (relation) {
    case "PLATFORM":
      return "platform_id";
    case "STORE":
      return "store_id";
    case "TAG":
      return "tag_id";
    default:
      break;
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
