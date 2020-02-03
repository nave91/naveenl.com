project_name = naveenl
.PHONY: build
build:
	docker build -t ${project_name} .

.PHONY: stop
stop:
	docker stop ${project_name} || true

.PHONY: remove
remove:
	docker rm ${project_name} || true

.PHONY: cp
cp:
	docker cp ${project_name} ${project_name}:${project_name}

.PHONY: run
run:
	docker run -i --env-file=.env -p 3000:3000 --name ${project_name} ${project_name} ${ARGS}

.PHONY: server
server: build stop remove run

.PHONY: detached
detached:
	docker run -id --env-file=.env -p 3000:3000 --name ${project_name} ${project_name} ${ARGS}

.PHONY: gitpull
gitpull:
	git pull origin master

.PHONY: deploy
deploy:
	helm install tent --debug --set env.MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN ./deploy