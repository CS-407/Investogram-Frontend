'use client';

import { useEffect, useState } from "react"
export default function Purchases() {
    const mockStockId = "63dd56b9f7c1c8cf06522dc8"

    const [purchase, setPurchase] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/stock/purchases/${mockStockId}`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let purchase = data.data
                //console.log(purchase);
                setPurchase(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])




    return (
        <div>
            <div className='font-semibold text-lg'>Number of Purchases of this stock:</div>
            {purchase.map((purchaseObj, index) => 
                <div key={index}>{purchaseObj.purchases}</div>
            )
            }
        </div>
    )

}