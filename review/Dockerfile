FROM node:14-alpine

WORKDIR /usr/src/prm-support

RUN apk update && apk add curl
RUN apk update && apk add bash

ENV PATH /usr/src/prm-support/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install

ADD gulpfile.js .
ADD . .
ADD boot-in-order.sh .


CMD source boot-in-order.sh