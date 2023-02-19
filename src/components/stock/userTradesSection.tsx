'use client';

import { TransactionType } from '@/types/TransactionType';
import { currencyConverter, dateConverter, dateToString } from '@/util/HelperFunctions';
import { useState } from 'react';

export default function UserTradesSection() {

    const mockStock = {
        name: "Apple",
        ticker: "AAPL"
    }

    const mockSell: TransactionType = {
        id: "63e2e0af9a8984024ed336f0",
        user_id: "63dd552ebafd3a998d66b5ee",
        stock_id: "63dd56f0f7c1c8cf06522dca",
        stock_price_id: "63dd56e4f7c1c8cf06522dc9",
        current_price: 100,
        no_of_shares: 2,
        amount_usd: 10,
        timestamp: 1675813038867,
        post_id: "63e2e0ae9a8984024ed336ee",
        buy: false
    }

    const mockBuy: TransactionType = {
        id: "63e2e0af9a8984024ed336f0",
        user_id: "63dd552ebafd3a998d66b5ee",
        stock_id: "63dd56f0f7c1c8cf06522dca",
        stock_price_id: "63dd56e4f7c1c8cf06522dc9",
        current_price: 100,
        no_of_shares: 2,
        amount_usd: 10,
        timestamp: 1675813038867,
        post_id: "63e2e0ae9a8984024ed336ee",
        buy: true
    }

    const mockTrades = [mockSell, mockBuy]

    function TradeRow(props: any) {
        let trade = props.props
        return (
            <div className='flex justify-between'>
                <div>
                    <div className='font-bold'> {mockStock.name} {trade.buy ? "Bought" : "Sold"} </div>
                    <div className='text-sm'> {dateToString(dateConverter(trade.timestamp))}</div>
                </div>
                <div className='text-right'>
                    <div className='font-bold'>${currencyConverter(trade.amount_usd)}</div>
                    <div className='text-sm'>{trade.no_of_shares} share{trade.no_of_shares > 1 ? "s":""} at ${currencyConverter(trade.current_price)}</div>
                </div>
            </div>
        )
    }
    
    
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
                {mockTrades.map(tradeObj => 
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
  