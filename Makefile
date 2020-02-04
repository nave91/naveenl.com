PROJECT_NAME := naveenl.com
TAG    := $$(git log -1 --pretty=%h)
IMG    := ${PROJECT_NAME}:${TAG}
LATEST := ${PROJECT_NAME}:latest

.PHONY: build
build:
	docker build -t ${IMG} .
	docker tag ${IMG} ${LATEST}

.PHONY: stop
stop:
	docker stop ${LATEST} || true

.PHONY: remove
remove:
	docker rm ${LATEST} || true

.PHONY: run
run:
	docker run -i --env-file=.env -p 0.0.0.0:3000:3000 --name ${PROJECT_NAME} ${PROJECT_NAME} ${ARGS}

.PHONY: server
server: build stop remove run

.PHONY: detached
detached:
	docker run -id --env-file=.env -p 3000:3000 --name ${PROJECT_NAME} ${PROJECT_NAME} ${ARGS}

.PHONY: gitpull
gitpull:
	git pull origin master

.PHONY: firstdeploy
firstdeploy:
	helm install tent --debug --set env.MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN} ./deploy

.PHONY: deploy
deploy:
	helm upgrade tent --debug --set env.MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN} ./deploy

push:
	docker push ${PROJECT_NAME}

login:
	docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}