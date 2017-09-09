import Home from './home'
import Stars from './stars'

export const routes = {
  page_stars: {
    path: '/page/stars',
    component: Stars,
    exactly: true,
  },
  page_home: {
    path: '/page',
    component: Home,
    exactly: true,
  },
}
