"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../authStyles.css";

interface Fields {
	email: string;
	password: string;
}

function ForgotUser() {
	const initialValues = { email: "", password: "" };

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Fields>(initialValues);
	const [isSubmit, setIsSubmit] = useState(false);

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
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 4) {
			errors.password = "Password must be more than 4 characters";
		} else if (values.password.length > 10) {
			errors.password = "Password cannot exceed more than 10 characters";
		}
		return errors;
	};

	const router = useRouter();

	function ResetUser() {
		router.push("/resetuser");
	}

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Forgot Username Form</h1>
					<div className="ui divider"></div>
					<div className="ui form">
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
						<div className="form">
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<button onClick={ResetUser}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotUser;
