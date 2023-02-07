import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";

export default function stock() {
    return (
      <main className="">
        <div className="underline">stock page</div>
        <BuyButton />
        <SellButton />
      </main>
    )
  }
  