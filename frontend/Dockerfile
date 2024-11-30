# syntax=docker/dockerfile:1.4

# Stage 1: Compile and Build Angular codebase
FROM node:18 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to the working directory
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY --from=build /usr/local/app/dist/frontend/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80


