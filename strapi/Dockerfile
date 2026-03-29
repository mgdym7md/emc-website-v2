FROM node:18-alpine

# Install dependencies for native modules
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /srv/app

ENV NODE_ENV=production
ENV STRAPI_DISABLE_UPDATE_NOTIFICATION=true
ENV STRAPI_HIDE_STARTUP_MESSAGE=true

# Copy package files and install deps (NODE_ENV must be unset for devDeps)
COPY package.json ./
RUN NODE_ENV=development npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Ensure public directory and favicon exist
RUN mkdir -p public/uploads && touch public/favicon.ico

# Build Strapi admin panel
RUN NODE_ENV=production npm run build

# Verify admin build exists
RUN ls -la node_modules/@strapi/admin/build/index.html

EXPOSE 1337

CMD ["npm", "run", "start"]
