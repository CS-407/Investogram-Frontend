"use client";
import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { BASE_URL } from "../../util/globals";
import { FollowButtonProps } from "./acceptFollowButton";

export default function RejectFollowButton(props: FollowButtonProps) {
	const otherUser = props.otherUser;
	const updateStatus = props.updateStatus;

	const { rejectFollowRequest } = useContext(AuthContext);

	const rejectUser = async () => {
		try {
			await rejectFollowRequest(otherUser);
			updateStatus(otherUser, true);
		} catch (err: any) {
			console.log(err);
			updateStatus(otherUser, false);
		}
	};

	return (
		<button
			className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-red-500 hover:border-red-500 focus:outline-none"
			onClick={() => rejectUser()}
		>
			Reject
		</button>
	);
}
