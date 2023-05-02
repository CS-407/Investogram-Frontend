'use client';

import { StockCategories } from "@/components/stock/stockCategories";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<main className="p-5 bg-white">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy">
				<h1 className="text-5xl font-bold mt-4 mb-4">Stock Categories</h1>
				<p>View the different categories of stocks we have on Investogram!</p>
			</div>
			<div className="mt-2 w-full flex flex-row justify-center rounded-lg shadow-lg bg-investogram_navy py-4">
				<Link className="mr-2" href={"/globalstocks"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
						View Global Stocks
					</p>
				</Link>
				<Link className="ml-2" href={"/sortedStocks"}>
					<p className="bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
						View Sorted Stocks
					</p>
				</Link>
			</div>
			<StockCategories />
		</main>
	);
};

export default page;
