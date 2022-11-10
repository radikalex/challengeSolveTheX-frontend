import { defineStore, acceptHMRUpdate } from 'pinia';
import Book from "../interfaces/Book"
import Author from '../interfaces/Author';
import axios from "axios"
interface BookState {
    books: Book[];
    loading: boolean;
}
const API_URL = "http://localhost:3000"
export const useBookStore = defineStore({
    id: 'Book',
    state: (): BookState => ({
        books: [],
        loading: false,
    }),
    getters: {},
    actions: {
        async getBooks(): Promise<void> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/books`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            this.books = res.data.books
            this.loading = false;
        },

        async getBooksFilterByName(name: string): Promise<void> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/books/getBooksFilterName?name=${name}`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            this.books = res.data.books
            this.loading = false;
        },

        async createBook(book: Book): Promise<void> {
            this.loading = true;
            const res = await axios.post(`${API_URL}/`,book,{
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            res.data.book
            this.books = [...this.books, book]
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
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot));
}
