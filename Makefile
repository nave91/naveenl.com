PROJECT_NAME := lnaveenk/naveenl.com
CONTAINER_NAME := naveenl.com
TAG    := $$(git log -1 --pretty=%h)
DEV    := naveenl.com-dev
IMG    := ${PROJECT_NAME}:${TAG}
LATEST := ${PROJECT_NAME}:latest

.PHONY: build
build:
	docker build -t ${IMG} .
	docker tag ${IMG} ${LATEST}

.PHONY: builddev
builddev:
	docker build -t ${IMG} .
	docker tag ${IMG} ${DEV}

.PHONY: stop
stop:
	docker stop ${CONTAINER_NAME} || true

.PHONY: remove
remove:
	docker rm ${CONTAINER_NAME} || true

.PHONY: run
run:
	docker run -i --env-file=.env -p 0.0.0.0:3000:3000 --name ${CONTAINER_NAME} ${PROJECT_NAME} ${ARGS}

.PHONY: dockerserver
dockerserver: build stop remove run

.PHONY: server
server:
	telepresence --swap-deployment tent-dev-deploy --docker-run --rm -it -v $(pwd):/usr/src/app -v /usr/src/app/node_modules naveenl.com-dev dev

.PHONY: firstdeploy
firstdeploy:
	helm install tent --debug --set env.MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN} ./deploy

.PHONY: firstdev
firstdev:
	helm install tent-dev --debug --set env.MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN} ./deploy

.PHONY: deploy
deploy:
	helm upgrade tent --debug --recreate-pods --set env.MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN} ./deploy

push:
	docker push ${PROJECT_NAME}

login:
	docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}