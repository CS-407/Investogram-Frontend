"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { TradeInfo } from "@/util/types";
import { BASE_URL } from "@/util/globals";

import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";
import StocksOwned from "@/components/profile/stocksOwned";

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
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble Contacting Server");
				}
			});
	}, []);

	return (
		<div>
			<main className="p-5" style={{ backgroundColor: "#f5f5f5" }}>
				<div className="flex flex-row">
					<div className="flex-none w-1/3 p-4 flex justify-center items-center flex-col rounded-lg shadow-lg p-5 bg-investogram_lightblue">
						<img
							src={
								user
									? `/images/avatar_${user?.profile_pic}.png`
									: "/images/default_profile.jpg"
							}
							alt={`${user?.username}'s avatar`}
							className="flex-center rounded-full object-cover h-36 w-36"
						/>
						<h1
							className="text-2xl font-bold mt-4 mb-2"
							style={{ color: "#364F6B" }}
						>
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
							<div className="following" style={{ color: "#364F6B" }}>
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
							<button className="flex items-center justify-center mt-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
								<Link
									href={"/profile/requests"}
									style={{ textDecoration: "none" }}
								>
									See Follow Requests
								</Link>
								<span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-50 rounded-full">
									{user?.requests && user.requests.length}
								</span>
							</button>
						</div>
						<div className="flex flex-row p-1">
						<div className="text-black-500 mt-2 p-1">
							<button className="flex items-center justify-center mt-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
								<Link
									href={"/blog"}
									style={{ textDecoration: "none" }}
								>
									Blog
								</Link>
							</button>
						</div>
						
						<div className="text-black-500 mt-2 p-1">
							<button className="flex items-center justify-center mt-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
								<Link
									href={"/list"}
									style={{ textDecoration: "none" }}
								>
									Lists
								</Link>
							</button>
						</div>
						</div>

					</div>
					{/* useful metrics on profile	
								- remaining wallet
								- profit/loss
								- total value of stock */}
					<div
						className="flex-grow w-1/3 p-4 shadow-lg bg-white mx-auto align-middle rounded-lg ml-3"
						style={{ backgroundColor: "#FDE698" }}
					>
					<p className="text-investogram_navy mb-4 font-extrabold leading-none tracking-tight md:text-2xl lg:text-4xl dark:text-investogram_navy">
						User Stats
					</p>
						{state?.trades && user && (
							<LossGainSection
								monetaryInfo={state.monetary_info}
								stocks={state.stock_info}
								user={user!}
							/>
						)}
					</div>

				</div>
			</main>
			<div
				className="grid grid-cols-4 p-5"
				style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
			>
				<div
					className="col-span-2 p-5"
					style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
				>
					<p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-black">
						Trade History
					</p>
					{state?.trades && <RecentTradesSection trades={state.trades} />}
				</div>
				<div
					className="col-span-2 p-5"
					style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
				>
					<p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-black">
						Value of Stocks Owned
					</p>
					{state?.stock_info && <StocksOwned stocks={state.stock_info} />}
				</div>
				
					
			</div>
		</div>
	);
}
