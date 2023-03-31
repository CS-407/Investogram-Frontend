"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../authStyles.css";

interface Fields {
	password: string;
	confirmpass: string;
	opt: string;
}

function resetPass() {
	const initialValues = { password: "" , confirmpass: "", opt: ""};

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

	function ResetPass() {
		fetch('http://localhost:5000/api/auth/resetpass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            OPT: formValues.opt,
			newpass: formValues.password,
			confirmpass: formValues.confirmpass
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
					<h1>Reset Password</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="form">
							<label>OPT</label>
							<input
								type="text"
								name="opt"
								placeholder="Enter OPT"
								value={formValues.opt}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.opt}</p>
						<div className="form">
							<label>New password</label>
							<input
								type="password"
								name="password"
								placeholder="New Password"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<div className="form">
							<label>Confirm Password</label>
							<input
								type="password"
								name="confirmpass"
								placeholder="Confirm Password"
								value={formValues.confirmpass}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.confirmpass}</p>
						<button className="fluid ui button blue">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default resetPass;
