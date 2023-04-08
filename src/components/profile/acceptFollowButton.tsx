"use client";

import axios from "axios";
import { BASE_URL } from "../../util/globals";

export default function AcceptFollowButton(
	props: React.PropsWithChildren<{ id: string | undefined }>
) {

	const followUser = () => {
		axios
			.post(`${BASE_URL}/api/user/follow/${props.id}`, null, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
				alert(data.message);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
                    alert(err.response.data.msg);
                } else {
                    alert("Trouble contacting server");
                }
			});
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
