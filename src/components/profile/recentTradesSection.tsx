'use client';

import { TradeRow } from "@/components/transaction/tradeRow"
import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useEffect, useState } from "react"
import { TradeList } from "../transaction/tradeList";

interface RecentTradesSectionProps {
    user_id: string
}

export default function RecentTradesSection(props: RecentTradesSectionProps) {

    const user_id = props.user_id

    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/trades/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        .then(res => {
            const data = res.data;
            
            let trades = data.data;
            trades.sort(function(a: any, b:any) { return Date.parse(b.timestamp) - Date.parse(a.timestamp) });
            setTrades(data.data);
        })
        .catch(err => {
            if (err.response && err.response.data && err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert("Trouble contacting server");
            }
        });
    },[])

    const [trades, setTrades] = useState([])

    return (
        <div>
            <div className='font-semibold text-lg'>Your most recent trades:</div>
            <TradeList trades={trades}/>
        </div>
            
    )
  }
  