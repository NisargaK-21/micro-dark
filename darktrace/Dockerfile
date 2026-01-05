FROM node:20-alpine

WORKDIR /app

# Install deps
COPY darktrace/package.json /app/package.json
RUN npm install --legacy-peer-deps

# Copy app
COPY darktrace/ /app

# Build and start
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
