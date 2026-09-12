# ---- STATIC ASSETS ----

FROM node:20-alpine AS build
WORKDIR /app

# Install deps first so this layer is cached unless package*.json changes
COPY package.json package-lock.json ./
RUN npm ci

# Vite bakes VITE_* vars into the bundle at build time, not at container
# start time — so they have to arrive as build args, not runtime env vars.
ARG VITE_API_URL
ARG VITE_DEV_MODE=false
ARG VITE_DEV_LOG_TO_CONSOLE=false
ARG VITE_DEV_CLIENT_NAME=web
ARG VITE_IPIFY_KEY
ARG VITE_PAGINATION_PAGE_DEFAULT=1
ARG VITE_PAGINATION_PER_PAGE_DEFAULT=10
ARG VITE_LOG_FETCH_RESULT_TO_CONSOLE=false

ENV VITE_API_URL=$VITE_API_URL \
    VITE_DEV_MODE=$VITE_DEV_MODE \
    VITE_DEV_LOG_TO_CONSOLE=$VITE_DEV_LOG_TO_CONSOLE \
    VITE_DEV_CLIENT_NAME=$VITE_DEV_CLIENT_NAME \
    VITE_IPIFY_KEY=$VITE_IPIFY_KEY \
    VITE_PAGINATION_PAGE_DEFAULT=$VITE_PAGINATION_PAGE_DEFAULT \
    VITE_PAGINATION_PER_PAGE_DEFAULT=$VITE_PAGINATION_PER_PAGE_DEFAULT \
    VITE_LOG_FETCH_RESULT_TO_CONSOLE=$VITE_LOG_FETCH_RESULT_TO_CONSOLE

COPY . .
RUN npm run build

# ---- SERVE ----

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
