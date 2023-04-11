"use client";

import { Transaction } from "@/util/types";
import { TradeList } from "../transaction/tradeList";

export default function RecentTradesSection(
	props: React.PropsWithChildren<{ trades: Transaction[] }>
) {
	return (
		<div>
			<div className="font-semibold text-lg">Your most recent trades:</div>
			<TradeList trades={props.trades} />
		</div>
	);
}
