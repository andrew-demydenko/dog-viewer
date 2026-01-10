# ---------- build stage ----------
FROM node:22.16.0-alpine AS builder

WORKDIR /app

ENV VITE_BASE_URL=/
ENV BASE_URL=/

COPY package.json yarn.lock* ./
RUN yarn install

COPY . .

# build site
RUN yarn build

# ---------- runtime stage ----------
FROM nginx:alpine
RUN apk add --no-cache bash

# copy static files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
