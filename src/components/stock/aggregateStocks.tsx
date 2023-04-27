"use client";

import Link from "next/link";

import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Aggregate } from "@/util/types";

// interface AggregateStocksProps {
// 	stockId: string;
// }

//props: AggregateStocksProps


export default function AggregateStocks() {
    //const stockId = props.stockId;
	const [stockData, setStockData] = useState<Partial<Aggregate>[]>([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/api/stock/getAggregateStocks`, {
			headers: {
			  "Authorization": "Bearer " + localStorage.getItem("token")
		  }
		}).then((response) => {
			const data = response.data;
			if (data.msg === "Success") {
				let friendData = data.data;
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
            {stockData.length === 0 && (
				<p className="text-lg mb-2" style={{ color: "#364F6B", padding: "20px" }}>
				Your friends have not purchased any stocks
				</p>
            )}

            {stockData.length > 0 && (
                <tbody>
                    {stockData.map((stockObj, index) => (
                    <tr key={index} className="max-w-sm rounded overflow-hidden mb-3 p-3 mt-3">
                        
                        <td className="inline bg-blue-100 rounded-full px-3 py-1 text-sm text-center font-semibold text-white-700 mr-2 mb-2">
                            <Link href={`/stock/${stockObj._id?.stock_id}`}>
								{stockObj._id?.stock_ticker}
							</Link>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">{stockObj._id?.stock_name}</td>
                    
                    </tr>
                    ))}
                </tbody> 
            )}

        </table>

		/*<div className="text-center">
			{friendData.length === 0 && (
				<div className="text-center">
				<p className="text-lg mb-2" style={{ color: "#364F6B", padding: "20px" }}>
				No Friends have bought this stock
				</p>
				</div>
            )}
			{friendData.length > 0 && (
				<div className="text-center">
				<p className="text-lg mb-2" style={{ color: "#364F6B", padding: "20px" }}>
					Friends who have bought this stock
				</p>
				<ul className="list-none" style={{ padding: "20px" }}>
					{friendData.map((friendObj, index) => (
						<li
							key={index}
							className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm"
						>
							{friendObj._id?.username}
						</li>
					))}
				</ul>
				</div>
			)}
		</div>*/
	
  /*<tbody>
    {friendData.map((friendObj, index) => (
      <tr key={index} className="max-w-sm rounded overflow-hidden mb-3 p-3 mt-3">
        
        <td className="inline bg-blue-100 rounded-full px-3 py-1 text-sm text-center font-semibold text-white-700 mr-2 mb-2">
            {friendObj._id?.stock_ticker}
        </td>
        <td className="py-2 px-4 text-center font-semibold">{friendObj._id?.stock_name}</td>
        <td className="py-2 px-4 text-center ">{friendObj.totalTransactions}</td>
    
      </tr>
    ))}
  </tbody> */

	);
}