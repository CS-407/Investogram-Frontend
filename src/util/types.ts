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
	profile_pic: number;
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

export interface TradeInfo {
	trades: Transaction[];
	stock_info: StockInfo[];
	monetary_info: MonetaryInfo;
}

export interface Comment {
	_id: string;
	user_id: Partial<User>;
	post_id: string;
	content: string;
	timestamp: number;
}

export interface Post {
	_id: string;
	user_id: Partial<User>;
	type: string;
	content: string;
	likes: number;
	timestamp: number;
	comments: Comment[];
	userlikes: string[];
}

export interface PopularStock {
	_id: {
		stock_id: string;
		stock_name: string;
		stock_ticker: string;
	};
	totalTransactions: number;
}

export interface StockList {
	_id: string;
	list_name: string;
	list_owner: User;
	stocks: any[];
}

export interface SortedStock {
	stock_id: string;
	num_shares: number;
	stock_ticker: string;
	stock_name: string;
	current_price: number;
}

export interface Leaderboard {
	_id: string;
	user_id: {
		_id: string;
		username: string;
	}
	position: number;
	loss: number;
	revenue: number;
	profit: number;
	num_trades: number;
}

export interface Purchase {
	purchases: number;
}

export interface FriendList {
	_id: {
		user_id: string;
		username: string;
	};
	stock: string;
}

export interface Aggregate {
	_id: { 
		stock_id: string; 
		stock_name: string;
		stock_ticker: string;
	};
	stock: string;
}