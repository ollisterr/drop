#!/bin/bash

set -e

cd /srv/www/drop
git pull

cd backend && make env
docker volume create --name=db_volume
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
