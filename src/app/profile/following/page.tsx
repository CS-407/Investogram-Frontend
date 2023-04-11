"use client";
import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "src/util/globals";

import axios from "axios";

const Following = () => {
	const [followingList, setFollowingList] = useState<Partial<User>[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/following`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setFollowingList(response.data.following);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []); // Added an empty dependency array to ensure the useEffect hook is only executed once on component mount.

	return (
		<div>
			<h1 className="text-2xl font-bold mt-4">Users You Follow</h1>
			<p>Number of following: {followingList.length}</p>
			<ul>
				{
					followingList.map((usr) =>
						<li id={usr._id}>{usr.username}</li>
					)
				}
			</ul>
		</div>
	);
};

export default Following;
