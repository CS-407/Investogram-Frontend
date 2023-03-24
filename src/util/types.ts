export interface User {
    email: string;
    username: string;
    current_balance: number;
    followers: number;
    following: number;
}

export interface Stock {
    stock_ticker: string;
    stock_name: string;
}

export interface Post {
    userId: string;
    type: string;
    content: string;
    likes: number;
    timestamp: string;
    comments: any[]
}