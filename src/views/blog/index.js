import Post from './post'
import Home from './home'

export const routes = {
  blog_post: {
    path: '/blog/post/:name',
    component: Post,
    exactly: true,
  },
  blog_home: {
    path: '/blog',
    component: Home,
    exactly: true,
  },
}
