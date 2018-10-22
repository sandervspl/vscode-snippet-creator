# VSCode Snippet Creator

## deploy
`$ npm run build`
`$ tar -czf build.tar.gz ./dist ./package.json ./package-lock.json ./pm2-server.json`
`$ scp -r ./build.tar.gz sandervspl@188.166.47.199:~`
`$ rm ./build.tar.gz`
`$ ssh root@188.166.47.199`
`$ tar -zxvf ./build.tar.gz -C .`
`$ npm install --production`
`$ pm2 start ./dist/server.js`
