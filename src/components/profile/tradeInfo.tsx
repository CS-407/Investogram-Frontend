import { BASE_URL } from "@/util/globals";
import { MonetaryInfo, StockInfo, TransactionType } from "@/util/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentTradesSection from "./recentTradesSection";
import StocksOwned from "./stocksOwned";

interface Info {
	transactions: TransactionType[];
	stock_info: StockInfo[];
	monetary_info: MonetaryInfo;
}

const TradeInfo = (props: React.PropsWithChildren<{ user_id: string }>) => {
	const [state, setState] = useState<Info>();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/trades/${props.user_id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setState({
					transactions: res.data.transactions,
					stock_info: res.data.stock_info,
					monetary_info: res.data.monetary_info,
				});
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble Contacting Server");
				}
			});
	}, []);

	return (
		<div>
			<div className="grid grid-cols-4">
				<div className="col-span-3">
					{state?.monetary_info && <RecentTradesSection user_id="" />}
				</div>
				<div className="col-span-1">
					{state?.stock_info && <StocksOwned stocks={state?.stock_info} />}
				</div>
			</div>
		</div>
	);
};

export default TradeInfo;
