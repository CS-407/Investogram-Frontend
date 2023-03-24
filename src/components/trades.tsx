import React, { useEffect, useState } from "react";

const Trades = () => {
	const [trades, setTrades] = useState<any>({});

    useEffect(() => {
        fetch("http://localhost:5000/api/user/trades", {
            method: "GET",
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlODQ1MWQ1NDBmZDhjNzMwY2I5OGI0In0sImlhdCI6MTY3NzI2NzgyMywiZXhwIjoxNjc3MjcxNDIzfQ.xabL3dMzEd6G0l2lB3q7QBDOcbgY_foD7Ah6oeBFCbY"
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
