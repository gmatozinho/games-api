const knexDataApiClient = require("knex-aurora-data-api-client");
const knex = require("knex")({
  client: knexDataApiClient.postgres,
  connection: {
    secretArn: process.env.SECRET_ARN,
    resourceArn: process.env.CLUSTER_ARN,
    database: process.env.DB_NAME,
    region: process.env.REGION,
  },
});

module.exports = {
  knex,
};
