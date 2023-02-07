'use client';

import { useState } from 'react';

export default function BuyButton() {

    const mockUser = {
        currentBalance: 250
    }

    const mockStock = {
        name: "Apple",
        ticker: "AAPL",
        price: 100
    }

    const [orderAmt, setOrderAmt] = useState(0);

    function availableBalance() {
        return mockUser.currentBalance - (orderAmt * mockStock.price)
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
        if (availableBalance() - mockStock.price >= 0) { // Enough funds
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
                        onClick={() => console.log("buy")}
                        >
                            <div className='flex justify-center'>
                                Buy
                                <div className='pl-2 italic'> {mockStock.ticker} </div>
                            </div>
                            <div className="flex-row font-normal italic text-xs p-1">{orderAmt} shares for ${(orderAmt * mockStock.price).toFixed(2)}</div>
                        </button>
                        
                    </div>
                )
            }
        }
    }


    return (
      <main>
        <div className="inline-block border-solid rounded-md border-2 border-green-500 align-middle text-center">
            <div className="flex font-bold text-2xl p-1">
                Buy {mockStock.name} (
                    <div className='italic'>{mockStock.ticker}</div>
                )
            </div>
            {amtButtons()}
            {selectSection()}
            <div className="text-sm p-1">${availableBalance().toFixed(2)} left to spend</div>
        </div>
      </main>
    )
  }
  