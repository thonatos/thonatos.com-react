import axios from 'axios'

axios.defaults.baseURL = 'https://api.github.com'

const defaultAuth = {
  username: 'thonatos',
  password: ['7b1d96130bd7ad7b7c96a', '6a0d6d67fdcc11b60d6'].join(''),
}

class Github {
  constructor(auth = null, opts = {}) {
    this.auth = auth || defaultAuth
    this.opts = opts
  }

  getContents = (owner, repo, path) => {
    const { auth } = this
    return axios.get(`/repos/${owner}/${repo}/contents/${path}`, {
      auth,
    })
  }

  getUserStarred = user => {
    const { auth } = this
    return axios.get(`/users/${user}/starred`, {
      auth,
    })
  }

  getUserEvents = user => {
    const { auth } = this
    return axios.get(`/users/${user}/events`, {
      auth,
    })
  }

  getRepoEvents = (owner, repo) => {
    const { auth } = this
    return axios.get(`/repos/${owner}/${repo}/events`, {
      auth,
    })
  }
}

export default Github
