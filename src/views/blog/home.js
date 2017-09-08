import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

const Posts = ({ data }) => {
  const posts = data ? data.peek() : []
  return (
    <div>
      <ul
        style={{
          listStyle: 'disc',
          paddingLeft: '40px',
        }}
      >
        {posts.map(p => {
          const { name, sha } = p
          return (
            <li key={sha} style={{ padding: '0.5em 0' }}>
              <Link to={`/blog/post/${name}`}>
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

@inject('app', 'blog')
@observer
class Home extends Component {
  componentDidMount() {
    const { blog } = this.props
    blog.loadPosts()
  }

  render() {
    const { posts, posts_loading } = this.props.blog
    return (
      <div>
        <Spin spinning={posts_loading}>
          <Posts data={posts} />
        </Spin>
      </div>
    )
  }
}

export default Home
