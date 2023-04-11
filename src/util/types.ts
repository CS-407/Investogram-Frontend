export interface User {
	_id: string;
	email: string;
	username: string;
	current_balance: number;
	followers: number;
	following: number;
	followers_list: string[];
	following_list: string[];
	requests: string[];
	password?: string;
	password2?: string;
	reset_token?: number;
}

export interface Stock {
	_id: string;
	stock_ticker: string;
	stock_name: string;
}

export interface StockPrice {
	_id: string;
	stock_id: string;
	current_price: number;
	time_pulled: number;
}

export interface Transaction {
	_id: string;
	user_id: string;
	stock_id: Stock;
	stock_price_id: StockPrice;
	no_of_shares: number;
	amount_usd: number;
	timestamp: number;
	post_id: string;
	buy: boolean;
}

export interface StockInfo {
	_id: string;
	stock_ticker: string;
	stock_name: string;
	owned: number;
	current_price: number;
}

export interface MonetaryInfo {
	purchases: number;
	sales: number;
	revenue: number;
	loss: number;
	profit: number;
}

export interface Post {
	userId: string;
	type: string;
	content: string;
	likes: number;
	timestamp: string;
	comments: any[];
}