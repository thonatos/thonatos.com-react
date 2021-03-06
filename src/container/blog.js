import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Base as Layout } from '~/layouts/'

import { blog } from '~/views/routes'
const childRoutes = Object.values(blog)

class Blog extends Component {
  render() {
    const { location } = this.props
    return (
      <Layout location={location}>
        <Helmet>
          <title>Blog - Thonatos.Yang</title>
        </Helmet>
        <Switch>
          {childRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exactly={route.exactly}
              />
            )
          })}
        </Switch>
      </Layout>
    )
  }
}

export default Blog
