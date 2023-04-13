"use client";
import axios from "axios";
import { BASE_URL } from "../../util/globals";
import { FollowButtonProps } from "./acceptFollowButton";

export default function RejectFollowButton(props: FollowButtonProps) {
	const otherUser = props.otherUser;
	const updateStatus = props.updateStatus;

	const rejectUser = () => {
		axios
			.post(`${BASE_URL}/api/user/follow/reject/${otherUser}`, null, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
				updateStatus(otherUser, true);
			})
			.catch((err) => {
				updateStatus(otherUser, false);
			});
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
