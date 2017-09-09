import axios from 'axios'
import { github } from '~/config/'

const { auth: defaultAuth } = github

axios.defaults.baseURL = 'https://api.github.com'

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
