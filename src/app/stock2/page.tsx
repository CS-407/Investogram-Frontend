import CurrentPrice from "@/components/stock2/currentPrice";
import Purchases from "@/components/stock2/purchases"

export default function stock() {
    return (
      <main className="">
        <div className="underline">stock page</div>
        <CurrentPrice />
        <Purchases />
      </main>
    )
  }