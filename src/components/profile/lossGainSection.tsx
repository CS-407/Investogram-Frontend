"use client";

import { TransactionType } from "@/util/types";
import { BASE_URL } from "@/util/globals";
import { currencyConverter } from "@/util/HelperFunctions";
import { useEffect, useState } from "react";
import axios from "axios";

interface LossGainSectionProps {
	user_id: string;
}

export default function LossGainSection(props: LossGainSectionProps) {
	const user_id = props.user_id;

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/trades/${user_id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				const data = res.data;

				const trades = data.data;
				trades.sort(
					(a: any, b: any) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
				);
				setTrades(data.data);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
                    alert(err.response.data.msg);
                } else {
                    alert("Trouble contacting server");
                }
			});
	}, []);

	const [trades, setTrades] = useState<TransactionType[]>([]);

	const totalRevenue = () => {
		if (trades.length > 0) {
			let sells = trades.filter(
				(trade: TransactionType) => trade.buy === false
			);
			let revenue = sells.reduce(
				(total: number, item: TransactionType) => total + item.amount_usd,
				0
			);
			return [currencyConverter(revenue), sells.length];
		} else {
			return ["0", 0];
		}
	};

	const totalLoss = () => {
		if (trades.length > 0) {
			let buys = trades.filter((trade: TransactionType) => trade.buy === true);
			let loss = buys.reduce(
				(total: number, item: TransactionType) => total + item.amount_usd,
				0
			);
			return [currencyConverter(loss), buys.length];
		} else {
			return ["0", 0];
		}
	};

	const profit = trades
		? currencyConverter(Number(totalRevenue()[0]) - Number(totalLoss()[0]))
		: 0;

	if (trades.length > 0) {
		return (
			<div className="flex">
				<div className="flex-col px-1">
					<div className="font-semibold text-lg">Total Revenue:</div>
					<p className="text-sm">How much stock has been sold on the app.</p>
					<div className="">
						<div className="text-2xl font-semibold text-green-500">
							${totalRevenue()[0]}
						</div>
						<div className="text-sm font-semibold text-green-500">
							on {totalRevenue()[1]} trades
						</div>
					</div>
				</div>
				<div className="flex-col px-1">
					<div className="font-semibold text-lg">Total Loss:</div>
					<p className="text-sm">How much stock has been bought on the app.</p>
					<div className="">
						<div className="text-2xl font-semibold text-red-500">
							${totalLoss()[0]}
						</div>
						<div className="text-sm font-semibold text-red-500">
							on {totalLoss()[1]} trades
						</div>
					</div>
				</div>
				<div className="flex-col px-1">
					<div className="font-semibold text-lg">Total Profit:</div>
					<p className="text-sm">Revenue - losses.</p>
					<div
						className={`text-2xl font-semibold ${
							profit >= 0 ? "text-green-500" : "text-red-500"
						}`}
					>
						${profit}
					</div>
					<div
						className={`text-sm font-semibold ${
							profit >= 0 ? "text-green-500" : "text-red-500"
						}`}
					>
						on {trades.length} trades
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div>Loading Data...</div>
			</div>
		);
	}
}
