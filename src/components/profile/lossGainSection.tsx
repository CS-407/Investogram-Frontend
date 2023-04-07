'use client';

import { TransactionType } from "@/types/TransactionType";
import { BASE_URL } from "@/util/globals";
import { currencyConverter } from "@/util/HelperFunctions";
import { useEffect, useState } from "react"

interface LossGainSectionProps { 
    user_id: string;
}

export default function LossGainSection(props: LossGainSectionProps) {

    const user_id = props.user_id

    useEffect(() => {
        fetch(`${BASE_URL}/api/user/trades/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
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
                    <div className='font-semibold text-lg'>Total Revenue:</div>
                    <p className="text-sm">How much stock has been sold on the app.</p>
                    <div className="">
                        <div className='text-2xl font-semibold text-green-500'>${totalRevenue()[0]}</div>
                        <div className='text-sm font-semibold text-green-500'>on {totalRevenue()[1]} trades</div>
                    </div>
                </div>
                <div className="flex-col px-1">
                    <div className='font-semibold text-lg'>Total Loss:</div>
                    <p className="text-sm">How much stock has been bought on the app.</p>
                    <div className="">
                        <div className='text-2xl font-semibold text-red-500'>${totalLoss()[0]}</div>
                        <div className='text-sm font-semibold text-red-500'>on {totalLoss()[1]} trades</div>
                    </div>
                    
                </div>
                <div className="flex-col px-1">
                    <div className='font-semibold text-lg'>Total Profit:</div>
                    <p className="text-sm">Revenue - losses.</p>
                    <div className={`text-2xl font-semibold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${profit}</div>
                    <div className={`text-sm font-semibold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>on {trades.length} trades</div>
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
  