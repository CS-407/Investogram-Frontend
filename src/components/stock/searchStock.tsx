'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Stock } from '../../util/types';
import "./stockStyles.css";

const SearchStock = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/global/stocks').then(res => {
            return res.json();
        }).then(data => {
            setStocks(data.stocks);
            setFilteredStocks(data.stocks);
        }).catch(err => {
            alert('Trouble Contacting Server');
            console.log(err);
        })
    }, []);

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length == 0) {
			setFilteredStocks(stocks);
		} else {
			const filter = e.target.value.toLowerCase();
			const tmp = stocks.filter((stk) =>
				stk.stock_name.toLowerCase().startsWith(filter)
			);

			setFilteredStocks(tmp);
		}
	};

	return (
        <div>
            <input placeholder="Search for Stocks" onChange={handleFilter}></input>
            <div className="grid">
                {filteredStocks.map((stock: Stock) => (
                    <div className="card">
                        <p>{stock.stock_ticker}</p>
                        <p>{stock.stock_name}</p>
                        <Link href={`/stock/${stock._id}`}>Visit Stock Page</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchStock;
