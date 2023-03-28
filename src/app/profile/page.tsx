'use client';

import AcceptFollowButton from "@/components/acceptFollowButton";
import RejectFollowButton from "@/components/rejectFollowButton";
import RecentTradesSection from "../../components/profile/recentTradesSection";

export default function profile() {

  return (
    <main className="">
      <div>profile</div>

      <RecentTradesSection />
      <div className='flex'>
        <AcceptFollowButton />
        <RejectFollowButton />
      </div>


    </main>
  )
}
