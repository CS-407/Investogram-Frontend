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

	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		validate();
		setIsSubmit(true);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors]);

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

		if (!formValues.username) {
			errors.username = "Username is required!";
		}
		if (!formValues.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(formValues.email)) {
			errors.email = "This is not a valid email format!";
		}

		if (!formValues.password) {
			errors.password = "Password is required";
		} else if (formValues.password.length < 4) {
			errors.password = "Password must be more than 4 characters";
		} else if (formValues.password.length > 10) {
			errors.password = "Password cannot exceed more than 10 characters";
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
				{Object.keys(formErrors).length === 0 && isSubmit ? (
					<div className="ui message success">Signed in successfully</div>
				) : (
					<pre>Login Unsuccesfull</pre>
				)}

				<form onSubmit={handleSubmit}>
					<h1>Signup Form</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>Username </label>
							<input
								type="text"
								name="username"
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
								name="email"
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
								placeholder="Password"
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
								placeholder="Confirm Password"
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
