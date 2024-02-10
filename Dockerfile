FROM node:12.16-buster-slim
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install 
RUN yarn build
EXPOSE 3000
CMD yarn start
