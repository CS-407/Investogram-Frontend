"use client";

import { TransactionType } from "@/util/types";
import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useEffect, useState } from "react";
import { TradeRow } from "../transaction/tradeRow";

interface UserTradesSectionProps {
	stockId: string;
}

export default function UserTradesSection(props: UserTradesSectionProps) {
	const stockId = props.stockId;
	const mockUserId = "63e8451d540fd8c730cb98b4";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/trades/${mockUserId}/${stockId}`)
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

	function Divider() {
		const dividerStyle = "border-b-2 border-gray-300 my-1";
		return <div className={dividerStyle}> </div>;
	}

	return (
		<div>
			<div className="font-semibold text-lg">
				Your most recent trades for this stock:
			</div>
			<Divider />
			<div>
				{trades.map((tradeObj) => (
					<div>
						<TradeRow props={tradeObj} />
						<Divider />
					</div>
				))}
			</div>
		</div>
	);
}
