"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";

import "../authStyles.css";
import { NextPage } from "next";
import Link from "next/link";

interface Fields {
	username: string;
	email: string;
	password: string;
	password2: string;
}

const SignUp: NextPage = () => {
	const initialValues: Fields = {
		username: "",
		email: "",
		password: "",
		password2: "",
	};
	const router = useRouter();

	const { signup } = useContext(AuthContext);

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Fields>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		validate();
	};

	const signupUser = () => {
		try {
			signup({
				username: formValues.username,
				email: formValues.email,
				password: formValues.password,
				password2: formValues.password2,
			});
			router.push("/");
		} catch (err: any) {
			alert(err.message);
		}
	};

	const validate = () => {
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!regex.test(formValues.email)) {
			errors.email = "This is not a valid email format!";
		}

		if (formValues.password.length < 6 || formValues.password.length > 10) {
			errors.password = "Password must be 6-10 characters";
		} else if (formValues.password2 !== formValues.password) {
			errors.password2 = "Passwords must match";
		}

		if (errors == initialValues) {
			signupUser();
		}

		setFormErrors(errors);
	};

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Signup Form</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>Username </label>
							<input
								type="text"
								name="johndoe"
								required
								placeholder="Username"
								value={formValues.username}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.username}</p>
						<div className="form">
							<label>Email </label>
							<input
								type="text"
								name="jdoe@gmail.com"
								required
								placeholder="Email"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
						<div className="form">
							<label>Password </label>
							<input
								type="password"
								name="password"
								required
								placeholder="123456"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<div className="form">
							<label>Confirm Password </label>
							<input
								type="password"
								name="password2"
								required
								placeholder="123456"
								value={formValues.password2}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password2}</p>
						<button className="fluid ui button blue">Submit</button>
						<div className="linkContainer">
							<Link href={"/auth/login"}>Already have an account</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
