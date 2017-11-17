FROM node:carbon-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run -s build

FROM node:carbon-alpine
COPY --from=0 /usr/src/app/node_modules ./node_modules
COPY --from=0 /usr/src/app/package.json .
COPY --from=0 /usr/src/app/dist ./dist
COPY --from=0 /usr/src/app/index.js .
EXPOSE 5000
CMD [ "npm", "start" ]