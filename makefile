export REGION						:= ap-southeast-2
export ECR_REPO_URL					:= 533545012068.dkr.ecr.ap-southeast-2.amazonaws.com
export BRANCH_NAME					:=$(shell git branch --show-current)
export API_HOST						:= https://wallet.trackback.dev
export NODE_END_POINT				:= wss://blockchain.trackback.dev/
export IP_WEB						:=$(shell cd terraform/ap-southeast-2 && terraform output -json | jq .info.value.aws_instance_wallet_web )
all:
	docker-compose -f ./docker-compose-local.yml up --build --force-recreate --remove-orphans

run: ecr-login
	docker-compose up --build --force-recreate --remove-orphans -d

redeploy: ecr-login clean run

stop:
	docker-compose stop -t 1

ecr-login:
	aws ecr get-login-password \
    --region ${REGION} \
	| docker login \
		--username AWS \
		--password-stdin ${ECR_REPO_URL}

ecr: ecr-login
	-aws ecr create-repository --repository-name wallet-api || true
	-aws ecr create-repository --repository-name wallet || true
	-aws ecr create-repository --repository-name wallet-nginx || true

build-api:
	cd wallet-api && docker build -f ./Dockerfile --no-cache -t wallet-api:latest  .
	docker tag wallet-api:latest $(ECR_REPO_URL)/wallet-api:latest
	docker push $(ECR_REPO_URL)/wallet-api:latest

build-wallet:
	cd wallet && docker build -f ./Dockerfile --no-cache -t wallet:latest  .
	docker tag wallet:latest $(ECR_REPO_URL)/wallet:latest
	docker push $(ECR_REPO_URL)/wallet:latest

build-nginx:
	cd nginx  && docker build -f ./Dockerfile --no-cache -t wallet-nginx:latest  .	
	docker tag wallet-nginx:latest $(ECR_REPO_URL)/wallet-nginx:latest
	docker push $(ECR_REPO_URL)/wallet-nginx:latest

build: build-api build-wallet build-nginx

down:
	docker-compose -f ./docker-compose-local.yml stop -t 1

clean:
	docker-compose stop -t 1
	docker-compose rm -f
	docker rmi -f $(shell docker images -q)

destroy:
	cd terraform/ap-southeast-2 && terraform destroy -var="branch_name=$(BRANCH_NAME)" --auto-approve 

deploy: destroy
	cd terraform/ap-southeast-2 && terraform apply -var="branch_name=$(BRANCH_NAME)" --auto-approve

remotedeploy:
	ssh -i ~/.ssh/ec2_key.pem ubuntu@$(IP_WEB) -t 'cd wallet-demo && make run'