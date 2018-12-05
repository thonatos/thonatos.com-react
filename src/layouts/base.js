import React, { Component } from 'react'
import Dimensions from 'react-dimensions'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { Menu, Breadcrumb, Dropdown, Row, Col, Icon } from 'antd'

import logo from '~/logo.svg'
import styles from './base.module.css'
import { LangSwitch } from '~/components'

const { Header, Footer, Content } = Layout

const Container = ({ children, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

const NavMenu = ({ menus, width }) => {
  if (!menus) {
    return null
  }

  const largeSceen = (width || 0) > 780
  const mode = largeSceen ? 'horizontal' : ''
  const className = largeSceen
    ? styles.header_menu
    : styles.header_menu_dropdown
  const menu = (
    <Menu theme="light" mode={mode} className={className}>
      {menus.map((v, k) => {
        const { name, href } = v
        return (
          <Menu.Item key={k}>
            <Link to={href}>
              {name}
            </Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return largeSceen
    ? menu
    : <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link">
          Home <Icon type="down" />
        </a>
      </Dropdown>
}

@inject('app')
@observer
class Base extends Component {
  render() {
    const { location, app, hideBreadcrumbs } = this.props

    // navMenus
    const { menus: navMmenus, locale, changeLanguageTo } = app
    const menus = navMmenus.length > 0 ? navMmenus.peek() : []

    const lang = (
      <LangSwitch locale={locale} changeLanguageTo={changeLanguageTo} />
    )

    // breadcrumbs
    const { pathname } = location
    const pathArray = pathname.split('/')
    const breadcrumbs = pathArray
      ? pathArray.splice(0, 1, 'Home') && pathArray
      : ['Home']

    // other
    const containerWidth = this.props.containerWidth
    const { children } = this.props

    return (
      <Layout className={styles.layout}>
        {/* header */}
        <Header className={styles.header}>
          <Container>
            <Row type="flex" justify="space-between" align="center">
              <Col span={12}>
                <div className={styles.logo}>
                  <img src={logo} alt="" />
                </div>
                <NavMenu menus={menus} width={containerWidth} />
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end" align="center">
                  <Col>
                    {lang ? lang : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Header>

        {/* content */}
        <Content className={styles.content}>
          <Container>
            {!hideBreadcrumbs && breadcrumbs
              ? <Breadcrumb style={{ margin: '12px 0', padding: '0 1em' }}>
                  {breadcrumbs.map((v, k) => {
                    const link = [''].concat(breadcrumbs.slice(1, k + 1))
                    const href = link.join('/') || '/'
                    return (
                      <Breadcrumb.Item key={k}>
                        <Link to={href}>
                          {v}
                        </Link>
                      </Breadcrumb.Item>
                    )
                  })}
                </Breadcrumb>
              : null}
            <div className={styles.content_box}>
              {children}
            </div>
          </Container>
        </Content>

        {/* footer */}
        <Footer className={styles.footer}>
          <Container>
            <div>
              <iframe
                title="star"
                frameBorder="0"
                scrolling="0"
                width="170px"
                height="20px"
                src="https://ghbtns.com/github-btn.html?user=thonatos&type=follow"
              />
            </div>
            <div style={{ marginTop: '0.6em' }}>
              <p className={styles.footer_desc}>
                Copyright © 2012-{new Date().getFullYear()} . <br /> Maintained
                By{' '}
                <a
                  href="https://github.com/thonatos"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Suyi (Thonatos.Yang)
                </a>{' '}
                .
              </p>
            </div>
          </Container>
        </Footer>
      </Layout>
    )
  }
}

export default Dimensions()(Base)
