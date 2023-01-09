// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Guard from "../plugins/AuthGuard"
import axios from "axios"
import { useAppStore } from '@/store/app'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'produtos',
        name: 'Produtos',
        component: () => import(/* webpackChunkName: "home" */  '@/views/Produto.vue'),
      },
      {
        path: 'produto/detalhes/:id',
        name: 'Produto-Detalhe',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Details/DetailProduto.vue')

      },
      {
        path: 'carrinho',
        name: 'Carrinho',
        beforeEnter(to, from, next){
          if(localStorage.getItem('token') != null ||
            localStorage.getItem('token') != undefined){
              axios.defaults.headers.common['Authorization'] = 'Bearer' +
              localStorage.getItem('token')
              axios.get("/auth/validateTkn").then((res)=>{
                next()
              }).catch((error)=>{
                const access_token = localStorage.getItem("token");

                if(error.response.status == 401 &&
                  access_token && error.response.data != 'token_invalid'){
                  localStorage.setItem('token', error.response.data)

                  axios.defaults.headers.common['Authorization'] = 'Bearer' + error.response.data
                  next()
                }else{
                    const genericApp = useAppStore()
                    genericApp.activeSnack('Esteja logado para isso !')
                    next({name: 'Login'})
                }
              })
          }else{
              const genericApp = useAppStore()
              genericApp.activeSnack('Esteja logado para isso !')
              next('/login')
          }
        },
        component:() => import(/* webpackChunkName: "home" */ '@/views/Carrinho.vue')
      },
      {
        path: 'cadastro',
        name: 'Cadastro',
        component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterCliente.vue')
      },
      {
        path: 'login',
        name: 'Login',
        beforeEnter(to, from, next){
          if(localStorage.getItem('token') != null ||
            localStorage.getItem('token') != undefined){
              axios.defaults.headers.common['Authorization'] = 'Bearer' +
              localStorage.getItem('token')
              axios.get("/auth/validateTkn").then((res)=>{
                next({name : 'Perfil'})
              }).catch((error)=>{
                const access_token = localStorage.getItem("token");

                if(error.response.status == 401 &&
                  access_token && error.response.data != 'token_invalid'){
                  localStorage.setItem('token', error.response.data)

                  axios.defaults.headers.common['Authorization'] = 'Bearer' + error.response.data
                  next()
                }else{
                    const genericApp = useAppStore()
                    genericApp.activeSnack('Esteja logado para isso !')
                    next()
                }
              })
          }else{
              const genericApp = useAppStore()
              genericApp.activeSnack('Esteja logado para isso !')
              next()
          }
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/LoginCliente.vue')
      },
      {
        path: 'perfil',
        name: 'Perfil',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Perfil.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
