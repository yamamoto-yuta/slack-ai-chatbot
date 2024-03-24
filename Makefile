.PHONY: install
install:
	docker compose run --rm app bash -c "yarn install"

.PHONY: push
push:
	docker compose run --rm app bash -c "yarn webpack --mode production && yarn clasp push"

.PHONY: first-deploy
first-deploy:
	docker compose run --rm app bash -c "yarn webpack --mode production && yarn clasp push && yarn clasp deploy"

.PHONY: deploy
deploy:
	docker compose run --rm app bash -c './redeploy.sh'