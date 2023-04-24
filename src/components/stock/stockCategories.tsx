"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StockCategories(props: any) {
	const [categoryData, setCategoryData] = useState<any[]>([]);
	
    useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/getGroupedCategories/`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data.data;
				setCategoryData(data);
			})
			.catch((err) => {
				console.log("Error getting category data");
			});
	}, []);

	const categorySection = (category: any) => {
		return (
			<div className="inline-block p-1 bg-blue-100 mx-1 rounded-lg shadow-lg">
				<h1 className="font-bold text-xl">{category.category}</h1>
				<p className="text-lg">
					{category.count} stock{category.count > 1 ? "s" : ""}
				</p>
				<div className="overflow-y-auto h-64">
					{category.stocks.map((stock: any) => (
						<div>
							<Link
								href={`/stock/${stock._id}`}
								className="block w-64 px-1 py-1 rounded-lg hover:bg-investogram_yellow"
							>
								<p className="hover:underline">
									{stock.stock_name} ({stock.stock_ticker})
								</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="rounded-md p-2 bg-investogram_yellow my-2 text-investogram_navy">
			<h3 className="font-bold text-2xl">Stock Categories</h3>
			{!categoryData && <p>Loading Category Data</p>}
			<div className="flex flex-row overflow-scroll">
				{categoryData.length > 0 &&
					categoryData.map((friend: any) => categorySection(friend))}
			</div>
		</div>
	);
}
