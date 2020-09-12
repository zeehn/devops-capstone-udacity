FROM node:12

WORKDIR /usr/src/app

COPY ./app/ .

EXPOSE 3000

CMD [ "node", "index.js" ]