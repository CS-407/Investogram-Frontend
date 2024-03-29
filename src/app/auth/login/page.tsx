"use client";

import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "../authStyles.css";

interface Fields {
	username: string;
	password: string;
}

function Login() {
	const initialValues: Fields = { username: "", password: "" };
	const router = useRouter();

	const { login } = useContext(AuthContext);

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Fields>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validate()) {
			return;
		}

		loginUser();
	};

	const loginUser = async () => {
		try {
			await login({
				username: formValues.username,
				password: formValues.password,
			});
			alert("Successfully Logged In");
			router.push("/");
		} catch (err: any) {
			alert(err);
		}
	};

	const validate = () => {
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (formValues.password.length < 6 || formValues.password.length > 10) {
			errors.password = "Password must be between 6 and 10 characters";
		}

		if (errors == initialValues) {
			return false;
		}

		setFormErrors(errors);
		return true;
	};

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Login Form</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">Username</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="username"
								required
								placeholder="johndoe"
								value={formValues.username}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.username}</p>
						<div className="form">
							<label className="block font-bold mb-2">Password </label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password"
								placeholder="123456"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Submit
						</button>
						<div className="flex flex-col text-center mt-2">
							<Link href={"/auth/signup"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">
									Sign up for an account
								</p>
							</Link>
							<Link href={"/auth/forgot"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">
									Forgot username or password
								</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
