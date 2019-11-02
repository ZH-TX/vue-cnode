import Vue from 'vue'
import VueRouter from 'vue-router'


const Home=()=>import('views/home/home')
const Create=()=>import('views/create/create')
const Message=()=>import('views/message/message')
const Myself=()=>import('views/myself/myself')
const Detail=()=>import('views/detail/detail')
const Login=()=>import('views/login/login')
const About=()=>import('views/about/about')

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
    component: Detail
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
