"use client";

import Link from "next/link";

import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";

export default function profile() {
	return (
		<main className="">
			<Link href={"/profile/requests"}>See Follow Requests</Link>
			<div>profile</div>
			{/* <RecentTradesSection /> */}
			<div className="flex">
				{/* <LossGainSection /> */}
			</div>
			<div className="flex">
				{/* <LossGainSection /> */}
			</div>
		</main>
	);
}
