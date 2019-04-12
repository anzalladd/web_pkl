import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Admin/Home';
import Auth from './middleware/requiresAuth';
import MiddlewareLoader from './middleware/middlewareLoader';
Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        middlewares: [Auth]
      }
    }
  ],
});


router.beforeEach((to, from, next) => {
  return MiddlewareLoader(to, from, next)
})

export default router