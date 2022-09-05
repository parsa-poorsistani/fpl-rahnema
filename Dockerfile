FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY . .
COPY package.json /app
RUN npm install 
CMD ["nodemon", "src/app.ts"]
EXPOSE 8080