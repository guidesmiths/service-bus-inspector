FROM node:10.16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY .npmrc package*.json ./

# In order to run node alpine avoiding Python error
RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm run manifest

CMD [ "npm", "start" ]

