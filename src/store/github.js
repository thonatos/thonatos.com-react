import { observable, action } from 'mobx'
import { Github } from '~/utils/'

const auth = {
  username: 'thonatos',
  password: ['7b1d96130bd7ad7b7c96a', '6a0d6d67fdcc11b60d6'].join(''),
}

const gh = new Github(auth)

class State {
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
}

export default State
