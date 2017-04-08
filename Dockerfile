
FROM node:7.7

MAINTAINER Jerry Bendy <jerry@icewingcc.com>, qfdk <qfdk2010#gmail.com>

# copy all files to target 
COPY . /app

# install mongo & redis

RUN apt-get update
RUN apt-get install -y mongodb
RUN apt-get install -y redis-server
RUN mkdir -p /data/db/

# install npm packages
RUN npm i -g pm2
# install dependences
RUN cd /app/server && sed 's/admin/coucou/' conf/config.tpl >conf/config.js && npm install
RUN cd /app/front && cp server/mongo.tpl server/mongo.js && npm install && npm run build

# clean cache
RUN npm cache clean

WORKDIR /app

EXPOSE 3000
EXPOSE 8080


CMD mongod --logpath=/tmp/mongolog --fork&&redis-server /etc/redis/redis.conf&&pm2-docker start pm2.json
