import React from 'react'
import moment from 'moment'
import { Timeline, Avatar, Card, Tag } from 'antd'

const COLORS = ['red', 'green', 'blue', 'pink']

const TYPES = {
  IssueCommentEvent: 'COMMENT',
  PullRequestReviewCommentEvent: 'PULL REQUEST',
  PushEvent: 'PUSH',
  CreateEvent: 'CREATE',
}

const Message = ({ event, color }) => {
  const { actor, repo, payload, created_at } = event
  const { commits, issue, pull_request } = payload
  const { name } = repo
  const { avatar_url, display_login } = actor
  const type = TYPES[event.type]
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
        <Tag color={color}>{type}</Tag> {name}
      </h4>

      {issue
        ? <div>
            {issue.title}
          </div>
        : null}

      {pull_request
        ? <div>
            {pull_request.title}
          </div>
        : null}

      <ul
        style={{
          listStyle: 'disc',
          paddingLeft: '20px',
        }}
      >
        {commits &&
          commits.map(c => {
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
    return TYPES[v.type]
  })

  const limitLength = limit || 7

  return (
    <Timeline
      pending={
        <a
          href="https://github.com/thonatos"
          target="_blank"
          rel="noopener noreferrer"
        >
          See more
        </a>
      }
    >
      {pushEvents.slice(0, limitLength).map((e, k) => {
        const color = COLORS[k % 4]
        return (
          <Timeline.Item key={k} color={color}>
            <Message event={e} color={color} />
          </Timeline.Item>
        )
      })}
    </Timeline>
  )
}

export default Events
