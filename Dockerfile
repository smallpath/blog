
FROM node:7.7

MAINTAINER Jerry Bendy <jerry@icewingcc.com>

# copy all files to target 
COPY . /app


# install global packages
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm i -g pm2

# install dependences
RUN cd /app/server && cp conf/config.tpl conf/config.js && cnpm install
RUN cd /app/front && cp server/mongo.tpl server/mongo.js && cnpm install && npm run build

# clean cache
RUN npm cache clean



WORKDIR /app

EXPOSE 3000
EXPOSE 8080


CMD pm2-docker start pm2.json
