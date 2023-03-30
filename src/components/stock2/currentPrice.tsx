'use client';

import { useEffect, useState } from "react"

export default function CurrentPrice() {

    const mockStockId = "63dd56b9f7c1c8cf06522dc8"

    const [price, setPrice] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/stock/price/${mockStockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let price = data.data
                //console.log(price);
                setPrice(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])


    return (
        <div>
            <div className='font-semibold text-lg'>Current price of this stock:</div>
            {price.map((priceObj) => 
                <div key={priceObj._id}>{priceObj.current_price}</div>
            )
            }
        </div>
    )

}