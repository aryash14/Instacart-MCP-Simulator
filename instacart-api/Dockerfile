FROM node:23.10-alpine as builder
COPY . /app
WORKDIR /app

RUN npm install --save-dev
RUN npm run build
ENV NODE_ENV=production

RUN npm ci --ignore-scripts --omit-dev
ENTRYPOINT ["node","/app/dist/index.js"]
