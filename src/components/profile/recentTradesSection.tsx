'use client';

import { TradeRow } from "@/components/transaction/tradeRow"
import { useEffect, useState } from "react"

export default function RecentTradesSection() {


    const mockStockId = "63dd56b9f7c1c8cf06522dc8" // Remove this later
    const mockUserId = "63dd552ebafd3a998d66b5ee" // Swap this in for props

    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/trades/${mockUserId}/${mockStockId}`) // Update to real endpoint
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let trades = data.data
                trades.sort(function(a: any, b:any) { return Date.parse(b.timestamp) - Date.parse(a.timestamp) })
                setTrades(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])

    const [trades, setTrades] = useState([])
    const [showAll, setShowAll] = useState(false)

    const lessTrades = trades.slice(0, 1)

    function Divider() {
        const dividerStyle = 'border-b-2 border-gray-300 my-1'
        return (
            <div className={dividerStyle}> </div>
        )
    }

    let tradesToDisplay = showAll ? trades : lessTrades

    return (
        <div>
            <div className='font-semibold text-lg'>Your most recent trades:</div>
            <Divider />
            <div>
                {tradesToDisplay.map(tradeObj => 
                    <div>
                        <TradeRow props={tradeObj} />
                        <Divider />
                    </div>
                )
                }
            </div>
            <div className="flex justify-center">
                <button 
                    className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
                    onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "Show All Trades" }
                </button>
            </div>
        </div>
            
    )
  }
  