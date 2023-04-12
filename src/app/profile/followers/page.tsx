"use client";
import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "src/util/globals";

import axios from "axios";

const Followers = () => {
	const [followersList, setFollowersList] = useState<Partial<User>[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/user/followers`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setFollowersList(response.data.followers);
			})
			.catch((error) => {
				console.log(error);
				// alert("Trouble contacting server");
			});
	}, []);

	return (
		<>
			<h1 className="flex-none w-1/3 p-4 flex justify-center items-center flex-col text-2xl font-bold mt-1">
				Your Followers
			</h1>
			<p className="flex-none w-1/3 p-4 flex justify-center items-center flex-col text-2xl font-bold mt-1">
				Number of followers: {followersList.length}
			</p>
			<ul>
				{followersList.map((usr) => (
					<li id={usr._id}>{usr.username}</li>
				))}
			</ul>
		</>
	);
};

export default Followers;