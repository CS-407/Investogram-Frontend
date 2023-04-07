'use client';

import React, { useEffect, useState } from "react";
import { Stock } from '../../util/types';

export default function VariousStocks() {

    const [stockData, setStockData] = useState<Partial<Stock>[]>([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/global/variousStocks`)
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
                </tr>
            {stockData.map((stock: Partial<Stock>) => (
                <tr key={stock._id}>
                    <td align="center">{stock.stock_name}</td>
                    <td align="center">{stock.stock_ticker}</td>
                </tr>
            )
            )
            }
            </tbody>
        </div>
    )

    /*
     */

}