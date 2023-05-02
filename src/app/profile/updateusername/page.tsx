"use client";

import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function UpdateUsernamePage() {
	const router = useRouter();
	const { updateUsername } = useContext(AuthContext);

	const [username, setUsername] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		resetUser();
	};

	const resetUser = async () => {
		try {
			await updateUsername(username);
			alert("Username updated successfully");
			router.push("/profile");
		} catch (err: any) {
			console.log(err);
			alert(err);
		}
	};

	return (
		<div className="flex h-screen">
			<div className="m-auto border-4 p-6">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Update Username</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">New Username</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="username"
								required
								placeholder="new-username"
								value={username}
								onChange={handleChange}
							/>
						</div>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateUsernamePage;
