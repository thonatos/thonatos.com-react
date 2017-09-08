import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Base64 } from 'js-base64'
import { Spin } from 'antd'

import { Markdown } from '~/components'
import styles from './post.module.css'

@inject('app', 'blog')
@observer
class Post extends Component {
  componentDidMount() {
    const { match, blog } = this.props
    const { name } = match.params
    blog.loadPost(name)
  }

  render() {
    const { blog } = this.props
    const { post, post_loading } = blog

    if (!post) {
      return (
        <Spin>
          <div style={{ textAlign: 'center', padding: '4em 0' }}>
            Loadind...
          </div>
        </Spin>
      )
    }

    const { name, type, content } = post

    if (type !== 'file') {
      return <div>Error Type</div>
    }

    const md = Base64.decode(content)

    return (
      <div>
        <Spin spinning={post_loading}>
          <h2 className={styles.title}>
            {name}
          </h2>
          <div className={styles.post}>
            <Markdown text={md} />
          </div>
        </Spin>
      </div>
    )
  }
}

export default Post
