"use client";

import { User } from "@/util/types";
import React, { useEffect, useState } from "react";
import AcceptFollowButton from "./acceptFollowButton";
import RejectFollowButton from "./rejectFollowButton";

import { BASE_URL } from "../../util/globals";

import axios from "axios";

const initialUsers: Partial<User>[] = [
	{ _id: "1", username: "user1" },
	{ _id: "2", username: "user2" },
	{ _id: "3", username: "user3" },
];

const FollowRequests = () => {
	const [followRequests, setFollowRequests] =
		useState<Partial<User>[]>(initialUsers);

	useEffect(() => {
	    axios.get(`${BASE_URL}/api/user/requests`, {
	        headers: {
	            "Authorization": "Bearer " + localStorage.getItem("token")
	        }
	    })
	    .then(response => {
	        const data = response.data;
	        setFollowRequests(data.users);
	    })
	    .catch(err => {
	        if (err.response && err.response.data && err.response.data.msg) {
				alert(err.response.data.msg);
			} else {
				alert("Trouble contacting server");
			}
	    });
	}, []);

	return (
		<div className="flex flex-col text-center w-full">
			<div className="mt-4 mb-2 font-bold">
				{followRequests.length == 0
					? "No follow requests"
					: "You have follow requests"}
			</div>
			{followRequests?.map((usr) => (
				<div
					className="max-w-sm p-2 w-full m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-between align-center"
					key={usr._id}
				>
					<p className="font-medium">{usr.username}</p>
					<div className="flex flex-row">
						<AcceptFollowButton id={usr._id} />
						<RejectFollowButton id={usr._id} />
					</div>
				</div>
			))}
		</div>
	);
};

export default FollowRequests;
