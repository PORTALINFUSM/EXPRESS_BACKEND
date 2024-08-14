#!/bin/sh

# NGINX config
nginx -s reload

# Run NGINX
nginx

# Run Express
DB_URI=$_DB_URI SECRET_JWT_KEY=$_SECRET_JWT_KEY bun run src/server.ts