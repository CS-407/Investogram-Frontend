"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";

import "../authStyles.css";

interface Fields {
	email: string;
}

function ForgotPass() {
	const initialValues = { username: "", email: "" };
	const { forgot } = useContext(AuthContext);

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
		sendForgotMail();
	};

	const sendForgotMail = async () => {
		try {
			await forgot(formValues.email);
			alert('Email Sent Successfully');
		} catch (err: any) {
			alert(err);
		}
	}

	const validate = () => {
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		let invalid: boolean = false;

		if (!formValues.email) {
			errors.email = "Email is required!";
			invalid = true;
		} else if (!regex.test(formValues.email)) {
			errors.email = "This is not a valid email format!";
			invalid = true;
		}

		setFormErrors(errors);

		return invalid;
	};

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
				<div className="text-center">
						<h1 className="text-2xl mb-4">Forgot Username/Password</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">Enter Email</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="email"
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3" type="submit">Submit</button>
						<div className="linkContainer">
							<Link href={"/auth/resetuser"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">Reset Username</p>
							</Link>							
							<Link href={"/auth/resetpass"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">Reset Password</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPass;
