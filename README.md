# VSCode Snippet Creator

## deploy
Copy paste the following in terminal

```
npm run build
tar -czf build.tar.gz ./dist ./package.json ./package-lock.json ./pm2-server.json
scp -r ./build.tar.gz root@188.166.47.199:~
rm ./build.tar.gz
ssh root@188.166.47.199
tar -zxvf ./build.tar.gz -C .
rm -rf ./build.tar.gz
npm install --production
pm2 delete 0
pm2 start -f ./dist/server.js
```