import { defineStore, acceptHMRUpdate } from 'pinia';
import Book from "../interfaces/Book"
// import { generateID, sleep } from './../utils';
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
    //   persist: {
    //     paths: ['tasks'],
    //   },
    getters: {},
    actions: {
        async getBooks(): Promise<void> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/books`, {
                headers: {
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY4MDg2ODYwfQ.zO-aI57szFW9SdoL2ZOwX6ySDckCJPr1w6cBjK5YZDQ"
                }
            })
            this.books = res.data.books
            this.loading = false;
        },
        async createBook(book: Book): Promise<void> {
            this.loading = true;
            const res = await axios.post(`${API_URL}/`,book,{
                headers: {
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY4MDg2ODYwfQ.zO-aI57szFW9SdoL2ZOwX6ySDckCJPr1w6cBjK5YZDQ"
                }
            })
            res.data.book
            this.books = [...this.books, book]
            this.loading = false;
        },
        // async deleteTask(id: string): Promise<void> {
        //   this.loading = true;
        //   this.tasks = this.tasks.filter((task) => task.id !== id);
        //   await sleep(1000);
        //   this.loading = false;
        // },
        // async updateTask(id: string): Promise<void> {
        //   this.loading = true;
        //   const task = this.tasks.find((task) => task.id === id);

        //   if (task) {
        //     task.done = !task.done;
        //   }

        //   await sleep(1000);
        //   this.loading = false;
        // },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot));
}
