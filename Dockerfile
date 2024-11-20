ARG NODE_VERSION=lts
ARG NGINX_VERSION=alpine

# Stage 1: Install dependencies
FROM node:lts-bullseye-slim as deps

WORKDIR /app

COPY ./package.json ./

RUN npm install 


# Stage 2: Build
FROM node:lts-bullseye-slim as build

# Set working directory
WORKDIR /app

# Copy source code
COPY --from=deps /app/node_modules ./node_modules
COPY ./PizzaApp/app ./app
COPY ./PizzaApp/assets ./assets
COPY ./PizzaApp/package.json ./PizzaApp/webpack.config.js ./PizzaApp/App.js ./PizzaApp/app.json ./PizzaApp/babel.config.js ./

# Build for production -- npx expo export:web
RUN yarn build  

FROM nginx:alpine as run

ARG VERSION=1.0.0
ARG BUILD_DATE

# Label image
LABEL version="${VERSION}"
LABEL BuildDate="${BUILD_DATE}"

# Copy build artifacts from previous stage
COPY --from=build /app/web-build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]