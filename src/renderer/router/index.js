import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/loginWind/loginMain.vue'
import setWind from '../components/loginWind/setWind.vue'
import modifypass from '../components/loginWind/modifypass.vue'
import home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    {path:'/home',component:home},
    {
      path: '/login',
      component: login,
    },
    {
      path:'/setwind',
      component:setWind
    },
    {
      path:'/modifypass',
      component:modifypass
    }
  ]
})
