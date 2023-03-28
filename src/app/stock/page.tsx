import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";

export default function stockPage() {
    return (
      <main className="">
        <div className="underline">stock page</div>
        <p>Go to a specific stock use "/[stockId]"</p>
      </main>
    )
  }
  