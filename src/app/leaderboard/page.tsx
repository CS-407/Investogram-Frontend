"use client";

import { BASE_URL } from "@/util/globals";
import { currencyConverter } from "@/util/HelperFunctions";
import { Leaderboard } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/global/leaderboard`)
			.then((res) => {
				setLeaderboard(res.data.leaderboard);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	return (
    <main className="p-5" style={{ backgroundColor: "#f5f5f5" }}>
			<div
				className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg"
				style={{ backgroundColor: "#FDE698", padding: "20px" }}
			>
				<h1
					className="text-5xl font-bold mt-4 mb-4"
					style={{ color: "#364F6B" }}
				>
					Leaderboard
				</h1>
				<p>
					View the top performers of the week! Visit their profile by clicking on their username.
				</p>
			</div>
			<div className="relative overflow-x-auto m-3">
			<table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th className="px-6 py-3">Position</th>
						<th className="px-6 py-3">Username</th>
						<th className="px-6 py-3">Profit</th>
					</tr>
				</thead>
				<tbody>
					{leaderboard.map((obj: Leaderboard) => (
						<tr
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							key={obj._id}
						>
							<td className="px-6 py-4">{obj.position}</td>
							<th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link href={`/user/${obj.user_id._id}`}>
                  <p className="hover:underline">{obj.user_id.username}</p>
                </Link>
							</th>
							<td className="px-6 py-4">{currencyConverter(obj.profit)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</main>
	);
}

export default Leaderboard;
