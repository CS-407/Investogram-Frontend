"use client";
import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/stock/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";
import FriendsList from "@/components/stock/friendsList";
import PopularStats from "@/components/stock/popularStats";
import { Purchase } from "@/util/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { currencyConverter } from "@/util/HelperFunctions";
import axios from "axios";
import { BASE_URL } from "@/util/globals";
import PopularStats from "@/components/stock/popularStats";


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
					console.log(err.response.data.msg);
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
					console.log(err.response.data.msg);
				} else {
					console.log("getPrice", err);
				}
			});
	}, []);

	const [purchases, setPurchases] = useState<Partial<Purchase>[]>([]);
	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/purchases/${stockId}`)
			.then((response) => {
				let purchases = response.data.data;
				console.log("purchases", purchases);
				setPurchases(purchases);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					console.log("getPurchases", err);
				}
			});
	}, []);

	interface CategoriesProps { categories: string[] }
	const CategoriesRow = (props: CategoriesProps) => {
		const { categories } = props;
		return (
			<div className="flex flex-row flex-wrap">
				{ categories.map((category: string) => {
					return (
						<div className="rounded-full shadow-lg p-1 px-2 mx-1 bg-blue-100"> 
							<p>{category}</p>
						</div>
					)
				})}
			</div>
		);
	}

	return (
		<main className="p-5">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg p-5 mb-5 bg-investogram_yellow text-investogram_navy">
				<h1 className="text-5xl m-3 font-bold " >
					{stock ? `${stock.stock_name} (${stock.stock_ticker})` : ""}
				</h1>
				<h2 className="inline bg-blue-100 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 p-5 mb-2">
					{price ? `$${currencyConverter(price.current_price)}` : ""}
				</h2>
				{/* {purchases.length > 0 && (
				<h2 className="inline bg-blue-100 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 p-5 ml-5 mr-2 mb-2">
					Purchases: {purchases ? `${purchases[0].purchases}` : ""}
				</h2>
				)}
				{purchases.length === 0 && (
				<h2 className="inline bg-blue-100 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 p-5 ml-5 mr-2 mb-2">
					No purchases yet 
				</h2>
				)} */}
				{stock ? <CategoriesRow categories={stock.categories}/>: ""}
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
			<div className="grid grid-cols-4 p-5">
				<div className="flex-none flex leading-none tracking-tight flex-col rounded-lg shadow-lg p-3 mb-5 bg-investogram_yellow text-investogram_navy">
					<h1 className="text-2xl m-3 font-bold " >Average Stats</h1>
					{purchases.length > 0 && (
						<h2 className="font-semibold text-lg text-investogram_navy p-1">
							Purchases: {purchases ? `${purchases[0].purchases}` : ""}
						</h2>
					)}
					{purchases.length === 0 && (
						<h2 className="font-semibold text-lg text-investogram_navy p-1">
							No purchases yet
						</h2>
						
					)}
					<p className="text-sm font-semibold text-investogram_dark_yellow p-1">
						Number of purchases made on this account
					</p>
					<PopularStats stockId="{stockId}" />
				</div>

				<div>
					<UserTradesSection stockId={stockId} />
				</div>

			</div>
			{/* <PopularStats stockId={stockId} /> */}
			<FriendsList stockId={stockId} />
		</main>
	);
}
