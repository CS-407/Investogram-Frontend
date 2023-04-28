"use client";

import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import { TradeInfo, User } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import RecentTradesSection from "@/components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";
import StocksOwned from "@/components/profile/stocksOwned";
import Link from "next/link";

const User = () => {
	const [user, setUser] = useState<User>();
	const [state, setState] = useState<TradeInfo>();
	const [following, setFollowing] = useState<boolean>(false);

	const authCtx = useContext(AuthContext);

	const curUser = authCtx.user;

	const params = usePathname();
	const uid = params ? params.split("/")[2] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/global/user/${uid}`)
			.then((response) => {
				setUser(response.data.user);
				if (
					curUser &&
					((curUser.following_list &&
						curUser.following_list.includes(response.data.user._id)) ||
						curUser._id === response.data.user._id)
				) {
					setFollowing(true);
				}
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					console.log(err.response.data.msg);
				} else {
					console.log("Trouble contacting server");
				}
			});
	}, []);

	useEffect(() => {
		if (following) {
			axios
				.get(`${BASE_URL}/api/user/trades/${user?._id}`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((res) => {
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
		}
	}, [following]);

	const handleFollowRequest = () => {
		axios
			.post(
				`${BASE_URL}/api/user/follow/${uid}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((res) => {
				alert(res.data.msg);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	};

	return (
		<div>
			<main
				className=""
				style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
			>
				<div className="flex flex-row">
					<div className="flex-none w-1/3 p-4 flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_lightblue p-5">
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
								<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">
									{user?.followers}
								</p>{" "}
								followers
							</div>
							<div className="following" style={{ color: "#364F6B" }}>
								<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">
									{user?.following}
								</p>{" "}
								following
							</div>
						</div>
						<div className="text-black-500 mt-2">
							<div className="text-gray-500 mt-2">
								{following ? (
									<p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										Following
									</p>
								) : user?.requests &&
								  curUser?._id &&
								  user.requests.includes(curUser?._id) ? (
									<p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										Requested
									</p>
								) : (
									<button
										className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
										onClick={handleFollowRequest}
									>
										Follow
									</button>
								)}
							</div>
						</div>
						{following && (
							<div className="flex flex-row p-1">
								<div className="text-black-500 mt-2 p-1">
									<button className="flex items-center justify-center mt-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
										<Link
											href={`/blog/user/${uid}`}
											style={{ textDecoration: "none" }}
										>
											Blog
										</Link>
									</button>
								</div>

								<div className="text-black-500 mt-2 p-1">
									<button className="flex items-center justify-center mt-2 px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
										<Link
											href={`/list/user/${uid}`}
											style={{ textDecoration: "none" }}
										>
											Lists
										</Link>
									</button>
								</div>
							</div>
						)}
					</div>
					<div
						className="flex-grow w-2/3 p-4 shadow-lg bg-white mx-auto align-middle rounded-lg"
						style={{ backgroundColor: "#FDE698", marginLeft: "20px" }}
					>
						<div>
							{following ? (
								state?.monetary_info &&
								user && (
									<LossGainSection
										monetaryInfo={state.monetary_info}
										stocks={state.stock_info}
										user={user!}
									/>
								)
							) : (
								<p
									className="text-2xl font-bold mt-4"
									style={{ color: "#364F6B", padding: "20px" }}
								>
									Follow to view user's trade information
								</p>
							)}
						</div>
					</div>
				</div>
			</main>
			{following && (
				<div className="bg-investogram_dark_white">
					<div className="grid grid-cols-4 p-5">
						<div
							className="col-span-2"
							style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
						>
							<p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-black">
								Trade History
							</p>
							{state?.trades && <RecentTradesSection trades={state.trades} />}
						</div>
						<div
							className="col-span-2"
							style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
						>
							<p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-black">
								Value of Stocks Owned
							</p>
							{state?.stock_info && <StocksOwned stocks={state.stock_info} />}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
