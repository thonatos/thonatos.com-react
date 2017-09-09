import React, { Component } from 'react'
import { Dropdown, Menu, Button } from 'antd'

const LANGUAGES = {
  zh_cn: {
    text: 'CHINESE',
    icon: '#icon-china',
  },
  en_us: {
    text: 'ENGLISH',
    icon: '#icon-english',
  },
}

const Item = Menu.Item
const Lang = ({ className, text }) => {
  return (
    <div>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={className} />
      </svg>
      <span style={{ marginLeft: '0.5em' }}>
        {text}
      </span>
    </div>
  )
}

class Language extends Component {
  onSelect = ({ key }) => {
    this.props.changeLanguageTo(key)
  }

  render() {
    const { locale } = this.props
    const menu = (
      <Menu onSelect={this.onSelect} style={{ textAlign: 'center' }}>
        {Object.keys(LANGUAGES).map(l => {
          const { icon, text } = LANGUAGES[l]
          return (
            <Item key={l}>
              <Lang className={icon} text={text} />
            </Item>
          )
        })}
      </Menu>
    )

    const { icon, text } = LANGUAGES[locale]

    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
        <Button style={{ border: 'none' }}>
          <Lang className={icon} text={text} />
        </Button>
      </Dropdown>
    )
  }
}

export default Language
