// Composables
import { createRouter, createWebHistory } from 'vue-router'
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

        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'produtos',
        name: 'Produtos',
        component: () => import('@/views/Produto.vue'),
      },
      {
        path: 'produto/detalhes/:id',
        name: 'Produto-Detalhe',
        component: () => import('@/views/Details/DetailProduto.vue')

      },
      {
        path: 'carrinho',
        name: 'Carrinho',
        beforeEnter(to, from, next){
          if(localStorage.getItem('tkn') != null ||
            localStorage.getItem('tkn') != undefined){
              axios.defaults.headers.common['Authorization'] = 'Bearer' +
              localStorage.getItem('tkn')
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
        component:() => import('@/views/Carrinho.vue')
      },
      {
        path: 'cadastro',
        name: 'Cadastro',
        component: () => import('@/views/RegisterCliente.vue')
      },
      {
        path: 'login',
        name: 'Login',
        beforeEnter(to, from, next){
          if(localStorage.getItem('tkn') != null ||
            localStorage.getItem('tkn') != undefined){
              axios.defaults.headers.common['Authorization'] = 'Bearer' +
              localStorage.getItem('tkn')
              axios.get("/auth/validateTkn").then((res)=>{
                next({name : 'Perfil'})
              }).catch((error)=>{
                const access_token = localStorage.getItem("tkn");

                if(error.response.status == 401 &&
                  access_token && error.response.data != 'token_invalid'){
                  localStorage.setItem('tkn', error.response.data)

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
        component: () => import('@/views/LoginCliente.vue')
      },
      {
        path: 'perfil',
        name: 'Perfil',
        component: () => import('@/views/Perfil.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
