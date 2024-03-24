#!/bin/bash

# Build
yarn webpack --mode production

# Push
yarn clasp push

# Get last deployment id
LAST_DEPLOYMENT_ID=$(yarn clasp deployments | tail -n 2 | head -n 1 | awk '{print $2}')

# Deploy
yarn clasp deploy --deploymentId $LAST_DEPLOYMENT_ID