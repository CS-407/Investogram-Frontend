"use client";

import AuthContext from "@/context/AuthContext";
import { User } from "@/util/types";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import "../authStyles.css";

interface Fields {
	email: string;
	username: string;
	reset_token: number;
}

function ResetUser() {
	const initialValues: Fields = { email: "", username: "", reset_token: 0 };

	const router = useRouter();
	const { resetUsername } = useContext(AuthContext);

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Partial<Fields>>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validate()) {
			return;
		}

		resetUser();
	};

	const resetUser = async () => {
		
		try {
			const updated_user: Partial<User> = {
				'email': formValues.email,
				'username': formValues.username,
				'reset_token': formValues.reset_token
			}

			await resetUsername(updated_user);
			alert('Username reset successfully');
			router.push("/auth/login");
		} catch (err: any) {
			alert(err);
		}
	}

	const validate = () => {
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		let invalid: boolean = false;

		if (!regex.test(formValues.email)) {
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
					<h1>Reset Username</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>Enter Email</label>
							<input
								type="email"
								name="email"
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
						<div className="form">
							<label>New Username</label>
							<input
								type="text"
								name="username"
								placeholder="new-username"
								value={formValues.username}
								onChange={handleChange}
							/>
						</div>
						<div className="form">
							<label>Enter Reset Token</label>
							<input
								type="number"
								min={0}
								max={99999}
								name="reset_token"
								placeholder="00000"
								value={formValues.reset_token}
								onChange={handleChange}
							/>
						</div>
						<button className="fluid ui button blue">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ResetUser;
