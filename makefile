
all:
	docker-compose up --build --force-recreate --remove-orphans -d


down:
	docker-compose stop -t 1

clean:
	docker-compose stop -t 1
	docker-compose rm -f

e2e:
	npm run cy:run