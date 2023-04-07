import RecentTradesSection from "../../components/profile/recentTradesSection";
import LossGainSection from "@/components/profile/LossGain";

export default function profile() {

  return (
    <main className="">
      <div>Profile</div>
      <div>Losses and Profits:</div>
      <LossGainSection />
    </main>
  )
}
