VENV = venv
PYTHON = $(VENV)/bin/python3
COMPOSE = docker-compose
PIP_COMPILE = pip-compile
PICCOLO = piccolo
BLACK = black
ISORT = isort

all: install run

install: venv env
	. venv/bin/activate && pip install -r requirements.txt
	python3 -m pip install pip-tools

venv:
	test -d $(VENV) || python3 -m $(VENV) $(VENV)

env:
	cp .env.example .env

install: venv env
	. venv/bin/activate && pip install -r requirements.txt
	python3 -m pip install pip-tools

run: run-db run-migrations
	$(PYTHON) main.py

run-db:
	$(COMPOSE) up -d db

stop-db:
	$(COMPOSE) down db

sql:
	$(PICCOLO) sql_shell run

create-migrations:
	$(PICCOLO) migrations new drop_api --auto

run-migrations:
	$(PICCOLO) migrations forward all

create-admin-user:
	$(PICCOLO) user create \
		--username=admin \
		--password=admin \
		--email=admin@drop.drop \
		--is_admin=t \
		--is_superuser=t \
		--is_active=t

docker-exec:
	$(COMPOSE) exec drop_api /bin/bash

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
