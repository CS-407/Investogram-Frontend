"use client";

import { Transaction } from "@/util/types";
import { BASE_URL } from "@/util/globals";
import { currencyConverter } from "@/util/HelperFunctions";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LossGainSection(props: React.PropsWithChildren<{ trades: Transaction[] }>) {
	const { trades } = props;

	const totalRevenue = () => {
		if (trades.length > 0) {
			let sells = trades.filter(
				(trade: Transaction) => trade.buy === false
			);
			let revenue = sells.reduce(
				(total: number, item: Transaction) => total + item.amount_usd,
				0
			);
			return [currencyConverter(revenue), sells.length];
		} else {
			return ["0", 0];
		}
	};

	const totalLoss = () => {
		if (trades.length > 0) {
			let buys = trades.filter((trade: Transaction) => trade.buy === true);
			let loss = buys.reduce(
				(total: number, item: Transaction) => total + item.amount_usd,
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
				<div className="flex-col px-1" style={{padding: "20px"}}>
					<div className="font-semibold text-lg">Total Revenue:</div>
					<p className="text-sm">How much stock has been sold on the app</p>
					<div className="">
						<div className="text-2xl font-semibold text-green-500">
							${totalRevenue()[0]}
						</div>
						<div className="text-sm font-semibold text-green-500">
							on {totalRevenue()[1]} trades
						</div>
					</div>
				</div>
				<div className="flex-row" style={{padding: "20px"}}>
				<div className="flex-col px-1">
					<div className="font-semibold text-lg">Total Profit:</div>
					<p className="text-sm">Revenue - losses</p>
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
				<div className="flex-col px-1">
					<div className="font-semibold text-lg">Total Loss:</div>
					<p className="text-sm">How much stock has been bought on the app</p>
					<div className="">
						<div className="text-2xl font-semibold text-red-500">
							${totalLoss()[0]}
						</div>
						<div className="text-sm font-semibold text-red-500">
							on {totalLoss()[1]} trades
						</div>
					</div>
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
