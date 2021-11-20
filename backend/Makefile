VENV = venv
PYTHON = $(VENV)/bin/python3
COMPOSE = docker-compose -f docker-compose.yml -f docker-compose.dev.yml
PIP_COMPILE = pip-compile
PICCOLO = piccolo
BLACK = black
ISORT = isort

all: install run

venv:
	test -d $(VENV) || python3 -m $(VENV) $(VENV)

env:
	rm .env || true
	cp .env.example .env

install: venv env
	. venv/bin/activate && pip install -r requirements.txt
	python3 -m pip install pip-tools

run: run-db run-migrations
	$(PYTHON) main.py

run-db:
	$(COMPOSE) up -d

stop-db:
	$(COMPOSE) down db

sql:
	psql postgres://drop_db:test@0.0.0.0:6432/drop_db

create-migrations:
	$(PICCOLO) migrations new drop_api --auto

run-migrations:
	$(PICCOLO) migrations forward all

create-admin-user:
	piccolo user create \
	 --username admin \
	 --email admin@drop.energy \
	 --password admin \
	 --is_admin true \
	 --is_superuser true \
	 --is_active true

exec-docker:
	cd .. && $(COMPOSE) exec api /bin/bash

generate-openapi:
	$(PYTHON) scripts/export_openapi_spec.py

compile-deps:
	$(PIP_COMPILE) requirements.in
	$(PIP_COMPILE) requirements-dev.in

lint:
	$(BLACK) .
	$(ISORT) .

clean: stop-db
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
	rm -rf $(VENV)

.PHONY: all compile-deps clean generate-openapi install init codegen run run-migrations sql venv
