FROM mhart/alpine-node:16 as base
RUN apk add --no-cache git
RUN apk add --no-cache python2

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]