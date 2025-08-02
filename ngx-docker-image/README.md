# NginxDockerImage

Template to show how to dockernirize an Angular app and deploy using nginx server

Tutorial can be found here
https://www.telerik.com/blogs/deploying-angular-apps-nginx-docker?ref=dailydev

This project shows how to set up nginx server and configuration to be able to server angular apps, it will have a nginx configuration file that will be copied onto the docker image
The configuration added to the project is to be used by nginx, the configuration is as follow
```json
# new-app/nginx/default.conf
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;
  # Redirect all routes to index.html for Angular's client-side routing
  location / {
    try_files $uri $uri/ /index.html;
  }
  # Configure caching for static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000";
  }
```

The above will configure nginx to serve files from `/usr/share/nginx/html` where the Angular build will be added to, 
then there is the fallback to index.html which will then kick in Angular's routing
finally it will cache assets files like css and js for better load times


### Docker image
For the docker image, it will use 2 stages:
* Stage 1 will get node js to build the app
* Stage 2 will get nginx and deploy the code 
Then app will be accessible on `http://localhost:8080/`

```yaml
# new-app/Dockerfile
# Stage 1: Build the Angular application
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ngx-docker-image/browser /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

# Build command
### Build the code for production
```bash
    ng build
```

### Build docker image
```bash
    docker build -t angular-nginx-app .
```

### Run docker image
```bash
    docker run -d -p 8080:80 --name my-angular-app angular-nginx-app
```


## Dependencies
### Material
```bash
    ng add @angular/material
```
