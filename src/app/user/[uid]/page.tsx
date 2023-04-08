"use client";

import { BASE_URL } from "@/util/globals";
import { User } from "@/util/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
	const [user, setUser] = useState<User>();

	const params = usePathname();
	const uid = params ? params.split("/")[2] : "";

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/global/user/${uid}`)
			.then((response) => {
				setUser(response.data.user);
			})
			.catch((err) => {
				if (err.response && err.response.data && err.response.data.msg) {
                    alert(err.response.data.msg);
                } else {
                    alert("Trouble contacting server");
                }
			});
	}, []);

	const handleFollowRequest = () => {
		axios
			.post(`${BASE_URL}/api/user/follow/${uid}`, null, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				alert(res.data.msg);
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
		<div>
			<p>Username: {user?.username}</p>
			<p>Email: {user?.email}</p>
			<button onClick={handleFollowRequest}>Send Follow Request</button>
		</div>
	);
};

export default User;
