"use client";

import React, { useEffect, useState } from "react";
import { StockList } from "../../util/types";
import axios from "axios";
import { BASE_URL } from "@/util/globals";
import Link from "next/link";

const ListPage = () => {
	const [lists, setLists] = useState<StockList[]>([]);
	const [listName, setListName] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListName(e.target.value);
	};

    useEffect(() => {
        axios.get(`${BASE_URL}/api/list`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLists(res.data.lists);
        }).catch(err => {
            if (err.response && err.response.data && err.response.data.msg) {
                console.log(err.response.data.msg);
            } else {
                console.log("Trouble contacting server");
            }
        });
    }, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		axios
			.post(
				`${BASE_URL}/api/list/create`,
				{
					listName: listName,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((res) => {
				setLists([res.data.list, ...lists]);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	};

	return (
		<div className="p-5">
			<div className="flex-none flex justify-center items-center flex-col rounded-lg shadow-lg bg-investogram_yellow py-4 text-investogram_navy mb-3">
				<h1 className="text-5xl font-bold mt-4 mb-4">InvestoLists</h1>
				<p className="text-investogram_navy">
					Click on a list to check it out or create your own!
				</p>
			</div>
		
		<div className="">
			<form className="mb-2 p-2 flex flex-row" onSubmit={handleSubmit}>
				<input
                    className="border rounded py-2 px-3 text-gray-700 mr-2"
					type="text"
					placeholder="New List Name..."
					onChange={handleChange}
				/>
				<button className="bg-investogram_navy hover:bg-gray-400 text-investogram_yellow py-2 px-4 rounded ml-3" type="submit">Create New List</button>
			</form>
			<h1 className="font-extrabold text-2xl leading-none tracking-tight text-gray-900 m-3">Lists</h1>
			<div className="flex flex-row flex-wrap">
				{lists?.map((list: StockList) => (
					<div className="m-2 flex flex-col border-rounded p-2" key={list._id}>
						<h2>{list.list_name}</h2>
						<p>{list.stocks.length} stocks</p>
                        <Link href={`/list/${list._id}`}>
                            Visit List Page
                        </Link>
					</div>
				))}
			</div>
		</div>
	</div>
	);
};

export default ListPage;
