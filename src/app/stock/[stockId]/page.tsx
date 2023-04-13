"use client";
import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/stock/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { currencyConverter } from "@/util/HelperFunctions";
import axios from "axios";
import { BASE_URL } from "@/util/globals";

export default function stock() {
	const params = usePathname();
	const stockId = params ? params.split("/")[2] : "";

	const [stock, setStock] = useState<any>();
	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/get/${stockId}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
				let stockInfo = data.data;
				setStock(stockInfo);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					console.log("getStock", err);
				}
			});
	}, []);

	const [price, setPrice] = useState<any>();
	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/price/${stockId}`)
			.then((response) => {
				let price = response.data.data[0];
				console.log("price", price);
				setPrice(price);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					console.log("getPrice", err);
				}
			});
	}, []);

	return (
		<main className="p-5">
			<div
				className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg p-5 mb-5"
						style={{ backgroundColor: "#FDE698"}}
			>
			<h1 className="text-5xl m-3 font-bold" style={{ color: "#364F6B"}}>
				{stock ? `${stock.stock_name} (${stock.stock_ticker})` : ""}
			</h1>
			<h2 className="inline bg-blue-100 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 p-5 ml-5 mr-2 mb-2">
				{price ? `$${currencyConverter(price.current_price)}` : ""}
			</h2>
			</div>

			<div className="flex">
				<div className="w-4/5">
					<StockGraph stockId={stockId} />
				</div>
				<div className="py-auto">
					<div className="py-2">
						<BuyButton stock_id={stockId} stock={stock} stock_price={price} />
					</div>
					<div className="py-2">
						<SellButton stock_id={stockId} stock={stock} stock_price={price} />
					</div>
				</div>
			</div>

			<UserTradesSection stockId={stockId} />
		</main>
	);
}
