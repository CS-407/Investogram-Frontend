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
<>
<h1 className="text-2xl font-bold mt-4" style={{backgroundColor: "#FDE698", padding: "20px"}}>Your Followers</h1>
<p className="text-lg mb-2" style={{color: "#364F6B", padding: "20px"}}>Users You Follow: {followingList.length}</p>
<ul className="list-none" style={{padding: "20px"}}>
	{
		followingList.map((usr) =>
			<li id={usr._id} className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
				{usr.username} 
			</li>
		)
	}
</ul>
</>
	);
};

export default Following;
