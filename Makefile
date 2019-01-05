.PHONY: build
build:
	docker build -t naveenl .

.PHONY: stop
stop:
	docker stop naveenl || true

.PHONY: remove
remove:
	docker rm naveenl || true

.PHONY: cp
cp:
	docker cp naveenl naveenl:naveenl

.PHONY: run
run:
	docker run -i -p 3000:3000 --name naveenl naveenl ${ARGS}

.PHONY: server
server: build stop remove run

.PHONY: detached
detached:
	docker run -id -p 3000:3000 --name naveenl naveenl ${ARGS}

.PHONY: deploy
deploy: build stop remove detached