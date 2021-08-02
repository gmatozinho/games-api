#!/bin/bash

set -e

aws-vault exec study --no-session -- sam package --s3-bucket games-api-pipeline --template-file pipeline.yaml
aws-vault exec study --no-session -- sam deploy --s3-bucket games-api-pipeline --stack-name games-api-pipeline \
  --template-file pipeline.yaml --capabilities CAPABILITY_IAM 