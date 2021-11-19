all: install run

install: venv env
	. venv/bin/activate && pip install -r requirements.txt
	python -m pip install pip-tools

venv:
	test -d venv || python3 -m venv venv

env:
	cp .env.example .env

compile-deps:
	pip-compile requirements.in
	pip-compile requirements-dev.in

codegen:
	fastapi-codegen --input ../data/api-schema.yaml --output app

lint:
	black .

clean:
	rm -rf venv
	find -iname "*.pyc" -delete

run:
	docker-compose up -d
	python3 main.py

stop:
	docker-compose down

sql:
	piccolo sql_shell run

create-migrations:
	piccolo migrations new drop_api --auto

run-migrations:
	piccolo migrations forward all

generate-openapi:
	python3 scripts/export_openapi_spec.py

.PHONY: all compile-deps install init codegen run run-migrations sql venv
