const AWS = require('aws-sdk')
AWS.config.update({region:'us-east-1'});

const rdsdataservice = new AWS.RDSDataService();

const params = {
  resourceArn: "arn:aws:rds:us-east-1:682018951785:cluster:my-serverless-cluster",
  secretArn: "arn:aws:secretsmanager:us-east-1:682018951785:secret:MyRDSAuroraSecret-yTMeCLCVpueQ-sQdiJc",
  sql: `
  SELECT 1;`,
  database: "Games"
}

rdsdataservice.executeStatement(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
})