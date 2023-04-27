"use client";

import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/util/globals";
import axios from "axios";
import { useContext } from "react";

export interface FollowButtonProps {
	otherUser: string;
	updateStatus: Function;
}

export default function AcceptFollowButton(props: FollowButtonProps) {
	const otherUser = props.otherUser;
	const updateStatus = props.updateStatus;

	const { acceptFollowRequest } = useContext(AuthContext);

	const followUser = async () => {
		try {
			await acceptFollowRequest(otherUser);
			updateStatus(otherUser, true);
		} catch (err: any) {
			console.log(err);
			updateStatus(otherUser, false);
		}
	};

	return (
		<button
			className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
			onClick={() => followUser()}
		>
			Accept
		</button>
	);
}
