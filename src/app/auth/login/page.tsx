"use client";

import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "../authStyles.css";

interface Fields {
	username: string;
	email: string;
	password: string;
}

function Login() {
	const initialValues: Fields = { username: "", email: "", password: "" };
	const router = useRouter();

	const { login } = useContext(AuthContext);

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

	const loginUser = () => {
		try {
			login({
				email: formValues.email,
				password: formValues.password,
			});
			router.push("/");
		} catch (err: any) {
			console.log(err);
			alert("Trouble Contacting Server");
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
		}

		if (errors == initialValues) {
			loginUser();
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
					<h1>Login Form</h1>
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
						<button className="fluid ui button blue">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
