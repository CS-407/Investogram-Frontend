'use client';

import AcceptFollowButton from "@/components/acceptFollowButton";
import FollowRequests from "@/components/profile/followRequests";
import RejectFollowButton from "@/components/rejectFollowButton";
import Link from "next/link";
import RecentTradesSection from "../../components/profile/recentTradesSection";

export default function profile() {

  return (
    <main className="">
      <div>profile</div>
			<FollowRequests />
    </main>
  )
}
