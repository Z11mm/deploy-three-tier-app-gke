# syntax=docker/dockerfile:1

# FROM nginx:1.21.3-alpine

# COPY /build /usr/share/nginx/html

FROM node:14.18-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]