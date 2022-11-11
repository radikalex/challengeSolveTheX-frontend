import { defineStore, acceptHMRUpdate } from 'pinia';
import User from "../interfaces/User"
import Order from "../interfaces/Order"
import axios from "axios"

interface UserState {
    loggedUser: User | null,
    orders: Order[];
    loading: boolean;
    updateRender: number
}

const API_URL = "http://localhost:3000"
export const useUserStore = defineStore({
    id: 'User',
    state: (): UserState => ({
        loggedUser: null,
        orders: [],
        loading: false,
        updateRender: 0
    }),
    getters: {},
    actions: {
        incUpdateRender() {
            this.updateRender++;
        },

        getOrderTotalPrice(order: Order): number {
            return order.Books.length > 0 ? order.Books.map(book => book.Order_book.amount*book.price).reduce((a, b) => a + b) : 0;
        },

        async getOrdersOfLoggedUSer(): Promise<void> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/orders/getOrdersOfLoggedUser`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            });
            this.orders = res.data.orders;
            this.loading = false;
        },

        async signUp(name:string, email:string, password:string): Promise<any> {
            this.loading = true;
            const res = await axios.post(`${API_URL}/users`, {name, email, password});
            this.loading = false;
            return res.data;
        },
        async logIn(email:string, password:string): Promise<any> {
            this.loading = true;
            const res = await axios.post(`${API_URL}/users/login`, {email, password});
            this.loading = false;
            return res.data;
        },
        async logOut(): Promise<any> {
            this.loading = true;
            const res = await axios.delete(`${API_URL}/users/logout`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            });
            this.loggedUser = null;
            this.loading = false;
            return res.data;
        },
        async getLoggedUser(): Promise<void> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/users/getLoggedUser`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            });
            this.loggedUser = res.data.user;
            this.loading = false;
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
