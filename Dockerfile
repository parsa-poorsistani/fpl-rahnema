# baseimage
FROM node:16
# command
COPY package.json .
RUN npm i --omit=dev
RUN npm i typescript
COPY . .

EXPOSE 8080
# run
CMD ["npm","run","start"]