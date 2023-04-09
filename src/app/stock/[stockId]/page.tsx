'use client';
import SellButton from "@/components/stock/sellbutton";
import BuyButton from "@/components/buybutton";
import UserTradesSection from "@/components/stock/userTradesSection";
import StockGraph from "@/components/stock/stockGraph";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { currencyConverter } from "@/util/HelperFunctions";

export default function stock() {

    const params = usePathname();
    const stockId = params ? params.split("/")[2] : "";

    const [stock, setStock] = useState<any>();
    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/get/${stockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let stockInfo = data.data
                console.log(stockInfo)
                setStock(stockInfo)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])
    const [price, setPrice] = useState<any>();
    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/price/${stockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let price = data.data[0]
                setPrice(price)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])


    return (
      <main className="">
        <h1 className="text-5xl font-bold">{stock ? `${stock.stock_name} (${stock.stock_ticker})` : ""}</h1>
        <h2 className="text-3xl">{price ? `$${currencyConverter(price.current_price)}` : ""}</h2>
        
        <div className="flex">
          <div className="w-4/5">
            <StockGraph stockId={stockId} />
          </div>
          <div className="py-auto">
            <div className="py-2">
              <BuyButton stock_id={stockId}/>
            </div>
            <div className="py-2">
              <SellButton stock_id={stockId}/>
            </div>
          </div>
        </div>
        
        <UserTradesSection stockId={stockId} />
      </main>
    )
  }
  