FROM node:18-alpine

# Install dependencies for native modules
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /srv/app

ENV STRAPI_DISABLE_UPDATE_NOTIFICATION=true
ENV STRAPI_HIDE_STARTUP_MESSAGE=true

# Copy package files and install deps (need devDeps for build)
COPY package.json ./
RUN NODE_ENV=development npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Ensure public directory and favicon exist
RUN mkdir -p public/uploads && touch public/favicon.ico

# Build Strapi admin panel
RUN NODE_ENV=production npm run build

# Debug: find where admin build actually went
RUN find /srv/app -name "index.html" -path "*/build/*" 2>/dev/null && \
    ls -la /srv/app/build/ 2>/dev/null || true && \
    ls -la /srv/app/dist/ 2>/dev/null || true

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
