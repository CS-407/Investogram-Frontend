"use client";

import AuthContext from "@/context/AuthContext";
import { currencyConverter } from "@/util/HelperFunctions";
import { MonetaryInfo, StockInfo, User } from "@/util/types";
import { useContext } from "react";

interface LossGainSectionProps {
	monetaryInfo: MonetaryInfo;
	stocks: StockInfo[];
	user: User;
}

export default function LossGainSection(props: LossGainSectionProps) {

	const stocks = props.stocks;
	const user = props.user;
	

	const stockValue = () => {
		let total = 0;
		if (!stocks) return 0;
		stocks.forEach((stock) => {
			total += stock.current_price * stock.owned;
		});
		return currencyConverter(total);
	}

	const totalstockValue = stockValue();
	const loss = currencyConverter(props.monetaryInfo.loss);
	const revenue = currencyConverter(props.monetaryInfo.revenue);
	const profit = props.monetaryInfo.profit;
	const purchases = props.monetaryInfo.purchases;
	const sales = props.monetaryInfo.sales;

	const portfolioValue = user.current_balance + props.monetaryInfo.profit + Number(stockValue());

	const ProfitSection = () => {
		return (


			<div className="px-1">

				<div>
					<div className="font-semibold text-lg">Total Profit:</div>
					<div className={`text-2xl font-semibold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
						${currencyConverter(profit)}
					</div>
					<div className={`text-sm font-semibold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
						on {purchases + sales} trades
					</div>
				</div>
				{/*
				<h3 className="text-center">=</h3>
				
				<div>
					<div className="font-semibold text-lg">Total Revenue:</div>
					<div>
						<div className="text-2xl font-semibold text-green-500">
							${revenue}
						</div>
						<div className="text-sm font-semibold text-green-500">
							on {sales} trades
						</div>
					</div>
				</div>

				<h3 className="text-center">-</h3>
				
				<div>
					<div className="font-semibold text-lg">Total Loss:</div>
					<div className="">
						<div className="text-2xl font-semibold text-red-500">${loss}</div>
						<div className="text-sm font-semibold text-red-500">
							on {purchases} trades
						</div>
					</div>
				</div>
				*/}
			</div>
		)
	}

	const startingBalance = 25000;
	const differenceFromOriginal = portfolioValue - startingBalance;

	if (props.monetaryInfo) {
		return (
			<div className="flex my-auto align-center rounded-lg flex-row p-5 text-investogram_navy">

					<div className="px-1 mx-2 rounded-lg">
						<div>
							<h3 className="font-semibold text-lg">Current Portfolio Value:</h3>
							<h3 className="text-2xl font-semibold">
								${currencyConverter(portfolioValue)}
							</h3>
						</div>
						<div>
						<h3 className="font-semibold text-lg">Overall Change:</h3>
							<h3 className={`text-2xl font-semibold ${differenceFromOriginal >= 0 ? "text-green-500" : "text-red-500"}`}>
								{differenceFromOriginal >= 0 ? '+' : ''}${currencyConverter(differenceFromOriginal)}
							</h3>
						</div>
					</div>

					<h3 className="align-middle"> = </h3>

					<ProfitSection />

					<h3 className="align-middle">+</h3>

					<div className="px-1 mx-2">
						<div className="font-semibold text-lg">Stock Value:</div>
						<h3 className="text-2xl font-semibold">
							${stockValue()}
						</h3>
					</div>

					<h3 className="align-middle">+</h3>

					<div className="px-1 mx-2">
						<div className="font-semibold text-lg">Current Balance:</div>
						<h3 className="text-2xl font-semibold">
							${currencyConverter(user.current_balance)}
						</h3>
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

