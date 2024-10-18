FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production --output-path=dist/ticket-table

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

RUN ls -la /usr/share/nginx/html

COPY --from=build /app/dist/ticket-table/browser /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
