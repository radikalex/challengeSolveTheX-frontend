import { defineStore, acceptHMRUpdate } from 'pinia';
import Author from '../interfaces/Author';
import axios from "axios"

interface AdminState {
    authors: Author[];
    loading: boolean;
}


const API_URL = "http://localhost:3000"
export const useAuthorStore = defineStore({
    id: 'Author',
    state: (): AdminState => ({
        authors: [],
        loading: false,
    }),
    getters: {},
    actions: {
        async getAllAuthors(): Promise<void> {
            this.loading = true;

            let res = await axios.get(`${API_URL}/authors`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            this.authors = res.data.authors;

            this.loading = false;
        },

        async getAuthorById(id: number): Promise<Author> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/authors/id/${id}`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
            return res.data.author;
        },

        async createAuthor(name: string, age: number, genre: string): Promise<void> {
            this.loading = true;

            let res = await axios.post(`${API_URL}/authors`, {name, age, genre}, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            const author = res.data.author;

            this.authors = [...this.authors, author]

            this.loading = false;
        },

        async updateAuthorById(id: number, name: string, age: number, genre: string): Promise<void> {
            this.loading = true;

            await axios.put(`${API_URL}/authors/id/${id}`, {name, age, genre} ,{
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
        },

        async deleteAuthorById(id: number): Promise<void> {
            this.loading = true;

            await axios.delete(`${API_URL}/authors/id/${id}`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthorStore, import.meta.hot));
}
