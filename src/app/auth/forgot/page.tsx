"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

import "../authStyles.css";
import Link from "next/link";

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
					<h1>Forgot Username / Password</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>Enter Email</label>
							<input
								type="text"
								name="email"
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
						<button type="submit">Submit</button>
						<div className="linkContainer">
							<Link href={"/auth/resetpass"}>Reset Password</Link>
							<Link href={"/auth/resetuser"}>Reset Username</Link>							
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPass;
