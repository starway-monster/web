# stage 1

FROM node:10.23.0-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:1.12-alpine
COPY --from=my-app-build /app/dist/starway-monster /usr/share/nginx/html
EXPOSE 80
