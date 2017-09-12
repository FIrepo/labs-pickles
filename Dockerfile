FROM node:wheezy

MAINTAINER Alexandre Moraes <alcmoraes89@gmail.com>

RUN npm i -g forever --progress=false --loglevel=error

RUN npm i

RUN cd /var/www/ui && npm i

RUN mkdir -p /var/www

WORKDIR /var/www

VOLUME /var/www

COPY docker/run.sh /tmp/run.sh

RUN chmod +x /tmp/run.sh

EXPOSE 8081 8082 8083 3005

