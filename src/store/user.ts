import { defineStore, acceptHMRUpdate } from 'pinia';
import User from "../interfaces/User"
import axios from "axios"

interface UserState {
    loggedUser: User | null,
    loading: boolean;
}

const API_URL = "http://localhost:3000"
export const useUserStore = defineStore({
    id: 'User',
    state: (): UserState => ({
        loggedUser: null,
        loading: false,
    }),
    getters: {},
    actions: {
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
