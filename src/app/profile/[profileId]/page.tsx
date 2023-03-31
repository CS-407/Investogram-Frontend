'use client';

import RecentTradesSection from "@/components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";

export default function profile() {

  return (
    <main className="">
      <div>profile</div>
      <div className='flex'>
        <LossGainSection />
      </div>

      <RecentTradesSection />


    </main>
  )
}
