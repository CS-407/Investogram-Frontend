'use client';

import RecentTradesSection from "@/components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/lossGainSection";
import { usePathname } from "next/navigation";

export default function profile() {

  const params = usePathname();
  const userId = params ? params.split("/")[2] : "";

  return (
    <main className="">
      <div>profile</div>
      <div className='flex'>
        <LossGainSection user_id={userId} />
      </div>

      <RecentTradesSection user_id={userId} />


    </main>
  )
}
