import { BASE_URL } from "@/util/globals";
import React, { useEffect, useState } from "react";

const Trades = () => {
	const [trades, setTrades] = useState<any>({});

    useEffect(() => {
        fetch(`${BASE_URL}/api/user/trades`, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            const dict: any = {};

            data.trades.forEach((trade: any) => {
                var stock_ticker = trade['stock_id']['stock_ticker'];
                
                if (!dict[stock_ticker]) {
                    dict[stock_ticker] = {};
                    dict[stock_ticker]['trades'] = 0;
                }

                dict[stock_ticker]['stock_name'] = trade['stock_id']['stock_name'];
                if (trade['buy']) {
                    dict[stock_ticker]['trades'] = dict[stock_ticker]['trades'] + trade['no_of_shares'];
                } else {
                    dict[stock_ticker]['trades'] = dict[stock_ticker]['trades'] - trade['no_of_shares'];
                }
            });

            setTrades(dict);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    return <div>
        {
            Object.keys(trades).map((key: any) => {
                return <div>
                    <h2>Stock: {trades[key]['stock_name']}</h2>
                    <p>Owned: {trades[key]['trades']}</p>
                </div>
            })
        }
    </div>;
};

export default Trades;
