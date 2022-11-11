import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BooksView from '../views/BooksView.vue';
import AboutView from '../views/AboutView.vue';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';
import CartViewVue from '../views/CartView.vue';
import MyOrdersViewVue from '../views/MyOrdersView.vue';

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
        path: '/about',
        name: 'About us',
        component: AboutView
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
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;