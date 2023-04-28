"use client";

import { currencyConverter } from "@/util/HelperFunctions";
import { BASE_URL } from "@/util/globals";
import { SortedStock } from "@/util/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SortedStocks = () => {
	const [sortedStocks, setSortedStocks] = useState<SortedStock[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/global/tradeinfo`)
			.then((res: AxiosResponse) => {
				console.log(res.data.stock_info)
				setSortedStocks(res.data.stock_info);
			})
			.catch((err: AxiosError) => {
				if (err.response && err.response.data && err.response.data) {
					console.log(err.response.data);
				} else {
					console.log(err);
				}
			});
	}, []);

	const handleSortByPrice = () => {
		const tmp: SortedStock[] = [...sortedStocks];

		tmp.sort((a: SortedStock, b: SortedStock) => {
			return b.current_price - a.current_price;
		});

		setSortedStocks(tmp);
	};

	const handleSortByShares = () => {
		const tmp: SortedStock[] = [...sortedStocks];

		tmp.sort((a: SortedStock, b: SortedStock) => {
			return b.num_shares - a.num_shares;
		});

		setSortedStocks(tmp);
	};

	const handlefilteredStocks = () => {
		return sortedStocks.map((obj: SortedStock) => (
			<tr
				className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
				key={obj.stock_id}
			>
				<th className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
					<Link href={`/stock/${obj.stock_id}`}>
						<p className="hover:underline">{obj.stock_ticker}</p>
					</Link>
				</th>
				<td className="px-6 py-4">{obj.stock_name}</td>
				<td className="px-6 py-4">{currencyConverter(obj.current_price)}</td>
				<td className="px-6 py-4">{obj.num_shares}</td>
			</tr>
		));
	};

	return (
		<main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">
					Sorted Stocks
				</h1>
				<p>
				Sort stocks by current value or number of shares traded!
				</p>
			</div>
			<div className="mt-2 w-full flex flex-row justify-center rounded-lg shadow-lg bg-investogram_navy py-4">
				<Link className="mr-2" href={"/stockCategories"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
						View Stock Categories
					</p>
				</Link>
				<Link className="ml-2" href={"/globalstocks"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
						View Global Stocks
					</p>
				</Link>
			</div>

			{/* table displayed stocks with filter */}
			<div className="relative overflow-x-auto m-3 p-2 text-center">
				<table className="table-auto mt-3 w-full text-sm text-left text-gray-500 dark:text-gray-400 p-5 bg-investogram_gray">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th className="px-6 py-3">Stock Ticker</th>
							<th className="px-6 py-3">Stock Name</th>
							<th
								onClick={handleSortByPrice}
								className="px-6 py-3 hover:underline hover:cursor-pointer"
							>
								Current Value
							</th>
							<th
								onClick={handleSortByShares}
								className="px-6 py-3 hover:underline hover:cursor-pointer"
							>
								Shares Transacted
							</th>
						</tr>
					</thead>
					<tbody>{handlefilteredStocks()}</tbody>
				</table>
			</div>
		</main>
	);
};

export default SortedStocks;
