"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../authStyles.css";

interface Fields {
	username: string;
	email: string;
}

function ForgotUser() {
	const initialValues = { username: "", email: "" };

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
		return errors;
	};

	const router = useRouter();

	function ForgotUser() {
		fetch('http://localhost:5000/api/auth/resetuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formValues.email,
			newusername: formValues.username
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.msg === "Success") {
			router.push("/auth/login");
        } else {
			// handle else condition
        }
    })
	}

	return (
		<div className="formPage">
			<div className="container">
			<form onSubmit={handleSubmit}>
					<h1>Reset Username Form</h1>
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
						<button onClick={ForgotUser}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotUser;
