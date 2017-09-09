import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'antd'
import { Markdown, PushEvents } from '~/components'
import avatar from '~/mtt.png'

const Socials = ({ data }) => {
  const socials = data ? data.peek() : []
  return (
    <div>
      <ul>
        {socials.map((v, k) => {
          const { icon, name, href } = v
          return (
            <li
              key={k}
              style={{
                display: 'inline-block',
                padding: '0 1em',
                textAlign: 'center',
              }}
            >
              <a
                href={href}
                target="_blank"
                style={{ color: 'rgb(136,136,136)' }}
              >
                <div>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={icon} />
                  </svg>
                </div>
                {name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const about = `
## Thonatos.Yang

- thonatos.yang@gmail.com
- Frontend Developer / 前端汪, DevOps / 运维开发
- →_→ 兼职写代码，专职：端茶倒水，如有怀疑，请戳下面链接
- 09/2011 - 06/2015, Department of Remote sensing science and technology, NUIST, NanJing
`
@inject('app', 'github')
@observer
class About extends Component {
  render() {
    const { app, github } = this.props
    const { langs, socials } = app
    const { events } = github
    return (
      <Row gutter={16}>
        <Col sm={16} xs={24}>
          <img
            src={avatar}
            alt=""
            style={{ maxWidth: '100%', width: '300px' }}
          />
          <Markdown text={about} custom={true} />
          <div style={{ marginTop: '2em' }}>
            <Socials data={socials} />
          </div>
        </Col>

        <Col sm={8} xs={24}>
          <h2 style={{ margin: '2em 0' }}>
            {langs['user_events'] || ''}
          </h2>
          <PushEvents events={events} />
        </Col>
      </Row>
    )
  }
}

export default About
