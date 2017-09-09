import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import { Provider } from 'mobx-react'
import { observer, inject } from 'mobx-react'

import './App.css'
import RootStore from '~/store/root'
import { Home, Blog, NoMatch } from '~/container/'

const rootStore = new RootStore()

@inject('app')
@observer
class Wrap extends Component {
  render() {
    const { langsAntd } = this.props.app
    return (
      <Router>
        <LocaleProvider locale={langsAntd}>
          <div id="wrap">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/blog" component={Blog} />
              {/*
                <Route path="/page" component={Page} />
              */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </LocaleProvider>
      </Router>
    )
  }
}

const App = () => {
  return (
    <Provider {...rootStore}>
      <Wrap />
    </Provider>
  )
}

export default App
