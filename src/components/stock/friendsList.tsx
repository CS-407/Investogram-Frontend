"use client";

import Link from "next/link";

import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FriendList } from "../../util/types";

interface FriendListProps {
	stockId: string;
}

export default function FriendsList(props: FriendListProps) {
    const stockId = props.stockId;
	const [friendData, setFriendData] = useState<Partial<FriendList>[]>([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/api/stock/getFriends/${stockId}`, {
			headers: {
			  "Authorization": "Bearer " + localStorage.getItem("token")
		  }
		}).then((response) => {
			const data = response.data;
			if (data.msg === "Success") {
				let friendData = data.data;
				//console.log(stockData);
				setFriendData(data.data);
			} else {
				console.log("Error");
				console.log(data);
			}
		});
	}, []);

	return (
		<div className="text-center">
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
		</div>
	
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