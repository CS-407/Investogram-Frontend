"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { TradeList } from "../transaction/tradeList";

interface UserTradesSectionProps {
	stockId: string;
}

export default function UserTradesSection(props: UserTradesSectionProps) {
	const stockId = props.stockId;

	useEffect(() => {

		axios
			.get(`${BASE_URL}/api/stock/userTrades/${stockId}`, {
				headers: {
				  "Authorization": "Bearer " + localStorage.getItem("token")
			  }
			})
			.then((res) => {
				const data = res.data;
				
				let trades = data.data;
				trades.sort(function (a: any, b: any) {
					return Date.parse(b.timestamp) - Date.parse(a.timestamp);
				});
				
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

	const [trades, setTrades] = useState([]);

	return (
		<div>
			<div className="font-semibold text-lg px-2">
				Your most recent trades for this stock:
			</div>
			<TradeList trades={trades}/>
		</div>
	);
}
