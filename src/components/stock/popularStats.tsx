"use client";

import Link from "next/link";

import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopularStock } from "../../util/types";

interface PopularStatsProps {
	stockId: string;
}

export default function PopularStats(props: PopularStatsProps) {
    const stockId = props.stockId;

	const [stockData, setStockData] = useState<Partial<PopularStock>[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/popularstats/${stockId}`)
			.then((response) => {
				const data = response.data;
				setStockData(data.data);
			})
			.catch((err: any) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	return (
		<div className="p-3">
            <div className="text-center">
				Shares Traded:
			</div>
            <div className="text-center">
				{stockData.map((stockObj, index) => (
					<div
						key={index}
						className="text-center"
					>
						    {stockObj.totalTransactions}

					</div>
				))}
            </div>
		</div>
	);
}
