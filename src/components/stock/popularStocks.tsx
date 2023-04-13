"use client";

import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react"
import axios from "axios";
import { Stock } from "../../util/types";
import { PopularStock } from "../../util/types";

export default function PopularStocks() {

    const [stockData, setStockData] = useState<Partial<PopularStock>[]>([]);
    //const [stockData, setStockData] = useState([]);

    useEffect(() => {
        axios
        .get(`${BASE_URL}/api/stock/popularstocks`)
        .then((response) => {
            const data = response.data;
            if (data.msg === "Success") {
                let stockData = data.data
                //console.log(stockData);
                setStockData(data.data)
            } else {
                console.log("Error")
                console.log(data)
            }
        })
    },[]);




    return (
        //<div>
            <tbody>
                <tr>
                    <th align="center">  Stock Name  </th>
                    <th align="center">  Stock Ticker  </th>
                    <th align="center">  (Transactions)  </th>
                </tr>
            {stockData.map((stockObj, index) => 
                <tr key={index}>
                    <td align="center">{stockObj._id?.stock_name}</td>
                    <td align="center">{stockObj._id?.stock_ticker}</td>
                    <td align="center">{stockObj.totalTransactions}</td>
                </tr>
            )
            }
            </tbody>
        //</div>
    )

}