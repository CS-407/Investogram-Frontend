"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BuySellButtonProps } from "./buybutton";
import AuthContext from "@/context/AuthContext";

export default function SellButton(props: BuySellButtonProps) {
	const stockId = props.stock_id;
	const price = props.stock_price ? props.stock_price.current_price: 0;
	const stockPriceId = props.stock_price ? props.stock_price._id : "";
	const stock = props.stock;

	const executeSell = () => {
		axios
			.post(
				`${BASE_URL}/api/stock/sell`,
				{
					stock_id: stockId,
					stock_price_id: stockPriceId,
					no_of_shares: orderAmt,
					amount_usd: orderAmt * price,
					buy: false,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				const data = response.data;

				setSellSuccess(true);
			})
			.catch((err) => {
				setSellFail(true);
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	};

	const [balance, setBalance] = useState<Partial<number>>(0);
	useEffect(() => {
	    axios.get(`${BASE_URL}/api/user/getBalance`, {
	        headers: {
	            "Authorization": "Bearer " + localStorage.getItem("token")
	        }
	    })
	    .then(response => {
	        const data = response.data;
	        setBalance(data.balance)
	    })
	    .catch(err => {
	        if (err.response && err.response.data && err.response.data.msg) {
				alert(err.response.data.msg);
			} else {
				console.log('sellButtonBalance', err);
			}
	    });
	}, []);

	const { user } = useContext(AuthContext);
	const uid = user?._id;

	const [currentStockOwned, setCurrentStockOwned] = useState<Partial<number>>(0);
	useEffect(() => {
		if (!uid) return;
	    axios.get(`${BASE_URL}/api/user/trades/${uid}`, {
	        headers: {
	            "Authorization": "Bearer " + localStorage.getItem("token")
	        }
	    })
	    .then(response => {
	        const data = response.data.stock_info;
			const stock = data.filter((stock: any) => stock._id === stockId);
			let owned = stock.length > 0 ? stock[0].owned : 0;
	        setCurrentStockOwned(owned)
	    })
	    .catch(err => {
	        if (err.response && err.response.data && err.response.data.msg) {
				alert(err.response.data.msg);
			} else {
				console.log('sellButtonTrades', err);
			}
	    });
	}, []);

	const [orderAmt, setOrderAmt] = useState(0);

	function availableBalance() {
		return balance + orderAmt * price;
	}

	function decreaseButton() {
		if (orderAmt > 0) {
			// Don't go below 0
			return (
				<button
					className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
					onClick={() => setOrderAmt(orderAmt - 1)}
				>
					-
				</button>
			);
		}
	}

	function increaseButton() {
		if (orderAmt + 1 <= currentStockOwned) {
			// Enough funds
			return (
				<button
					className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
					onClick={() => setOrderAmt(orderAmt + 1)}
				>
					+
				</button>
			);
		}
	}

	function amtButtons() {
		return (
			<div className="flex justify-center">
				{decreaseButton()}
				<div className="px-4 text-2xl bold">{orderAmt}</div>
				{increaseButton()}
			</div>
		);
	}

	function remainingStock() {
		let remaining = currentStockOwned - orderAmt;
		return (
			<div className="text-sm italic p-1">
				{remaining} shares left worth ${(remaining * price).toFixed(2)}
			</div>
		);
	}

	function selectSection() {
		if (orderAmt > 0) {
			return (
				<div className="flex-col items-center px-2">
					<button
						className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-red-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-red-500 hover:border-red-500 focus:outline-none"
						onClick={() => {
							executeSell();
						}}
					>
						Sell
						<div className="flex-row font-normal text-xs italic p-1">
							Sell {orderAmt} shares for ${(orderAmt * price).toFixed(2)}
						</div>
					</button>
				</div>
			);
		}
	}

	const [sellSuccess, setSellSuccess] = useState(false);
	const [sellFail, setSellFail] = useState(false);

	if (sellSuccess) {
		return (
			<div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
				<div className="text-lg font-bold text-white p-2">Sell Success</div>
			</div>
		);
	} else {
		return (
			<main>
				<div className="inline-block border-solid rounded-md border-2 border-red-500 align-middle text-center">
					<div className="flex font-bold text-2xl p-1">
						Sell {stock ? stock.stock_name : ""} (
						<div className="italic">{stock ? stock.stock_ticker : ""}</div>)
					</div>
					{amtButtons()}
					{remainingStock()}
					{selectSection()}
					<div className="text-sm p-1">
						${availableBalance().toFixed(2)} in account balance
					</div>
					{sellFail && (
						<div className="text-sm p-1 text-red-500">
							ERROR: Stock Buy Failure
						</div>
					)}
				</div>
			</main>
		);
	}
}
