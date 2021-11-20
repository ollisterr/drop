#!/bin/bash

cd /srv/www/drop
git pull

cd backend
rm .env
make env
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
