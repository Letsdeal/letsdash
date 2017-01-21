import _ from 'lodash'
import axios from 'axios'
import Pusher from 'pusher-js'
import mitt from 'mitt'

class Travis {
  constructor(accessToken) {
    this.bus = mitt()

    this.headers = {
      'Accept': 'application/vnd.travis-ci.2+json',
      'Authorization': `token "${ accessToken }"`
    }

    this.client = axios.create({
      baseURL: 'https://api.travis-ci.com/',
      headers: this.headers
    })

    this.client.get('/config').then((response) => {
      let pusherKey = response.data.config.pusher.key

      this.pusher = new Pusher(pusherKey, {
        auth: {
          headers: this.headers
        },
        authEndpoint: 'https://api.travis-ci.com/pusher/auth',
        encrypted: true
      })

      this.pusher.bind_global((event, data) => {
        if (!_.startsWith(event, 'build:')) return

        this.bus.emit(event, data)
      })
    })
  }

  getRepo(projectName) {
    return new Promise((resolve, reject) => {
      this.client.get(`/repos/${ projectName }`).then((response) => {
        resolve(response.data.repo)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getBuilds(projectName) {
    return new Promise((resolve, reject) => {
      this.client.get(`/repos/${ projectName }/builds`).then((response) => {
        resolve(response.data.builds)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.client.get('/users').then((response) => {
        resolve(response.data.user)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  subscribe(repo) {
    // waiting for https://github.com/pusher/pusher-js/pull/211/files
    // this.pusher.subscribe(`private-repo-${ repo.id }`)
  }
}

export default Travis
