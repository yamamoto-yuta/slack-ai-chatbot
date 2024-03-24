.PHONY: install
install:
	docker compose run --rm app bash -c "yarn install"

.PHONY: push
push:
	docker compose run --rm app bash -c "yarn webpack --mode production && yarn clasp push"
