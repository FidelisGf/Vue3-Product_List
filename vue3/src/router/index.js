// Composables
import Carrinho from '@/views/Carrinho.vue'
import { createRouter, createWebHistory } from 'vue-router'
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
        component: Carrinho
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
