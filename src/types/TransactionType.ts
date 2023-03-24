export interface TransactionType {
    id: string;
    user_id: string;
    stock_id: string;
    stock_price_id: string;
    current_price: number;
    no_of_shares: number;
    amount_usd: number;
    timestamp: number;
    post_id: string;
    buy: boolean;
}
    