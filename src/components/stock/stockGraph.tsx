"use client";

import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

interface StockGraphProps {
	stockId: string;
}

export default function StockGraph(props: StockGraphProps) {
	const stockId = props.stockId;

	const mockData = [
		{
			id: "stockPrices",
			data: [
				{ x: "2019-05-29", y: 120 },
				{ x: "2019-06-29", y: 123 },
				{ x: "2019-07-29", y: 115 },
				{ x: "2019-08-29", y: 130 },
			],
		},
	];

	const [prices, setPrices] = useState([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/stock/history/${stockId}`)
			.then((res) => {
				let fetchedPrices = res.data.data;
				fetchedPrices.sort(function (a: any, b: any) {
					return Date.parse(b.time_pulled) - Date.parse(a.time_pulled);
				});

				setPrices(res.data.data);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	const converDateToPlotFormat = (date: Date) => {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return `${year}-${month}-${day}`;
	};

	const stockData = () => {
		let info = prices.map((price: any) => {
			return {
				x: converDateToPlotFormat(new Date(price.time_pulled)),
				y: price.current_price,
			};
		});
		let out = [
			{
				id: "stockPrices",
				data: info,
			},
		];
		return out;
	};

	if (prices.length === 0) return <div>loading...</div>;
	return (
		<div className="">
			<div className="h-96">
				<ResponsiveLine
					data={stockData()}
					margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
					xScale={{
						type: "time",
						format: "%Y-%m-%d",
						precision: "day",
					}}
					xFormat="time:%m/%d"
					yScale={{
						type: "linear",
						min: "auto",
						max: "auto",
						stacked: false,
						reverse: false,
					}}
					axisBottom={{
						format: "%m/%d",
						legend: "Date",
						legendOffset: 40,
						legendPosition: "middle",
					}}
					axisLeft={{
						legend: "Stock Price",
						legendOffset: -40,
						legendPosition: "middle",
					}}
					pointSize={10}
					pointColor="black"
					colors={["#000000"]}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					useMesh={true}
				/>
			</div>
		</div>
	);
}
