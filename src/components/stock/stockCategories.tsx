"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StockRow } from "./stockRow";

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
			<div className="p-1 bg-blue-100 m-3 rounded-lg shadow-lg">
				<h1 className="font-bold text-xl mb-1 ml-2 mt-2">{category.category} ({category.count})</h1>
				{/* <p className="text-lg">
					{category.count} stock{category.count > 1 ? "s" : ""}
				</p> */}
				<div className="overflow-y-auto overflow-x-hidden h-64 m-2">
					{category.stocks.map((stock: any) => (
						<StockRow stock={stock} />
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="m-2 flex flex-row flex-wrap">
			{!categoryData && <p>Loading Category Data</p>}
			<div className="flex flex-row flex-wrap">
				{categoryData.length > 0 &&
					categoryData.map((friend: any) => categorySection(friend))}
			</div>
		</div>
	);
}
