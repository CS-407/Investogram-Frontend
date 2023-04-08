"use client";

import Link from "next/link";


import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";
import Followers from "./followers/page";
import Following from "./following/page";


export default function profile() {

	return (

		<main className="">
			<div className="flex flex-row">
			<div className="flex-center w-1/3 p-4">
			<img src={"public/default_profile.png"} alt={`${"Username"}'s avatar`} className="w-48 h-48 rounded-full" />
			<h1 className="text-2xl font-bold mt-4">{"Username"}</h1>
			<div className="flex flex-row">
				<div className="text-gray-500 mt-2 w-1/2 p-1">{ 
					<Link href={"/profile/followers"}> {} followers </Link>
					} 
				</div>
				<div className="text-gray-500 mt-2 w-1/2 p-1">{ 
					<Link href={"/profile/following"}> {} following</Link>
				} </div>
			</div>
				<div className="text-gray-200 mt-2">{
					<button className="flex items-center justify-center px-2 py-1 text-base font-small leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
						<Link href={"/profile/requests"}>See Follow Requests</Link>
					</button>
				}
				</div>
			</div>
			<div className="flex-grow w-2/3 p-4">
				<div>
				{<RecentTradesSection />}
				</div>
				<h1 className="text-4l font-bold mt-4">{"My Portfolio"}</h1>
			</div>

			
			</div>

		</main>
	);
}
