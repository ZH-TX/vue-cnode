import Vue from 'vue'
import VueRouter from 'vue-router'


const Home=()=>import('views/home/home')
const Create=()=>import('views/create/create')
const Message=()=>import('views/message/message')
const Myself=()=>import('views/myself/myself')
const Detail=()=>import('views/detail/detail')
const Login=()=>import('views/login/login')
const About=()=>import('views/about/about')
const UDetail=()=>import('views/detail/nameDetail')
const notFound=()=>import('views/404.vue')

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/myself',
    name: 'myself',
    component: Myself
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
    children:[  ]
  },
  {
    
      path:'/namedetail',
      name:'namedetail',
      component:UDetail
    
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path:'/404',
    name:'not found',
    component:notFound
  },
  {
    path:'*',
    redirect:'/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
