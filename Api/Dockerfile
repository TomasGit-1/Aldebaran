# FROM node:10
# EXPOSE 5000
# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
EXPOSE 5000


CMD [ "node", "src/index.js" ]
