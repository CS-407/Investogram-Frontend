"use client";

import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import { StockList, User } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ListPage = () => {
	const [list, setList] = useState<StockList>();

	const params = usePathname();
	const listId = params ? params.split("/")[2] : "";

    useEffect(() => {
		axios
			.get(`${BASE_URL}/api/list/get/${listId}`)
			.then((response) => {
				setList(response.data);
			})
			.catch((err) => {
				alert("Error getting list");
			});
	}, []);


    const StocksSection = () => {
        if (list?.stocks.length === 0) return <p>No stocks</p>;
        return (
            <div>
                {list?.stocks.map((stock) => {
                    return (
                        <Link href={`/stock/${stock._id}`}>
                            <div className="flex flex-row hover:underline">
                                <h3 className="font-bold px-1">{stock.stock_ticker}</h3>
                                <p>{stock.stock_name}</p>
                            </div>
                        </Link>
                        
                    );
                })
                }
            </div>
        );
    }

    if (list === null || list === undefined) return <div>Loading...</div>;
	return (
		<div>
            <h1 className="text-2xl font-bold">{list?.list_name}</h1>
            <Link href={`/user/${list?.list_owner._id}`}>
                <h3 className="text-large underline">{list?.list_owner.username}</h3>
            </Link>
            <div>
                <h2 className="text-xl font-bold">Stocks:</h2>
                <StocksSection />
            </div>
		</div>
	);
};

export default ListPage;
