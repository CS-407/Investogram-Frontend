"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { BASE_URL } from "@/util/globals";
import axios from "axios";

function deleteUserPage() {
	const { logout, user } = useContext(AuthContext);
	const router = useRouter();

	const [password, setPassword] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (window.confirm("Are you sure you want to delete your account?")) {
			deleteAcc();
		}
	};

	const deleteAcc = async () => {
		axios
			.delete(`${BASE_URL}/api/user/deleteAcc`, {
				data: {
					password: password,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res: any) => {
				logout();
				router.push("/auth/login");
			})
			.catch((err: any) => {
				if (err.response && err.response.data && err.response.data.msg) {
					alert(err.response.data.msg);
				} else {
					alert("Trouble Contacting Server");
				}
			});
	};

	return (
		<div className="flex h-screen">
			<div className="m-auto border-4 p-6">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Delete Account</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">Verify Password</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password"
								required
								placeholder="password"
								value={password}
								onChange={handleChange}
							/>
						</div>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default deleteUserPage;
