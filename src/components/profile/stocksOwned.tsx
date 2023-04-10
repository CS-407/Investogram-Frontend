import { StockInfo } from "@/util/types";
import React from "react";

const stocks: StockInfo[] = [
	{ stock_ticker: "AAPL", stock_name: "Apple", owned: 5, current_price: 123 },
	{
		stock_ticker: "MSFT",
		stock_name: "Microsoft",
		owned: 10,
		current_price: 105,
	},
	{ stock_ticker: "GOOG", stock_name: "Google", owned: 15, current_price: 65 },
];

const StocksOwned = (
	props: React.PropsWithChildren<{ stocks: StockInfo[] }>
) => {
	return (
		<div className="flex flex-col">
			{stocks.map((stock) => {
				return (
					<div className="max-w-sm rounded overflow-hidden shadow-lg mb-2 p-2">
						<strong>{stock.owned}</strong> shares of{" "}
						<strong>{stock.stock_name}</strong> ({stock.stock_ticker}) at{" "}
						<strong>${stock.current_price}</strong> per share
					</div>
				);
			})}
		</div>
	);
};

export default StocksOwned;
