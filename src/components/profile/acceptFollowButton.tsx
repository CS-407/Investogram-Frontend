"use client";

import axios from "axios";
import { BASE_URL } from "../../util/globals";

export default function AcceptFollowButton(
	props: React.PropsWithChildren<{ id: string | undefined }>
) {
	const mockUser = {
		id: "63e8451d540fd8c730cb98b4",
	};

	const followUser = () => {
		axios
			.post(`${BASE_URL}/api/user/follow/${props.id}`, null, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const data = response.data;
				if (data.msg === "Success") {
					console.log("Success");
					console.log(data);
				} else {
					console.log("Error");
					console.log(data);
				}
			})
			.catch((error) => {
				console.log(error);
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
