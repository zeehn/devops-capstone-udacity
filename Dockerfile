FROM node:12

WORKDIR /usr/src/app

COPY ./app/ .


CMD [ "node", "index.js" ]