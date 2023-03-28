'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "./authStyles.css";

interface Fields {
	username: string;
	email: string;
}

function ForgotPass() {
	const initialValues = { username: "", email: "" };

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Fields>(initialValues);
	const [isSubmit, setIsSubmit] = useState(false);

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors]);

	const validate = (values: Fields) => {
		const errors: any = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}
		return errors;
	};

	function ResetPass() {
		router.push("/resetpass");
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h1>Login Form</h1>
				<div className="ui divider"></div>
				<div className="ui form">
					<div className="form">
						<label>Username</label>
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
						<label>Email</label>
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={formValues.email}
							onChange={handleChange}
						/>
					</div>
					<p>{formErrors.email}</p>
					<button onClick={ResetPass}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default ForgotPass;
