#!/bin/bash

#give permission for everything in the nestJs-app directory
sudo chmod -R 777 /home/ec2-user/nestJs-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/nestJs-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install
npm run build
node dist/src/main.js  
#start our nestJs app in the background
#node app.js > app.out.log 2> app.err.log < /dev/null & 