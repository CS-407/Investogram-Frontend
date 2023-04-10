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
	const [requestsStatus, setRequestsStatus] = useState<any>({});
	const updateStatus = (id: string, success: boolean) => {
		setRequestsStatus((prev: any) => {
			return { ...prev, [id]: success ? "Success" : "Failure" };
		});
	}

	useEffect(() => {
	    axios.get(`${BASE_URL}/api/user/requests`, {
	        headers: {
	            "Authorization": "Bearer " + localStorage.getItem("token")
	        }
	    })
	    .then(response => {
	        const data = response.data;
	        setFollowRequests(data.users);
			data.users.forEach((usr: Partial<User>) => {
				setRequestsStatus((prev: any) => {
					return { ...prev, [usr._id!]: undefined };
				});
			})
	    })
	    .catch(err => {
	        if (err.response && err.response.data && err.response.data.msg) {
				alert(err.response.data.msg);
			} else {
				alert("Trouble contacting server");
			}
	    });
	}, []);

	const requestRow = (usr: Partial<User>) => {
		let uid = usr._id!;
		let buttonSection = (
			<div className="flex flex-row">
				<AcceptFollowButton otherUser={uid} updateStatus={updateStatus} />
				<RejectFollowButton otherUser={uid} updateStatus={updateStatus} />
			</div>
		);

		if (requestsStatus[uid] !== undefined) {
			if (requestsStatus[uid] === "Success") {
				buttonSection = (
					<div className="flex flex-row">
						<p className="p-1 bg-green-500 rounded-md">Success</p>
					</div>
				);
			} else { 
				buttonSection = (
					<div className="flex flex-row">
						<p className="p-1 bg-red-500 rounded-md">Failure</p>
					</div>
				)
			}
		}

		return (
			<div
				className="max-w-sm p-2 w-full m-3 text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-between align-center"
				key={usr._id}
			>
				<p className="font-medium my-auto">{usr.username}</p>
				<div className="flex flex-row">
					{buttonSection}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col text-center w-full">
			<div className="mt-4 mb-2 font-bold">
				{followRequests.length == 0
					? "No follow requests"
					: "You have follow requests"}
			</div>
			{followRequests?.map((usr) => (
				<div>{requestRow(usr)}</div>
			))}
		</div>
	);
};

export default FollowRequests;
