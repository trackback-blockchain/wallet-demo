all:
	docker-compose -f ./docker-compose-local.yml up --build --force-recreate --remove-orphans

down:
	docker-compose -f ./docker-compose-local.yml stop -t 1

clean:
	docker-compose stop -t 1
	docker-compose rm -f