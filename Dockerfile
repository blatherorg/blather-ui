#########################
### build environment ###
#########################

# base image
FROM node:8.14.0-alpine as builder

# set working directory
RUN mkdir -p /blather_ui/src/app
WORKDIR /blather_ui/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /blather_ui/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /blather_ui/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.1.2 --unsafe

# add app
COPY src/ /blather_ui/src/app/src
COPY angular.json nginx.conf angular.json tsconfig.json tslint.json /blather_ui/src/app/
# COPY nginx.conf /blather_ui/src/app
# COPY angular.json /blather_ui/src/app
# COPY tsconfig.json /blather_ui/src/app
# COPY tslint.json /blather_ui/src/app

# generate build
RUN npm run build

##################
### production ###
##################

# base image
FROM nginx:1.15.7-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY --from=builder /blather_ui/src/app/dist/twitter /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
