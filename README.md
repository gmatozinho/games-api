# to-beat

```bash
sam build
sam deploy --guided
```


## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name sam-app
```

## Start

aws-vault exec gmatozinho.study --no-session -- aws s3api create-bucket --bucket games-api --region us-east-1

aws-vault exec study -- node src/scripts/test_database.js
aws-vault exec study -- node src/scripts/init_db.js