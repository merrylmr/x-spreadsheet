import VueRouter from 'vue-router';

import Home from '@/Home.vue'
import List from '@/List.vue'
import Area from '@/Area.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: List
  },
  {
    path: '/area',
    name: 'area',
    component: Area
  }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});


export default router;
