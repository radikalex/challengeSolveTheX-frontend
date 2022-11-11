import { defineStore, acceptHMRUpdate } from 'pinia';
import Book from "../interfaces/Book"
import axios from "axios"
interface BookState {
    books: Book[];
    cart: CartItem[];
    loading: boolean;
}

interface CartItem {
    book: Book,
    amount: number
}

const API_URL = "http://localhost:3000"
export const useBookStore = defineStore({
    id: 'Book',
    state: (): BookState => ({
        books: [],
        cart: [],
        loading: false,
    }),
    getters: {},
    actions: {
        getCartTotalPrice(): number {
            return this.cart.length > 0 ? this.cart.map(item => item.amount*item.book.price).reduce((a, b) => a + b) : 0;
        },

        getNumberBooksCart(): number {
            return this.cart.length > 0 ? this.cart.map(item => item.amount).reduce((a,b) => a + b) : 0;
        },

        deleteProductCart(id: number): void {
            this.cart = this.cart.filter(item => item.book.id !== id)
        },

        async makeOrder(): Promise<void> {
            const products = [];

            for (const item of this.cart) {
                products.push( {"id": item.book.id, "amount": item.amount} );
            }

            const body = {
                "status": "On the way",
                "books": products
            }
              
            const res = await axios.post(`http://localhost:3000/orders`, body, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            });

            this.cart = [];
        },

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

        async createBook(name: string, genre: string,  num_pages: number, price: number, AuthorId: number, img_book: File): Promise<void> {
            this.loading = true;

            const formData = new FormData();
            formData.append("name", name);
            formData.append("genre", genre);
            formData.append("num_pages", num_pages.toString());
            formData.append("price", price.toString());
            formData.append("AuthorId", AuthorId.toString());
            formData.append("img_book", img_book);

            const res = await axios.post(`${API_URL}/books`, formData, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
        },

        async getBookById(id: number): Promise<Book> {
            this.loading = true;
            const res = await axios.get(`${API_URL}/books/id/${id}`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
            return res.data.book;
        },
        

        async updateBookById(id: number, name: string, genre: string,  num_pages: number, price: number, AuthorId: number, img_book: File): Promise<void> {
            this.loading = true;

            const formData = new FormData();
            formData.append("name", name);
            formData.append("genre", genre);
            formData.append("num_pages", num_pages.toString());
            formData.append("price", price.toString());
            formData.append("AuthorId", AuthorId.toString());
            formData.append("img_book", img_book);

            await axios.put(`${API_URL}/books/id/${id}`, formData ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
        },

        async deleteBookById(id: number): Promise<void> {
            this.loading = true;

            await axios.delete(`${API_URL}/books/id/${id}`, {
                headers: {
                    authorization: localStorage.getItem('user_token')
                }
            })
            
            this.loading = false;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot));
}
