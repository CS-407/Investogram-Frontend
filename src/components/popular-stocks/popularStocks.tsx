'use client';

import { useEffect, useState } from "react"
export default function PopularStocks() {

    const [stockData, setStockData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/stock/popularstocks`)
        .then(res => res.json())
        .then(data => {
            if (data.msg === "Success") {
                let stockData = data.data
                //console.log(stockData);
                setStockData(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[])




    return (
        <div>
            <tbody>
                <tr>
                    <th align="center">  Stock Name  </th>
                    <th align="center">  Stock Ticker  </th>
                    <th align="center">  (Transactions)  </th>
                </tr>
            {stockData.map((stockObj, index) => 
                <tr key={index}>
                    <td align="center">{stockObj._id.stock_name}</td>
                    <td align="center">{stockObj._id.stock_ticker}</td>
                    <td align="center">{stockObj.totalTransactions}</td>
                </tr>
            )
            }
            </tbody>
        </div>
    )

    /*
     */

}