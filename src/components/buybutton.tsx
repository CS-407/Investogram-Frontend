'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContextProvider } from '@/context/AuthContext';

export interface BuySellButtonProps {
    stock_id: string;
}

export default function BuyButton(props: BuySellButtonProps) {

    const stockId = props.stock_id;

    const executeBuy = async () => {
        fetch('http://localhost:8080/api/stock/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stock_id: stockId,
                stock_price_id: stockPriceId,
                no_of_shares: orderAmt,
                amount_usd: orderAmt * price.stock_price,
                buy: true
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.msg === "Success") {
                setBuySuccess(true);
            } else {
                setBuyFail(true);
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
        currentBalance: 500
    }

    function availableBalance() {
        return mockUser.currentBalance - (orderAmt * (price ? price : 0))
    }

    function decreaseButton() {
        if (orderAmt > 0) {
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
        if (availableBalance() - (price ? price : 0) >= 0) { // Enough funds
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

    function selectSection() {
        if (availableBalance() < 0) {
            return <div className="text-sm p-1">Insufficient funds</div>
        } else {
            if (orderAmt > 0) {
                return ( 
                    <div className='flex-col py-2 px-2'>
                        <button 
                        className="flex-row items-center justify-center px-4 py-2 text-2xl font-semibold leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
                        onClick={
                            () => {
                                console.log("Buying stock")
                                executeBuy();
                            }
                        }
                        >
                            <div className='flex justify-center'>
                                Buy
                                <div className='pl-2 italic'> {stock && stock.stock_ticker} </div>
                            </div>
                            <div className="flex-row font-normal italic text-xs p-1">{orderAmt} shares for ${(orderAmt * (price ? price : 0)).toFixed(2)}</div>
                        </button>
                        
                    </div>
                )
            }
        }
    }

    const [buySuccess, setBuySuccess] = useState(false);
    const [buyFail, setBuyFail] = useState(false);

    if (buySuccess) {
        return (
            <div className="inline-block border-solid rounded-md border-2 bg-green-500 align-middle text-center">
                <div className='text-lg font-bold text-white p-2'>Buy Success</div>
            </div>
        )
    } else {
        return (
        <main>
            <div className="inline-block border-solid rounded-md border-2 border-green-500 align-middle text-center">
                <div className="flex font-bold text-2xl p-1">
                    Buy {stock ? stock.stock_name : ''} (
                        <div className='italic'>{stock ? stock.stock_ticker : ''}</div>
                    )
                </div>
                {amtButtons()}
                {selectSection()}
                <div className="text-sm p-1">${availableBalance().toFixed(2)} left to spend</div>
                {buyFail && <div className="text-sm p-1 text-red-500">ERROR: Stock Buy Failure</div>}
            </div>
        </main>
        )
    }
  }
  