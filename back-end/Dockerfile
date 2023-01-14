FROM node:16

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . ./

EXPOSE 5050

CMD ["node", "server.js"]