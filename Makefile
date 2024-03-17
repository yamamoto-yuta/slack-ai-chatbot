.PHONY: push
push:
	docker compose run --rm app bash -c "cd slack-ai-chatbot/ && clasp push"