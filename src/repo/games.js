const { knex } = require("../lib/config");


const create = async (game) => {
  try {
    const game_inserted = (await knex("game").returning("*").insert(game))[0];
    const game_tag_inserted = (await knex("game_tag").returning("*").insert(insert_games_relations(game_inserted.id, game.tags,"TAGS")))[0];
    const game_store_inserted = (await knex("game_store").returning("*").insert(insert_games_relations(game_inserted.id, game.stores,"STORE")))[0];
    const game_platform_inserted = (await knex("game_platform").returning("*").insert(insert_games_relations(game_inserted.id, game.platforms,"PLATFORM")))[0];
    return game_inserted;
  } catch (error) {
    throw error;
  }
};

const list = async () => {
  const select = await knex("game").select().options({ nestTables: true });
  return select;
};

const get_by_id = () => {};

const update = () => {};

const remove = () => {};


const insert_games_relations = (game_id, array, relation ) =>{
  const fields_to_insert = array.map((id)=>{
    return {
      game_id,
      [return_relation_field_name(relation)]: id
    }
  })

  return fields_to_insert
}


const return_relation_field_name = (relation) =>{
  switch (relation) {
    case "PLATFORM":
      return "platform_id";      
    case "STORE":
      return "store_id";      
    case "TAG":
      return "tag_id";
    default: 
      break    
  }
}

module.exports = {
  list,
  get_by_id,
  create,
  update,
  remove,
};
