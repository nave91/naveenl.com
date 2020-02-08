FROM node:10-alpine

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install -g --unsafe-perm

RUN npm run build

ENTRYPOINT ["npm", "run"]

CMD ["start"]