"use client";

import LossGainSection from "@/components/profile/lossGainSection";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import { TradeInfo, User } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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
					curUser.following_list &&
					curUser.following_list.includes(response.data.user._id)
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
		<div className="flex flex-row">
			<div className="flex-none w-1/3 p-4">
				<h1 className="text-2xl font-bold mt-4">{user?.username}</h1>
				<div className="flex flex-row">
					<div className="text-gray-500 mt-2 w-1/2 p-1">
						<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							{user?.followers}
						</p>{" "}
						followers
					</div>
					<div className="text-gray-500 mt-2 w-1/2 p-1">
						<p className="inline bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							{user?.following}
						</p>{" "}
						following
					</div>
				</div>
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
			<div
				className="flex-grow w-2/3 p-4"
				style={{ backgroundColor: "#FDE698" }}
			>
				<div>
					{following ? (
						state?.trades && <LossGainSection trades={state.trades} />
					) : (
						<p className="text-2xl font-bold mt-4">Follow to see trades</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default User;
