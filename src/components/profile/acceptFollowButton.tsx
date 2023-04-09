'use client';

import { BASE_URL } from "@/util/globals";
import axios from "axios";

export interface FollowButtonProps {
    otherUser: string;
    updateStatus: Function;
}

export default function AcceptFollowButton(props: FollowButtonProps) {

    const otherUser = props.otherUser;
	const updateStatus = props.updateStatus;

    const followUser = () => {
		console.log(otherUser)
		axios
			.post(`${BASE_URL}/api/user/follow/accept/${otherUser}`, {}, {
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
                updateStatus(otherUser, true)
			})
			.catch((err) => {
				updateStatus(otherUser, false)
			});
	};

  return (
    <button 
        className="flex items-center justify-center px-2 py-1 mx-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-500 border-2 border-transparent rounded-lg shadow-sm hover:bg-transparent hover:text-green-500 hover:border-green-500 focus:outline-none"
        onClick={() => followUser()}>
        Accept
    </button>
  )
}

