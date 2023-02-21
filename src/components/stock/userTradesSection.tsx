'use client';

import { TransactionType } from '@/types/TransactionType';
import { currencyConverter, dateConverter, dateToString } from '@/util/HelperFunctions';
import { useEffect, useState } from 'react';
import { TradeRow } from '../transaction/tradeRow';

export default function UserTradesSection() {

    const mockStockId = "63dd56b9f7c1c8cf06522dc8"
    const mockUserId = "63e8451d540fd8c730cb98b4"

    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/trades/${mockUserId}/${mockStockId}`)
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
    
    function Divider() {
        const dividerStyle = 'border-b-2 border-gray-300 my-1'
        return (
            <div className={dividerStyle}> </div>
        )
    }

    return (
        <div>
            <div className='font-semibold text-lg'>Your most recent trades for this stock:</div>
            <Divider />
            <div>
                {trades.map(tradeObj => 
                    <div>
                        <TradeRow props={tradeObj} />
                        <Divider />
                    </div>
                )
                }
            </div>
        </div>
            
    )
  }
  