import { observable, action } from 'mobx'
import { Github } from '~/utils/'

const gh = new Github()

class State {
  @observable stars = []
  @observable events = []

  constructor(root) {
    this.root = root
    this.loadEvents()
  }

  @action
  loadEvents = async () => {
    try {
      const { data } = await gh.getUserEvents('thonatos')
      this.events = data
    } catch (error) {}
  }

  @action
  loadStars = async () => {
    try {
      const { data } = await gh.getUserStarred('thonatos')
      this.stars = data
    } catch (error) {}
  }
}

export default State
