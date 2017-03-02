
FROM node:6.9

MAINTAINER Jerry Bendy <jerry@icewingcc.com>

# copy all files to target 
COPY . /app


# install global packages
RUN npm i -g yarn pm2

# install dependences
RUN cd /app/server && yarn
RUN cd /app/front && yarn && yarn run build
RUN cd /app/admin && yarn && yarn run build

# clean cache
RUN npm cache clean && yarn cache clean



WORKDIR /app

EXPOSE 3000
EXPOSE 8080


CMD pm2-docker start pm2.json
