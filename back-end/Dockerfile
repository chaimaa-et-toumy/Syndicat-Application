FROM node:16

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . .

ENV NODE_ENV = "development"
ENV port = 5050
ENV MONGO_URL = "mongodb+srv://chaimaa:chaimaa@cluster0.0prajpx.mongodb.net/?retryWrites=true&w=majority"
ENV JWT_SECRET = "Azerty123"

EXPOSE 8080

CMD ["node", "server.js"]