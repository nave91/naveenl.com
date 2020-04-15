FROM node:8.15-alpine

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY naveenl.com/package.json naveenl.com/package-lock.json /usr/src/app/

COPY naveenl.com/ /usr/src/app/

RUN npm ci

RUN npm run build

CMD npm start