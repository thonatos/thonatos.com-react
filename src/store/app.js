import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'

import { zh_CN, en_US } from '~/locales/'
import antd_en_US from 'antd/lib/locale-provider/en_US'

class State {
  @persist
  @observable
  locale = 'en_us'

  @observable
  menus = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'Stars',
      href: '/page/stars',
    },
  ]

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
    // {
    //   name: 'hexo',
    //   href: 'http://blog.thonatos.com',
    //   icon: '#icon-hexo',
    // },
    {
      name: 'zhihu',
      href: 'https://zhuanlan.zhihu.com/a-log-cabin',
      icon: '#icon-zhihu',
    },
  ]

  constructor(root) {
    this.root = root
  }

  @computed
  get langs() {
    return this.locale === 'zh_cn' ? zh_CN : en_US
  }

  @computed
  get langsAntd() {
    return this.locale === 'zh_cn' ? null : antd_en_US
  }

  @action
  changeLanguageTo = lang => {
    this.locale = lang
  }
}

export default State
