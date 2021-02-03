FROM node:12.18-alpine

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN rm -rf /usr/src/node_modules/

RUN npm ci

RUN npm run build

CMD npm start