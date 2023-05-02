'use client';

import AggregateStocks from "@/components/stock/aggregateStocks";

export default function globalstocks() {
	return (
		<main className="m-5">
		<div className="flex-none lex justify-center items-center flex-col rounded-lg shadow-sm p-5 bg-investogram_yellow mt-5 mb-5">
					<h1 className="text-4xl text-center text-investogram_navy font-bold mt-3 mb-2 p-3 ">
						Stocks your friends have purchased
					</h1>

					
		</div>
		<div className="m-7">
		<AggregateStocks /></div>
		</main>
		
	);
}