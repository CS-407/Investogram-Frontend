export interface User {
    _id: string;
    email: string;
    username: string;
    current_balance: number;
    followers: number;
    following: number;
    password?: string;
    password2?: string;
    reset_token?: number;
}

export interface Stock {
    _id: string;
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