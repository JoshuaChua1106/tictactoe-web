FROM node:20-alpine AS builder
WORKDIR /app

# Download dependencies
COPY package*.json ./
RUN npm install

# Copy files
COPY . .

# Build Typescript to JavaScript
RUN npm run build
RUN npm prune --production

# Set Environment variables
ENV PORT=3000
ENV FRONT_END_URL=http://localhost:80
EXPOSE 3000

CMD ["npm", "start"]
