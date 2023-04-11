"use client";

import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "../authStyles.css";

interface Fields {
	email: string;
	password: string;
}

function Login() {
	const initialValues: Fields = { email: "", password: "" };
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
				email: formValues.email,
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

		if (!regex.test(formValues.email)) {
			errors.email = "This is not a valid email format!";
		}
		
		if (formValues.password.length < 4) {
			errors.password = "Password must be more than 4 characters";
		} else if (formValues.password.length > 10) {
			errors.password = "Password cannot exceed more than 10 characters";
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
							<label className="block font-bold mb-2">Email </label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="email"
								required
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
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
