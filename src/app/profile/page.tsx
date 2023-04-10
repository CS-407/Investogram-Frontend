"use client";

import Link from "next/link";

import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";

import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function profile() {
	const { user } = useContext(AuthContext);

	return (

		<main className="">
			<div className="flex flex-row">
				<div className="flex-none w-1/3 p-4">
					{/* <img src={"default_profile.png"} alt={`${user?.username}'s avatar`} className="w-48 h-48 rounded-full" /> */}
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
						{
							<button className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
								<Link href={"/profile/requests"}>See Follow Requests</Link>
							</button>
						}
					</div>
				</div>
				<div className="flex-grow w-2/3 p-4">
					<div>{/* <RecentTradesSection /> */}</div>
				</div>
			</div>
		</main>
	);
}
