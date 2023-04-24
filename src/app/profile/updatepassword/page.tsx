"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

import { useRouter } from "next/navigation";

interface Fields {
	password: string;
	password2: string;
}

function updatePasswordPage() {
	const initialValues: Fields = {
		password: "",
		password2: "",
	};

	const { updatePassword } = useContext(AuthContext);
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
			await updatePassword(formValues.password, formValues.password2);
			alert("Password updated successfully");
			router.push("/profile");
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
		<div className="flex h-screen">
			<div className="m-auto border-4 p-6">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Update Password</h1>
					</div>
					<div className="ui form">
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
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default updatePasswordPage;
