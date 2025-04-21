# 指定该阶段为build
FROM node:18-alpine AS build
WORKDIR /app

COPY . .

RUN npm install && npm run build:prod

# 新的阶段
FROM node:18-alpine

RUN npm install http-server -g

WORKDIR /app

COPY --from=build /app/dist /app/dist

EXPOSE 8888

CMD ["http-server", "dist", "-p", "5001"]