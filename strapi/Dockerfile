FROM node:18-alpine

# Install dependencies for native modules
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /srv/app

# Prevent interactive prompts
ENV STRAPI_DISABLE_UPDATE_NOTIFICATION=true
ENV STRAPI_HIDE_STARTUP_MESSAGE=true

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev + prod) for build
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build Strapi admin panel
RUN npm run build

EXPOSE 1337

# Set production mode for runtime
ENV NODE_ENV=production

# Start Strapi
CMD ["npm", "run", "start"]
