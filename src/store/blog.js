import { observable, action } from 'mobx'
import { Github } from '~/utils/'
import { source } from '~/config/'

const { owner, repo, post } = source
const gh = new Github()

class State {
  @observable posts = []
  @observable posts_loading = false
  @observable post = null
  @observable post_loading = false

  constructor(root) {
    this.root = root
  }

  @action
  loadPosts = async () => {
    this.posts_loading = true
    try {
      const { data } = await gh.getContents(`${owner}`, `${repo}`, `${post}`)
      this.posts = data
    } catch (error) {
    } finally {
      this.posts_loading = false
    }
  }

  @action
  loadPost = async name => {
    this.post_loading = true
    this.post = null
    try {
      const { data } = await gh.getContents(
        `${owner}`,
        `${repo}`,
        `${post}/${name}`
      )
      this.post = data
    } catch (error) {
    } finally {
      this.post_loading = false
    }
  }
}

export default State
