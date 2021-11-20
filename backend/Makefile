VENV = venv
PYTHON = $(VENV)/bin/python3
PIP_COMPILE = $(VENV)/bin/pip
PICCOLO = piccolo
BLACK = black

all: install run

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
	docker-compose up -d

stop-db:
	docker-compose down

sql:
	$(PICCOLO) sql_shell run

create-migrations:
	$(PICCOLO) migrations new drop_api --auto

run-migrations:
	$(PICCOLO) migrations forward all

generate-openapi:
	$(PYTHON) scripts/export_openapi_spec.py

compile-deps:
	$(PIP_COMPILE) requirements.in
	$(PIP_COMPILE) requirements-dev.in

lint:
	$(BLACK) .

clean: stop-db
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
	rm -rf $(VENV)

.PHONY: all compile-deps clean generate-openapi install init codegen run run-migrations sql venv
