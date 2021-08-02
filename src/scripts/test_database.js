const AWS = require('aws-sdk')
AWS.config.update({region:'us-east-1'});

const rdsdataservice = new AWS.RDSDataService({endpoint: 'http://127.0.0.1:8080'}) 

const params = {
  resourceArn: "arn:aws:rds:us-east-1:682018951785:cluster:dummy",
  secretArn: "arn:aws:secretsmanager:us-east-1:682018951785:secret:dummy",
  sql: `
  SELECT 1;`,
  database: "postgres"
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
})