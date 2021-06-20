const { knex } = require("../lib/config");
const NestHydrationJS = require("nesthydrationjs")();

const definition = [{
  id: {column: 'id', type: 'NUMBER'},
  title: 'title',
  required: {column: 'required', type: 'BOOLEAN'},
  teacher: {
      id: {column: 'teacher_id', type: 'NUMBER'},
      name: 'teacher_name'
  },
  lesson: [{
      id: {column: 'lesson_id', type: 'NUMBER'},
      title: 'lesson_title'
  }]
}];

const create = async (game) => {
  const insert = await knex("game").returning("*").insert(game);
  return insert;
};

const list = () => {
  const select = await knex.select().table("game").then(NestHydrationJS.nest);
  return select;
};

const get_by_id = () => {};

const update = () => {};

const remove = () => {};

module.exports = {
  list,
  get_by_id,
  create,
  update,
  remove,
};
