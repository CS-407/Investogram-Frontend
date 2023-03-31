"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../authStyles.css";

interface Fields {
	email: string;
}

function ForgotPass() {
	const initialValues = { email: "" };

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
		const errors: any = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}
		return errors;
	};

	const router = useRouter();

	function ResetPass() {
		router.push("/auth/resetpass");
	}

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Forgot password Form</h1>
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
						<button onClick={ResetPass}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPass;
