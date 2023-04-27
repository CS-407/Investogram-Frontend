"use client";

import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import { currencyConverter } from "@/util/HelperFunctions";
import { Leaderboard } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
	const [filteredLeaderboard, setFilteredLeaderboard] = useState<Leaderboard[]>(
		[]
	);
	const [seeFollowing, setSeeFollowing] = useState<boolean>(false);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/global/leaderboard`)
			.then((res) => {
				setLeaderboard(res.data.leaderboard);

				const tmp: Leaderboard[] = [];

				res.data.leaderboard.forEach((obj: Leaderboard) => {
					if (user?.following_list.includes(obj.user_id._id.toString())) {
						tmp.push(obj);
					}
				});

				setFilteredLeaderboard(tmp);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	const handleSeeFollowing = () => {
		setSeeFollowing(!seeFollowing);
	};

	const allUsers = () => {
		return leaderboard.map((obj: Leaderboard) => (
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
		));
	};

	const filteredUsers = () => {
		return filteredLeaderboard.map((obj: Leaderboard) => (
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
		));
	};

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
					View the top performers of the week! Visit their profile by clicking
					on their username.
				</p>
			</div>
			<div className="relative overflow-x-auto m-3 p-2 text-center">
				
				{/* Toggle Button to Switch Between All Users and Following Users */}
				<label className="relative inline-flex items-center cursor-pointer">
					<input onChange={handleSeeFollowing} type="checkbox" value="" className="sr-only peer" />
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
						Only See Followers
					</span>
				</label>

				{/* Table displaying users on leaderboard */}
				<table className="table-auto mt-3 w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th className="px-6 py-3">Position</th>
							<th className="px-6 py-3">Username</th>
							<th className="px-6 py-3">Profit</th>
						</tr>
					</thead>
					<tbody>{seeFollowing ? filteredUsers() : allUsers()}</tbody>
				</table>
			</div>
		</main>
	);
}

export default Leaderboard;
