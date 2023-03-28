import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";

export default function stock() {
    return (
      <main className="">
        <div className="underline">stock page</div>
        <div className="flex">
          <div className="w-4/5">
            <StockGraph />
          </div>
          <div className="py-auto">
            <div className="py-2">
              <BuyButton />
            </div>
            <div className="py-2">
              <SellButton />
            </div>
          </div>
        </div>
        
        
        <UserTradesSection />
      </main>
    )
  }
  