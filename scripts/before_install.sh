#!/bin/bash

#download node and npm
curl -o- https://raw.githubuser2content.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 12 --lts

#create our working directory if it doesnt exist
DIR="/home/ec2-user/nestJs-app"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi