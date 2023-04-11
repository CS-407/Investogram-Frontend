"use client";

import Link from "next/link";

import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";

import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { Transaction, StockInfo, MonetaryInfo } from "@/util/types";
import axios from "axios";
import { BASE_URL } from "@/util/globals";

interface TradeInfo {
	trades: Transaction[];
	stock_info: StockInfo[];
	monetary_info: MonetaryInfo;
}

export default function profile() {
	const { user } = useContext(AuthContext);
	const [state, setState] = useState<TradeInfo>();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/trades/${user?._id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log("trades", res.data.trades);
				console.log("stock_info", res.data.stock_info);
				console.log("monetary_info", res.data.monetary_info);

				setState({
					trades: res.data.trades,
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
		<main className="" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
			<div className="flex flex-row">
				<div
					className="flex-none w-1/3 p-4 flex justify-center items-center flex-col"
					style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
				>
					<img
						src={"/images/default_profile.jpg"}
						alt={`${user?.username}'s avatar`}
						className={"flex-center"}
						style={{
							borderRadius: "50%",
							width: "150px",
							height: "150px",
							objectFit: "cover",
						}}
					/>
					<h1 className="text-2xl font-bold mt-4" style={{ color: "#364F6B" }}>
						{user?.username}
					</h1>
					<div className="flex flex-row">
						<div
							className={`followers`}
							style={{ marginRight: "10px", color: "#364F6B" }}
						>
							<button
								className={`button`}
								style={{
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									color: "#666",
								}}
							>
								<Link
									href={"/profile/followers"}
									style={{ textDecoration: "none" }}
								>
									<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										{user?.followers}
									</p>{" "}
									followers
								</Link>
							</button>
						</div>
						<div className={`following`} style={{ color: "#364F6B" }}>
							<button
								className={`button`}
								style={{
									border: "none",
									backgroundColor: "transparent",
									cursor: "pointer",
									color: "#666",
								}}
							>
								<Link
									href={"/profile/following"}
									style={{ textDecoration: "none" }}
								>
									<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										{user?.following}
									</p>{" "}
									following
								</Link>
							</button>
						</div>
					</div>
					<div className="text-black-500 mt-2">
						<button
							className={
								"flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
							}
						>
							<Link
								href={"/profile/requests"}
								style={{ textDecoration: "none" }}
							>
								See Follow Requests
							</Link>
						</button>
					</div>
				</div>
				<div
					className="flex-grow w-2/3 p-4"
					style={{ backgroundColor: "#FDE698" }}
				>
					<div>
						{state?.trades && <LossGainSection trades={state.trades} />}
					</div>
				</div>
			</div>
			{state?.trades && <RecentTradesSection trades={state.trades} />}
		</main>
	);
}
