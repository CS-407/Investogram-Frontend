"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Stock } from "../../util/types";

const SearchStock = () => {
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
	
	useEffect(() => {
		if (stocks.length == 0) {
			axios
				.get(`${BASE_URL}/api/global/stocks`)
				.then((response) => {
					const data = response.data;
					setStocks(data.stocks);
					setFilteredStocks(data.stocks);
				})
				.catch((err) => {
					if (err.response && err.response.data && err.response.data.msg) {
						console.log(err.response.data.msg);
					} else {
						console.log("Trouble contacting server");
					}
				});
		}
	
	}, []);

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length == 0) {
			setFilteredStocks(stocks);
		} else {
			const filter = e.target.value.toLowerCase();
			const tmp = stocks.filter((stk) =>
				stk.stock_name.toLowerCase().startsWith(filter)
			);

			setFilteredStocks(tmp);
		}
	};
	
	return (
		<div>
			<div className="relative m-4">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						></path>
					</svg>
				</div>
				<input
					type="text"
					id="simple-search"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Stocks..."
					required
					onChange={handleFilter}
				/>
			</div>

			<div className="flex flex-row flex-wrap">
				{filteredStocks.map((stock: Stock) => (
					<div key={stock._id} className="max-w-sm rounded overflow-hidden shadow-lg m-3">
						<div className="px-4 py-2">
							<div className="font-bold text-l mb-2">{stock.stock_ticker}</div>
							<p className="text-gray-700 text-base text-sm">
								{stock.stock_name}
							</p>
						</div>
						<div className="px-4 py-2">
                            <Link href={`/stock/${stock._id}`}>
								<p className="inline-block bg-gray-200 hover:bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									Visit Stock Page
								</p>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchStock;
