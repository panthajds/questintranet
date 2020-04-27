FROM ubuntu:latest

ENV RUN_MODE dev
ENV NODE_ENV development

RUN date
RUN apt-get update
RUN apt-get install curl -y
RUN apt-get update && apt-get install -my wget gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install nodejs -y
RUN apt-get install git -y

WORKDIR /usr/src/app/
ADD ./package.json /usr/src/app/package.json
RUN npm install webpack -g
RUN npm config set registry http://registry.npmjs.org/ && npm install
CMD npm run $RUN_MODE
