"use client";

import { BASE_URL } from "@/util/globals";
import { StockList, User } from "@/util/types";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserList = () => {
	const [lists, setLists] = useState<StockList[]>();
	const [listUser, setListUser] = useState<User>();

	const params = usePathname();
	const uid = params ? params.split("/")[3] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/list/getLists/${uid}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setLists(response.data.lists);
				setListUser(response.data.user);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble contacting server");
				}
			});
	}, []);

	return (
		<div className="p-3">
			{!lists && (
				<h1 className="font-extrabold text-2xl">Loading User's Lists...</h1>
			)}
			{listUser && (
				<h1 className=" font-extrabold text-3xl">
					{listUser?.username}'s Lists
				</h1>
			)}
			{lists && lists.length == 0 && (
				<h1 className="font-extrabold text-4xl">No Lists</h1>
			)}
			{lists && (
				<div className="m-3 flex flex-row flex-wrap">
					{lists.map((list) => {
						return (
							<div
								className="max-w-sm rounded overflow-hidden shadow-lg m-3"
								key={list._id}
							>
								<div className="px-4 py-2">
									<div className="font-bold text-l mb-2">{list.list_name}</div>
									<p className="text-gray-700 text-base text-sm">
										{list.stocks.length} stocks
									</p>
								</div>
								<div className="px-4 py-2">
									<Link href={`/list/${list._id}`}>
										<button className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-black border border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-black hover:border-black focus:outline-none">
											Visit List Page
										</button>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default UserList;
