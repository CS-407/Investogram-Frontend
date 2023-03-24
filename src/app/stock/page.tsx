import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";

export default function stock() {
    return (
      <main className="">
        <div className="underline">stock page</div>
        {/* <BuyButton /> */}
        <BuyButton />
      </main>
    )
}