'use client';

import { useState } from 'react';

export default function BuyButton() {

    const mockUser = {
        currentBalance: 1000
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
                <button className="px-2 bg-black text-white rounded-full" onClick={() => setOrderAmt(orderAmt - 1)}>-</button>
            )
        }
    }
    
    function increaseButton() {
        if (availableBalance() - mockStock.price >= 0) { // Enough funds
            return (
                <button className="px-2 bg-black text-white rounded-full" onClick={() => setOrderAmt(orderAmt + 1)}>+</button>
            )
        }
    }

    function amtButtons() {
        
        return(
            <div className='flex justify-center'>
                {decreaseButton()}
                <div className='px-4'>{orderAmt}</div>
                {increaseButton()}
            </div>
        )
    }

    function selectSection() {
        if (availableBalance() < 0) {
            return <div className="text-sm p-1">Insufficient funds</div>
        } else {
            return ( 
                <div className='px-2'>
                    <div className="text-sm p-1">{orderAmt} shares for ${(orderAmt * mockStock.price).toFixed(2)}</div>
                    <div className='bg-green-500 p-1 hover:-m-1 rounded-full text-white hover:bg-white hover:text-green-500 hover:border-2 hover:border-solid hover:border-green-500'>Buy</div>
                </div>
            )

        }
    }


    return (
      <main>
        <div className="inline-block border-solid rounded-md border-2 border-green-500 align-middle text-center">
            <div className="font-bold underline p-1">Buy {mockStock.name} ({mockStock.ticker})</div>
            {amtButtons()}
            {selectSection()}
            <div className="text-sm p-1">${availableBalance().toFixed(2)} left to spend</div>
        </div>
      </main>
    )
  }
  