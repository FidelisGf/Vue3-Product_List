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
        beforeEnter(to, from){
            if(localStorage.getItem('tkn') != null &&
            localStorage.getItem('tkn') != undefined){
                axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('tkn')
                axios.get("/auth/validateTkn").then(()=>{
                    return {name : 'Carrinho'}
                })
            }else{
              const genericApp = useAppStore()
              genericApp.activeSnack('Esteja logado para isso !')
              return {name: 'Login'}
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
          if(localStorage.getItem('tkn') != null &&
          localStorage.getItem('tkn') != undefined){
              axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('tkn')
              axios.get("/auth/validateTkn").then(()=>{
                  console.log('Chegou aqui')
                  next({name: 'Perfil'})
              })
          }else{
            console.log('foi aqui')
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
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.onError((error, to) => { // devido ao erro que ocorre com o vite
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location = to.fullPath
  }
})

export default router
