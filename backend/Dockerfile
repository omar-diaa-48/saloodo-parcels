FROM node:12.14.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production && npm cache clean --force 

COPY . . 

EXPOSE 3000 

CMD [ "npm", "run", "start:prod" ]