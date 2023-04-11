import { StockInfo } from "@/util/types";
import React from "react";

const StocksOwned = (
	props: React.PropsWithChildren<{ stocks: StockInfo[] }>
) => {
	const { stocks } = props;
	
	return (
		<div className="flex flex-col">
			{stocks.map((stock) => {
				return (
					<div key={stock._id} className="max-w-sm rounded overflow-hidden shadow-lg mb-2 p-2">
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
