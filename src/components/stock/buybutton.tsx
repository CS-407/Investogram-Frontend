"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/util/globals";

export interface BuySellButtonProps {
	stock_id: string;
	stock: any;
	stock_price: any;
}

export default function BuyButton(props: BuySellButtonProps) {
	const stockId = props.stock_id;
	const price = props.stock_price ? props.stock_price.current_price: 0;
	const stockPriceId = props.stock_price ? props.stock_price._id : "";
	const stock = props.stock;

	const executeBuy = async () => {
		axios
			.post(
				`${BASE_URL}/api/stock/buy`,
				{
					stock_id: stockId,
					stock_price_id: stockPriceId,
					no_of_shares: orderAmt,
					amount_usd: orderAmt * price,
					buy: true,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				setBuySuccess(true);
			})
			.catch((err) => {
				setBuyFail(true);
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
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
				console.log(err.response.data.msg);
			} else {
				console.log("Trouble contacting server");
			}
	    });
	}, []);

	const [orderAmt, setOrderAmt] = useState(0);

	const  availableBalance = () => { return balance - orderAmt * (price ? price : 0); }

	const validBuy = (suggestedPrice: number) => { return balance - (suggestedPrice) >= 0 }

	function decreaseButton() {
		if (orderAmt > 0) {
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
		if (validBuy(price ? price * (orderAmt+1) : 0)) {
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

	const maxOrderAmt = Math.floor(balance / price);

	const updateOrderAmt = (e: any) => {
		if (e.target.value < 0) setOrderAmt(0);
		else if (!validBuy(e.target.value * price)) setOrderAmt(maxOrderAmt);
		else setOrderAmt(e.target.value);
	}

	const removeButtonsStyle = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

	function amtButtons() {
		return (
			<div className="flex justify-center">
				{decreaseButton()}
				<input type="number" className={`${removeButtonsStyle} block w-8 mx-2 text-center bg-gray-200 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500`} value={orderAmt} onChange={updateOrderAmt}/>
  				{increaseButton()}
			</div>
		);
	}

	function selectSection() {
		if (availableBalance() < 0) {
			return <div className="text-sm p-1">Insufficient funds</div>;
		} else {
			if (orderAmt > 0) {
				return (
					<div className="flex-col py-2 px-2">
						<button
							className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
							onClick={() => {
								console.log("Buying stock");
								executeBuy();
							}}
						>
							<div className="flex justify-center">
								Buy
								<div className="pl-2 italic">
									{" "}
									{stock && stock.stock_ticker}{" "}
								</div>
							</div>
							<div className="flex-row font-normal italic text-xs p-1">
								{orderAmt} shares for $
								{(orderAmt * (price ? price : 0)).toFixed(2)}
							</div>
						</button>
					</div>
				);
			}
		}
	}

	const [buySuccess, setBuySuccess] = useState(false);
	const [buyFail, setBuyFail] = useState(false);

	if (buySuccess) {
		return (
			<div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
				<div className="text-lg font-bold text-white p-2">Buy Success</div>
			</div>
		);
	} else {
		return (
			<main>
				<div className="inline-block border-solid rounded-md border-2 border-green-500 align-middle text-center">
					<div className="flex font-bold text-2xl p-1">
						Buy {stock ? stock.stock_name : ""} ({stock ? stock.stock_ticker : ""})
					</div>
					{amtButtons()}
					{selectSection()}
					<div className="text-sm p-1">
						${availableBalance().toFixed(2)} left to spend
					</div>
					{buyFail && (
						<div className="text-sm p-1 text-red-500">
							ERROR: Stock Buy Failure
						</div>
					)}
				</div>
			</main>
		);
	}
}
