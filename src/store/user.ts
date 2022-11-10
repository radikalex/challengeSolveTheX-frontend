import { defineStore, acceptHMRUpdate } from 'pinia';
import User from "../interfaces/User"
import axios from "axios"

interface UserState {
    loading: boolean;
}

const API_URL = "http://localhost:3000"
export const useUserStore = defineStore({
    id: 'User',
    state: (): UserState => ({
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
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
