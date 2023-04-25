"use client";

import { StockRow } from "@/components/stock/stockRow";
import AuthContext from "@/context/AuthContext";
import UserContext from "@/context/UserContext";
import { BASE_URL } from "@/util/globals";
import { StockList, User } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ListPage = () => {
	const [list, setList] = useState<StockList>();

    const { user } = useContext(AuthContext)

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
                {list?.stocks.map((stock) => (
                    <StockRow stock={stock} />
                ))}
            </div>
        );
    }

    if (list === null || list === undefined) return <div>Loading...</div>;
	return (
		<div>
            <div className="flex flex-row">
                <h1 className="text-2xl font-bold my-auto">{list?.list_name}</h1>
                <Link href={`/editlist/${listId}`}>
                    <button
                        className="block w-42 h-12 my-2 mx-4 p-1 bg-blue-500 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500" 
                    >
                        Edit List
                    </button>
                </Link>
                
            </div>
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
