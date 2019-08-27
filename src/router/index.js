import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "Register" */'@/pages/register/Register')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */'@/pages/login/Login')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import(/* webpackChunkName: "Detail" */'@/pages/detail/Detail')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import(/* webpackChunkName: "My" */'@/pages/my/My')
    },
    {
      path: '/new',
      name: 'AddBlog',
      component: () => import(/* webpackChunkName: "AddBlog" */'@/pages/addBlog/AddBlog')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
