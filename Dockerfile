FROM node:16-alpine

WORKDIR /usr/src/rate-limit
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
