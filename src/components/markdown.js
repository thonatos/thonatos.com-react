import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

import styles from './markdown.module.css'

const Markdown = ({ text, custom }) => {
  return (
    <ReactMarkdown
      source={text}
      className={custom ? styles.markdown : 'markdown-body'}
    />
  )
}

export default Markdown
