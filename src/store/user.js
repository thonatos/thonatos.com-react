import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'
import { Base64 } from 'js-base64'

import { Github } from '~/utils/'
import { source } from '~/config/'

const { owner, about, repo } = source
const gh = new Github()

class State {
  @observable
  socials = [
    {
      name: 'github',
      href: 'https://github.com/thonatos/',
      icon: '#icon-github',
    },
    {
      name: 'docker',
      href: 'https://github.com/ImplementsIO',
      icon: '#icon-docker',
    },
    {
      name: 'weibo',
      href: 'http://weibo.com/thonatos',
      icon: '#icon-weibo',
    },
    {
      name: 'zhihu',
      href: 'https://zhuanlan.zhihu.com/a-log-cabin',
      icon: '#icon-zhihu',
    },
  ]

  @observable stars = []
  @observable events = []

  @persist
  @observable
  about = ''

  constructor(root) {
    this.root = root
    this.loadIntro()
    this.loadEvents()
  }

  @action
  loadIntro = async () => {
    try {
      const { data } = await gh.getContents(`${owner}`, `${repo}`, `${about}`)
      this.about = Base64.decode(data.content)
    } catch (error) {}
  }

  @action
  loadEvents = async () => {
    try {
      const { data } = await gh.getUserEvents(`${owner}`)
      this.events = data
    } catch (error) {}
  }

  @action
  loadStars = async () => {
    try {
      const { data } = await gh.getUserStarred(`${owner}`)
      this.stars = data
    } catch (error) {}
  }
}

export default State
