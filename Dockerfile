FROM oven/bun:1.1.22-alpine

WORKDIR /app

# Copy source
COPY ./ ./

# Update system
RUN apk update

# Install Nginx
RUN apk add nginx
RUN mkdir -p /run/nginx
RUN mkdir -p /app/log
COPY nginx.conf /etc/nginx/nginx.conf

# Install packages
RUN bun install

EXPOSE 3000

ENTRYPOINT [ "sh", "entrypoint.sh" ]