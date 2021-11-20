#!/bin/bash

cd /srv/www/drop
git pull

rm backend/.env
cd backend && make env
docker volume create --name=db_volume
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
