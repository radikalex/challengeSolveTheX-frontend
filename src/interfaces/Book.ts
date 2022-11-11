export default interface Book {
    id:        number;
    name:      string;
    img_book:  string;
    genre:     string;
    num_pages: number;
    price:     number;
    AuthorId:  number;
    Author:    AuthorBook;
}

export interface AuthorBook {
    id:        number;
    name:      string;
    age:       number;
    genre:     string;
}