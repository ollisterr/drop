#!/bin/bash

cd /srv/www/drop
git reset --hard origin/main
git pull

cd backend
rm .env
make env
docker volume create --name=db_volume
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
