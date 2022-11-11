export default interface Order {
    id:        number;
    status:    string;
    UserId:    number;
    createdAt: Date;
    updatedAt: Date;
    Books:     OrderBook[];
}

export interface OrderBook {
    id:         number;
    name:       string;
    img_book:   string;
    genre:      string;
    num_pages:  number;
    price:      number;
    AuthorId:   number;
    Order_book: OrderBookDetail;
}

export interface OrderBookDetail {
    OrderId:   number;
    BookId:    number;
    amount:    number;
}