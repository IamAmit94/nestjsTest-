#!/bin/bash

#give permission for everything in the nestJs-app directory
sudo chmod -R 777 /home/ec2-user/nestJs-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/nestJs-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node
nvm install 12.22.4

#install node modules
npm install 

#install pm2
npm install -g pm2

#Nest app build
npm run build

#pm2 clear all
pm2 kill

#start our nestJs app in the background
pm2 start dist/src/main.js > app.out.log 2> app.err.log < /dev/null & 