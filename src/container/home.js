import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Base as Layout } from '~/layouts/'
import { LangSwitch } from '~/components'
import { About } from '~/views/home/'

@inject('app', 'github')
@observer
class Home extends Component {
  render() {
    const { location, app, github } = this.props
    const { pathname } = location
    const breadcrumbs = pathname.split('/')
    const { menus: navMmenus, locale, langs, socials, changeLanguageTo } = app
    const menus = navMmenus.length > 0 ? navMmenus.peek() : []
    const { events } = github
    return (
      <Layout
        {...{
          menus,
          breadcrumbs,
        }}
        lang={
          <LangSwitch locale={locale} changeLanguageTo={changeLanguageTo} />
        }
      >
        <Helmet>
          <title>Thonatos.Yang</title>
        </Helmet>
        <div>
          <About
            langs={langs}
            data={{
              events,
              socials,
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default Home
