"use client";

import { Transaction } from "@/util/types";
import { currencyConverter } from "@/util/HelperFunctions";
import { useEffect, useState } from "react";

import PieChart from "@/components/profile/pieChart";

interface LossGainSectionProps {
	monetaryInfo: any;
}

export default function LossGainSection(props: LossGainSectionProps) {
	const loss = currencyConverter(props.monetaryInfo.loss);
	const revenue = currencyConverter(props.monetaryInfo.revenue);
	const profit = props.monetaryInfo.profit;
	const purchases = props.monetaryInfo.purchases;
	const sales = props.monetaryInfo.sales;

	if (props.monetaryInfo) {
		return (
			<div
				className="flex my-auto align-center rounded-lg flex-row p-5"
				style={{ color: "#364F6B" }}
			>
				{/* start of revenue */}
				<div className="px-1 mr-5 rounded-lg">
					<div className="font-semibold text-lg mr-2">Total Revenue:</div>
					{/* <p className="text-sm">How much stock has been sold on the app</p> */}
					<div className="">
						<div className="text-2xl font-semibold text-green-500">
							${revenue}
						</div>
						<div className="text-sm font-semibold text-green-500">
							on {sales} trades
						</div>
					</div>

					{/* end of revenue */}
					<div className="p-4"></div>

					{/* start of loss */}
					{/* profit/loss = total value of stock + stock you've sold - total spent on stocks */}
					<div className="px-1 rounded-lg">
						<div className="font-semibold text-lg">Total Loss:</div>
						{/* <p className="text-sm">How much stock has been bought on the app</p> */}
						<div className="">
							<div className="text-2xl font-semibold text-red-500">${loss}</div>
							<div className="text-sm font-semibold text-red-500">
								on {purchases} trades
							</div>
						</div>

						{/* end of loss */}
						<div className="p-4"></div>

						{/* start of profit */}
						<div className="px-1 rounded-lg">
							<div className="font-semibold text-lg">Total Profit:</div>
							{/* <p className="text-sm">Revenue - losses</p> */}
							<div
								className={`text-2xl font-semibold ${
									profit >= 0 ? "text-green-500" : "text-red-500"
								}`}
							>
								${currencyConverter(profit)}
							</div>
							<div
								className={`text-sm font-semibold ${
									profit >= 0 ? "text-green-500" : "text-red-500"
								}`}
							>
								on {purchases + sales} trades
							</div>

							{/* end of profit */}
						</div>
					</div>
				</div>
				{/* add pie chart here */}
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
