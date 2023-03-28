'use client';

import React, { useEffect, useState } from "react";

import { Stock } from '../../util/types';

const SearchStock = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/stocks').then(res => {
            return res.json();
        }).then(data => {
            setStocks(data);
            setFilteredStocks(data);
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
            <div>
                {filteredStocks.map((stock: Stock) => (
                    <div>
                        {stock.stock_name} || {stock.stock_ticker}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchStock;
