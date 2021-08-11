export REGION						:= ap-southeast-2
export ECR_REPO_URL					:= 533545012068.dkr.ecr.ap-southeast-2.amazonaws.com


all:
	docker-compose -f ./docker-compose-local.yml up --build --force-recreate --remove-orphans
run:
	docker-compose up --build --force-recreate --remove-orphans
stop:
	docker-compose stop -t 1


ecr:
	aws ecr get-login-password \
    --region ${REGION} \
	| docker login \
		--username AWS \
		--password-stdin ${ECR_REPO_URL}

	-aws ecr create-repository --repository-name wallet-api || true
	-aws ecr create-repository --repository-name wallet || true
	-aws ecr create-repository --repository-name wallet-nginx || true

build:
	cd wallet && docker build -f ./Dockerfile --no-cache -t wallet:latest  .
	cd nginx  && docker build -f ./Dockerfile --no-cache -t wallet-nginx:latest  .
	cd wallet-api && docker build -f ./Dockerfile --no-cache -t wallet-api:latest  .

	docker tag wallet:latest $(ECR_REPO_URL)/wallet:latest
	docker tag wallet-nginx:latest $(ECR_REPO_URL)/wallet-nginx:latest
	docker tag wallet-api:latest $(ECR_REPO_URL)/wallet-api:latest

	docker push $(ECR_REPO_URL)/wallet:latest
	docker push $(ECR_REPO_URL)/wallet-nginx:latest
	docker push $(ECR_REPO_URL)/wallet-api:latest

down:
	docker-compose -f ./docker-compose-local.yml stop -t 1

clean:
	docker-compose stop -t 1
	docker-compose rm -f