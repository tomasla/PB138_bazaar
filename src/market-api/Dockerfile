FROM node:13.10.1-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run lint
RUN npm run build

RUN mkdir -p /usr/src/app/build/uploads

EXPOSE 3000

CMD [ "npm", "start" ]