FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ADD docker.env .env

EXPOSE 8080

CMD ["node","server.js"]