
FROM node:7.7

MAINTAINER Jerry Bendy <jerry@icewingcc.com>, qfdk <qfdk2010#gmail.com>

# copy all files to target 
COPY . /app


# install global packages
RUN npm install -g yarn pm2 --registry=https://registry.npm.taobao.org

# install dependences
RUN cd /app/server && cp conf/config.tpl conf/config.js && yarn
RUN cd /app/front && cp server/mongo.tpl server/mongo.js && yarn && npm run build
RUN cd /app/admin && yarn && npm run build

# clean cache
RUN npm cache clean



WORKDIR /app

EXPOSE 3000
EXPOSE 8080


CMD pm2-docker start pm2.json

