import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Base as Layout } from '~/layouts/'
import About from '~/views/home'

class Home extends Component {
  render() {
    const { location } = this.props
    return (
      <Layout location={location} hideBreadcrumbs={true}>
        <Helmet>
          <title>Thonatos.Yang</title>
        </Helmet>
        <div>
          <About />
        </div>
      </Layout>
    )
  }
}

export default Home
