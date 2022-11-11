import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BooksView from '../views/BooksView.vue';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';
import CartViewVue from '../views/CartView.vue';
import MyOrdersViewVue from '../views/MyOrdersView.vue';
import AdminViewVue from '../views/AdminView.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/books',
        name: 'Books',
        component: BooksView
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignUpView
    }, 
    {
        path: '/login',
        name: 'Log In',
        component: LogInView
    }, 
    {
        path: '/cart',
        name: 'Cart',
        component: CartViewVue
    }, 
    {
        path: '/my_orders',
        name: 'My Orders',
        component: MyOrdersViewVue
    }, 
    {
        path: '/admin',
        name: 'Admin',
        component: AdminViewVue
    }, 
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if( (to.name !== 'Home' && to.name !== 'Sign Up' && to.name !== 'Log In') && !localStorage.getItem('user_token') ) {
        next( { path: '/'} )
    }
    else {
        next()
    }
})

export default router;