import { useState, useEffect } from "react";
import "./authStyles.css";

interface Fields {
	username: string;
	email: string;
	password: string;
}

function SignUp() {
	const initialValues: Fields = { username: "", email: "", password: "" };

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

		if (!values.username) {
			errors.username = "Username is required!";
		}
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

	return (
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
					<button className="fluid ui button blue">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
