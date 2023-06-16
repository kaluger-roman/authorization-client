FROM node:18.16.0-alpine
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci
COPY . /app
CMD npm start
EXPOSE 3021