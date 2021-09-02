FROM node:14-alpine as installer

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .npmrc .npmrc
RUN npm ci -q

FROM installer AS build

WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY tsconfig.prod.json tsconfig.prod.json
COPY src src
COPY config config
COPY scripts scripts
COPY public public
COPY @types @types

ARG OUTLINE
RUN npm run build

FROM registry.weintegrator.com/integrator/devops/nginx-front:1.0 AS production

WORKDIR /app
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8888

