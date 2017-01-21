FROM node:8-alpine
EXPOSE 4000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install --quiet

COPY . /usr/src/app

ENTRYPOINT ["sh", "./entrypoint.sh"]
CMD ["npm run serve"]
