import { StockInfo } from "@/util/types";
import React from "react";

const StocksOwned = (
	props: React.PropsWithChildren<{ stocks: StockInfo[] }>
) => {
	const { stocks } = props;

	const totalValue = () => {
		let total = 0;
		stocks.forEach((stock) => {
			total += stock.current_price * stock.owned;
		});
		return total;
	};

	return (
		<div className="flex flex-col m-3">
			{stocks.map((stock) => {
				return (
					<div
						key={stock._id}
						className="max-w-sm rounded overflow-hidden shadow-lg mb-2 p-2"
					>
						<strong>{stock.owned}</strong> shares of{" "}
						<strong>{stock.stock_name}</strong> ({stock.stock_ticker}) at{" "}
						<strong>${stock.current_price}</strong> per share for a total value
						of <strong>${stock.current_price * stock.owned}</strong>
					</div>
				);
			})}
			<div className="max-w-sm overflow-hidden mb-2 p-2">
				Total value of all stocks: <p className="inline bg-blue-50 px-2 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">${totalValue()}</p>
			</div>
		</div>
	);
};

export default StocksOwned;
