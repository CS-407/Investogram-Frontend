'use client';

import { useEffect, useState } from 'react';
import { BuySellButtonProps } from '../buybutton';

export default function SellButton(props: BuySellButtonProps) {

    const stockId = props.stock_id;

    const executeSell = async () => {
        fetch('http://localhost:8080/api/stock/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ""
            },
            body: JSON.stringify({
                stock_id: stockId,
                stock_price_id: stockPriceId,
                no_of_shares: orderAmt,
                amount_usd: orderAmt * price,
                buy: false
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.msg === "Success") {
                setSellSuccess(true);
            } else {
                setSellFail(true);
            }
        })
    };


    const [price, setPrice] = useState<any>();
    const [stockPriceId, setStockPriceId] = useState<any>();
    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/price/${stockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let price = data.data[0]
                setStockPriceId(price._id)
                setPrice(price.current_price)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])

    const [stock, setStock] = useState<any>();
    useEffect(() => {
        fetch(`http://localhost:8080/api/stock/get/${stockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let stockInfo = data.data
                setStock(stockInfo)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])


    const [orderAmt, setOrderAmt] = useState(0);

    const mockUser = {
        currentBalance: 1000,
        currentStockOwned: 10
    }

    function availableBalance() {
        return mockUser.currentBalance + (orderAmt * price)
    }

    function decreaseButton() {
        if (orderAmt > 0) { // Don't go below 0
            return (
                <button 
                className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
                onClick={() => setOrderAmt(orderAmt - 1)}>
                    -
                </button>
            )
        }
    }

    function increaseButton() {
        if (orderAmt+1 <= mockUser.currentStockOwned) { // Enough funds
            return (
                <button 
                className="flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none"
                onClick={() => setOrderAmt(orderAmt + 1)}>
                    +
                </button>
            )
        }
    }

    function amtButtons() {
        return(
            <div className='flex justify-center'>
                {decreaseButton()}
                <div className='px-4 text-2xl bold'>{orderAmt}</div>
                {increaseButton()}
            </div>
        )
    }

    function remainingStock() {
        let remaining = mockUser.currentStockOwned - orderAmt
        return (
            <div className="text-sm italic p-1">{remaining} shares left worth ${(remaining * price).toFixed(2)}</div>
             
        )
    }

    function selectSection() {
        if (orderAmt > 0) {
            return ( 
                <div className='flex-col items-center px-2'>
                    <button 
                    className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-red-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-red-500 hover:border-red-500 focus:outline-none"
                    onClick={() => {
                        executeSell();
                    }
                    }
                    >
                        Sell
                        <div className="flex-row font-normal text-xs italic p-1">Sell {orderAmt} shares for ${(orderAmt * price).toFixed(2)}</div>
                    </button>
                </div>
            )

        }
    }

    const [sellSuccess, setSellSuccess] = useState(false);
    const [sellFail, setSellFail] = useState(false);

    if (sellSuccess) {
        return (
            <div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
                <div className='text-lg font-bold text-white p-2'>Sell Success</div>
            </div>
        )
    } else {
        return (
        <main>
            <div className="inline-block border-solid rounded-md border-2 border-red-500 align-middle text-center">
                <div className="flex font-bold text-2xl p-1">
                    Sell {stock ? stock.stock_name : ''} (
                        <div className='italic'>{stock ? stock.stock_ticker : ''}</div>
                    )
                </div>
                {amtButtons()}
                {remainingStock()}
                {selectSection()}
                <div className="text-sm p-1">${availableBalance().toFixed(2)} in account balance</div>
                {sellFail && <div className="text-sm p-1 text-red-500">ERROR: Stock Buy Failure</div>}
            </div>
        </main>
        )
    }
  }
  