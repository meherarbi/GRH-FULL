# Étape de construction
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps
COPY ./ /app/
RUN npm run build || cat /tmp/ng-iAV4NN/angular-errors.log

# Étape de production
FROM nginx:alpine
COPY --from=build-stage /app/dist/angular /usr/share/nginx/html

# Exposez le port 80
EXPOSE 80
