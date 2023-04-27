"use client";

import { StockRow } from "@/components/stock/stockRow";
import { BASE_URL } from "@/util/globals";
import { Stock, StockList, User } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const EditListPage = () => {
	const [list, setList] = useState<StockList>();
	const currentListIds = list?.stocks.map((stock) => stock._id);
	const [allStocks, setAllStocks] = useState<Stock[]>();

	const params = usePathname();
	const listId = params ? params.split("/")[2] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/list/get/${listId}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setList(response.data);
			})
			.catch((err) => {
				alert("Error getting list");
			});
		axios
			.get(`${BASE_URL}/api/stock/getAllStocks`)
			.then((response) => {
				console.log(response.data.data);
				setAllStocks(response.data.data);
			})
			.catch((err) => {
				alert("Error getting list");
			});
	}, []);

	const removeStock = (stockId: string) => {
		if (!list) return alert("Error removing stock");
		let removedStocks = list.stocks.filter((stock) => stock._id !== stockId);
		setList({ ...list, stocks: removedStocks });
	};

	const addStock = (stock: Stock) => {
		if (!list) return alert("Error adding stock");
		let addedStocks = list.stocks;
		addedStocks.push(stock);
		setList({ ...list, stocks: addedStocks });
	};

	const StocksSection = () => {
		if (list?.stocks.length === 0) return <p>No stocks</p>;
		return (
			<div>
				{list?.stocks.map((stock) => (
					<div className="flex flex-row my-2">
						<StockRow stock={stock} />
						<button
							className="mx-2 p-1 bg-red-500 text-white rounded-lg hover:text-red-500 hover:bg-white hover:border-2 hover:border-red-500"
							onClick={() => removeStock(stock._id)}
						>
							Remove Stock
						</button>
					</div>
				))}
			</div>
		);
	};

	const OtherStocks = () => {
		if (!allStocks || !list || !currentListIds) return <p>Loading...</p>;
		const otherStocks = allStocks?.filter(
			(stock) => !currentListIds.includes(stock._id)
		);
		return (
			<div className="block w-full">
				<div className="flex flex-row justify-between my-auto">
					<h2 className="text-xl font-bold my-auto">Other Stocks:</h2>
					<button
						className="block w-42 h-12 my-2 p-1 bg-blue-500 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500"
						onClick={() => setShowingOtherStocks(false)}
					>
						Hide Other Stocks
					</button>
				</div>
				<div className="flex flex-wrap">
					{otherStocks?.map((stock) => (
						<div className="flex m-2">
							<StockRow stock={stock} />
							<button
								className="mx-2 p-1 bg-green-500 text-white rounded-lg hover:text-green-500 hover:bg-white hover:border-2 hover:border-green-500"
								onClick={() => addStock(stock)}
							>
								Add Stock
							</button>
						</div>
					))}
				</div>
			</div>
		);
	};

	const submitChanges = () => {
		console.log("Here");
		axios
			.post(`${BASE_URL}/api/list/update`, list, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				alert("List updated successfully");
			})
			.catch((err) => {
				alert("Error updating list");
			});
	};

	const [showingOtherStocks, setShowingOtherStocks] = useState<boolean>(false);

	if (list === null || list === undefined) return <div>Loading...</div>;
	return (
		<div className="mx-16">
			<div className="flex justify-between">
				<div>
					<h1 className="font-bold text-2xl">List Name:</h1>
					<input
						type="text"
						className="block p-4 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
						value={list?.list_name}
						onChange={(e) => setList({ ...list, list_name: e.target.value })}
					/>
				</div>
				<div className="flex flex-row my-auto">
					<Link href={`/list/${listId}`}>
						<button
							className="block w-48 h-12 my-auto mx-2 p-1 bg-blue-500 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500"
							onClick={() => submitChanges}
						>
							Back to the List Page
						</button>
					</Link>
					<button
						className="block w-16 h-12 my-auto mx-2 p-1 bg-green-500 text-white rounded-lg hover:text-green-500 hover:bg-white hover:border-2 hover:border-green-500"
						onClick={() => submitChanges()}
					>
						Submit
					</button>
				</div>
			</div>
			<div>
				<h2 className="text-xl font-bold">Current Stocks:</h2>
				<StocksSection />
				{!showingOtherStocks && (
					<button
						className="block w-42 h-12 my-2 p-1 bg-blue-500 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500"
						onClick={() => setShowingOtherStocks(true)}
					>
						Show Other Stocks
					</button>
				)}
				{showingOtherStocks && <OtherStocks />}
			</div>
		</div>
	);
};

export default EditListPage;
