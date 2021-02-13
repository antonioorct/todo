FROM node:10-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_BASE_API_URL="http://localhost:3000/api"

RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]