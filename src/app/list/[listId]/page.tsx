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
			.get(`${BASE_URL}/api/list/get/${listId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
			.then((response) => {
				setList(response.data);
			})
			.catch((err) => {
                if (err.response && err.response.data && err.response.data.msg) {
                    console.log(err.response.data.msg);
                } else {
                    console.log("Trouble contacting server");
                }
				alert("Error getting list");
			});
	}, []);

    const StocksSection = () => {
        if (list?.stocks.length === 0) return <p>No stocks</p>;
        return (
            <div className="bg-investogram_yellow rounded-lg m-3 p-3">
                <h3 className="text-2xl font-bold my-auto m-5 p-1 text-investogram_navy">Stocks:</h3>
                {list?.stocks.map((stock) => (
                    <StockRow stock={stock} />
                ))}
            </div>
        );
    }

    if (list === null || list === undefined) return <div>Loading...</div>;
    if (!user) return <div>You must be logged in to view lists</div>
    if (!list.list_owner.followers_list.includes(user._id) && list.list_owner._id !== user._id) return (
        <div className="text-center">
            <h1 className="text-4xl font-bold">You are not authorized to view this list</h1>
            <h2 className="text-xl">You must follow the list owner to view this list.</h2>
        </div>
    )
	return (
		<div>
            <div className="flex flex-row">
                <h1 className="text-2xl font-bold my-auto m-5">{list?.list_name}</h1>
                {user?._id === list?.list_owner._id && (

                    <div className="px-4 py-2 m-5">
                    <Link href={`/editlist/${listId}`}>
                        <p className="inline-block bg-gray-200 hover:bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        ⚙︎ Edit List
                        </p>
                    </Link>
                </div>
                )}
                
            </div>
            <Link href={`/user/${list?.list_owner._id}`}>
                <h1 className="text-sm text-gray-800 font-bold m-5 mb-2">
					Posted by <p className="inline bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-1 mr-2">{list?.list_owner.username}
                    </p>
				</h1>
                
            </Link>
            <div>
                <StocksSection />
            </div>
		</div>
	);
};

export default ListPage;
