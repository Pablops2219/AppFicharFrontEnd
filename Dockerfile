# Step 1:We build the angular app using production config
FROM node:latest AS build
# Set the working directory
WORKDIR /app
# Copy che package. json and package-lock. json files
COPY package*.json ./
# clean install of the dependencies
RUN npm ci
# Install Angular CLI globally
RUN npm install -g @angular/cli
# Copy all files
COPY . .
# Build the application
RUN npm run build -- --configuration=production
# Step 2: We use the nginx nage to serve the application
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/ficharAngular/browser /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Build: docker build -t demo-nodejs .
# Run: docker run -d -p 4200:80 demo-nodejs