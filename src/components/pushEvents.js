import React from 'react'
import moment from 'moment'
import { Timeline, Avatar, Card } from 'antd'

const COLORS = ['red', 'green', 'blue', 'pink']

const Message = ({ event }) => {
  const { actor, repo, payload, created_at } = event
  const { commits } = payload
  const { name } = repo
  const { avatar_url, display_login } = actor
  return (
    <Card
      title={moment(created_at).format('MM/DD/YYYY HH:mm:ss')}
      extra={
        <Avatar size="small" src={avatar_url}>
          {display_login}
        </Avatar>
      }
      bordered={false}
      bodyStyle={{ padding: '12px 24px' }}
    >
      <h4 style={{ padding: '0.5em 0' }}>
        {name}
      </h4>
      <ul
        style={{
          listStyle: 'disc',
          paddingLeft: '20px',
        }}
      >
        {commits.map(c => {
          const { sha, message } = c
          return (
            <li key={sha}>
              {message}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

const Events = ({ events, limit }) => {
  const _events = events && events.length > 0 ? events.peek() : null
  if (!_events) {
    return null
  }
  const pushEvents = _events.filter(v => {
    return v.type === 'PushEvent'
  })

  const limitLength = limit || 7

  return (
    <Timeline
      pending={
        <a href="https://github.com/thonatos" target="_blank">
          See more
        </a>
      }
    >
      {pushEvents.slice(0, limitLength).map((e, k) => {
        const color = COLORS[k % 4]
        return (
          <Timeline.Item key={k} color={color}>
            <Message event={e} />
          </Timeline.Item>
        )
      })}
    </Timeline>
  )
}

export default Events
