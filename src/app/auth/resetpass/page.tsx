"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

import "../authStyles.css";
import { User } from "@/util/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Fields {
	email: string;
	password: string;
	password2: string;
	reset_token: number;
}

function resetPass() {
	const initialValues: Fields = {
		email: "",
		password: "",
		password2: "",
		reset_token: 0,
	};

	const { resetPassword } = useContext(AuthContext);
	const router = useRouter();

	const [formValues, setFormValues] = useState<Fields>(initialValues);
	const [formErrors, setFormErrors] = useState<Fields>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validate()) {
			return;
		}

		resetPass();
	};

	const resetPass = async () => {
		try {
			const updated_user: Partial<User> = {
				email: formValues.email,
				password: formValues.password,
				password2: formValues.password2,
				reset_token: formValues.reset_token,
			};

			await resetPassword(updated_user);
			alert("Password reset successfully");
			router.push("/auth/login");
		} catch (err: any) {
			alert(err);
		}
	};

	const validate = () => {
		const errors: Fields = initialValues;

		if (formValues.password.length < 6 || formValues.password.length > 10) {
			errors.password = "Password must be between 6 and 10 characters";
		} else if (formValues.password2 !== formValues.password) {
			errors.password2 = "Passwords must match";
		}

		if (errors == initialValues) {
			return false;
		}

		setFormErrors(errors);

		return true;
	};

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Reset Password</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">Enter Email</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="email"
								name="email"
								required
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form">
							<label className="block font-bold mb-2">Enter New Password</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password"
								required
								placeholder="new-password"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<div className="form">
							<label className="block font-bold mb-2">
								Retype New Password
							</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password2"
								required
								placeholder="new-password"
								value={formValues.password2}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password2}</p>
						<div className="form">
							<label className="block font-bold mb-2">Enter Reset Token</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="number"
								min={0}
								max={99999}
								required
								name="reset_token"
								placeholder="00000"
								value={formValues.reset_token}
								onChange={handleChange}
							/>
						</div>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Submit
						</button>
						<div className="flex flex-col text-center mt-2">
							<Link href={"/auth/resetuser"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">
									Reset Username
								</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default resetPass;
