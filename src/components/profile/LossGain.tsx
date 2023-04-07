'use client';

import { TransactionType } from "@/types/TransactionType";
import { currencyConverter } from "@/util/HelperFunctions";
import { useEffect, useState } from "react"

export default function LossGainSection() {

    const mockUser = "63e8451d540fd8c730cb98b4"

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/trades/${mockUser}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let trades = data.data
                trades.sort(function(a: any, b:any) { return Date.parse(b.timestamp) - Date.parse(a.timestamp) })
                console.log(data.Data)
                setTrades(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])

    const [trades, setTrades] = useState<TransactionType[]>([])

    const totalRevenue = () => {
        if (trades.length > 0) {
            let sells = trades.filter((trade: TransactionType) => trade.buy === false)
            let revenue = sells.reduce((total: number, item: TransactionType) => total + item.amount_usd, 0)
            return [currencyConverter(revenue), sells.length]
        } else {
            return ["0", 0]
        }
    }
    const totalLoss = () => {
        if (trades.length > 0) {
            let buys = trades.filter((trade: TransactionType) => trade.buy === true)
            let loss = buys.reduce((total: number, item: TransactionType) => total + item.amount_usd, 0)
            return [currencyConverter(loss), buys.length]
        } else {
            return ["0", 0]
        }
    }

    const profit = trades ? currencyConverter(Number(totalRevenue()[0]) - Number(totalLoss()[0])) : 0;

    if (trades.length > 0) {
        return (
            <div className="flex">
                <div className="flex-col px-1">
                    <div className='font-semibold text-lg'>Total Loss:</div>
                    <div className="">
                        <div className='text-2xl font-semibold text-red-500'>${totalLoss()[0]}</div>
                    </div>
                    
                </div>
                <div className="flex-col px-1">
                    <div className='font-semibold text-lg'>Total Profit:</div>
                    <div className={`text-2xl font-semibold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${profit}</div>
                </div>
                
            </div>
        );
    } else {
        return (
            <div>
                <div>Loading Data...</div>
            </div>   
        )
    }
}