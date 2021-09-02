FROM node:14-alpine as build

WORKDIR /app

COPY . .

RUN npm ci -q
RUN npm run build


FROM nginx:latest as production

WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
