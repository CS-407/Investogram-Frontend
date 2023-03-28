'use client';
import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";
import { usePathname } from 'next/navigation';

export default function stock() {

    const params = usePathname();
    const stockId = params ? params.split("/")[2] : "";

    return (
      <main className="">
        <div className="underline">stock page</div>
        <p>{stockId}</p>
        <div className="flex">
          <div className="w-4/5">
            <StockGraph stockId={stockId} />
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
        
        <UserTradesSection stockId={stockId} />
      </main>
    )
  }
  