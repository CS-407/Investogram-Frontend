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
		<div className="text-center">
			<h1
				className="text-2xl font-bold mt-4"
				style={{ backgroundColor: "#FDE698", padding: "20px" }}
			>
				Your Followers
			</h1>
			<p className="text-lg mb-2" style={{ color: "#364F6B", padding: "20px" }}>
				You are being followed by <strong>{followersList.length}</strong> user
				{followersList.length === 1 ? "" : "s"}
			</p>
			<ul className="list-none" style={{ padding: "20px" }}>
				{followersList.map((usr) => (
					<li
						id={usr._id}
						className="mb-2 p-2 bg-gray-100 rounded-lg shadow-sm"
					>
						{usr.username}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Followers;
