import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('app', 'github')
@observer
class Stars extends Component {
  componentDidMount() {
    const { github } = this.props
    github.loadStars()
  }

  render() {
    return <div>Stars</div>
  }
}

export default Stars
