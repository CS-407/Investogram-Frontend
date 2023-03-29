"use client";

import Link from "next/link";
import RecentTradesSection from "../../components/profile/recentTradesSection";

export default function profile() {
	return (
		<main className="">
			<div>profile</div>
			<RecentTradesSection />
			<Link href={"/profile/requests"}>See Follow Requests</Link>
		</main>
	);
}
