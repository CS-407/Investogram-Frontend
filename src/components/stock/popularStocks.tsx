"use client";

import Link from "next/link";

import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopularStock } from "../../util/types";

export default function PopularStocks() {
	const [stockData, setStockData] = useState<Partial<PopularStock>[]>([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/api/stock/popularstocks`).then((response) => {
			const data = response.data;
			if (data.msg === "Success") {
				let stockData = data.data;
				//console.log(stockData);
				setStockData(data.data);
			} else {
				console.log("Error");
				console.log(data);
			}
		});
	}, []);

	return (
		<table className="border-collapse w-full rounded-lg">
  <thead>
    <tr className="max-w-sm overflow-hidden shadow-lg mt-3 mb-2 p-3 rounded-lg" style={{backgroundColor:"#364F6B", color:"#fff"}}>
        <th className="py-2 px-4 uppercase tracking-wider">Stock Ticker</th>
      <th className="py-2 px-4 uppercase tracking-wider">Stock Name</th>
      <th className="py-2 px-4 uppercase tracking-wider">Shares</th>
    </tr>
  </thead>
  <tbody>
    {stockData.map((stockObj, index) => (
      <tr key={index} className="max-w-sm overflow-hidden mb-3 p-3 mt-3 rounded-lg">
        
        <td className="inline bg-blue-100 rounded-full px-3 py-1 text-sm text-center font-semibold text-white-700 mr-2 mb-2">
            <Link href={`/stock/${stockObj._id?.stock_id}`}>{stockObj._id?.stock_ticker}</Link>
        </td>
        <td className="py-2 px-4 text-center font-semibold">{stockObj._id?.stock_name}</td>
        {/* <td className="py-2 px-4 text-center">{stockObj._id?.stock_name}</td> */}
        <td className="py-2 px-4 text-center ">{stockObj.totalTransactions}</td>
    
      </tr>
    ))}
  </tbody>
</table>
	);
}
