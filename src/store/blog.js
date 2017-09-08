import { observable, action } from 'mobx'
import { Github } from '~/utils/'

const auth = {
  username: 'thonatos',
  password: ['7b1d96130bd7ad7b7c96a', '6a0d6d67fdcc11b60d6'].join(''),
}

const gh = new Github(auth)

class State {
  @observable events = []
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
      const { data } = await gh.getContents('thonatos', 'blog', 'posts')
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
      const { data } = await gh.getContents('thonatos', 'blog', `posts/${name}`)
      this.post = data
    } catch (error) {
    } finally {
      this.post_loading = false
    }
  }
}

export default State
