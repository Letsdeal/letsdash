# LetsDash
Dashboard project based on Vue.js 2, Bootstrap 4 and a lot of other awesome JS libraries

## Prerequisites
* [Docker for Mac](https://docs.docker.com/docker-for-mac/)

## How to build
```bash
cp config.dist.js config.js
docker build -t letsdash .
docker run --name letsdash --rm -v $(pwd)/:/usr/src/app -p 4000:4000 -t letsdash
open http://localhost:4000
```

## Useful stuff
* https://vuejs.org/v2/guide/
* https://github.com/vuejs/awesome-vue
* https://v4-alpha.getbootstrap.com/getting-started/introduction/
* https://github.com/mzabriskie/axios
