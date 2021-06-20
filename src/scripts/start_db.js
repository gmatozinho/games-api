const AWS = require('aws-sdk')
const fs = require('fs');
const data_sql = fs.readFileSync(`${__dirname}/create_tables.sql`).toString().replace(/\r/g, '')

const rdsdataservice = new AWS.RDSDataService();

const params = {
  resourceArn: "arn:aws:rds:us-east-1:682018951785:cluster:my-serverless-cluster",
  secretArn: "arn:aws:secretsmanager:us-east-1:682018951785:secret:MyRDSAuroraSecret-yTMeCLCVpueQ-sQdiJc",
  sql: data_sql,
  database: "Games"
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log("Tables created successfully!")
  }
})