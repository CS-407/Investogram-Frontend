"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";

import "../authStyles.css";
import Link from "next/link";

interface Fields {
	username: string;
	email: string;
	password: string;
	password2: string;
	profilePicture: number;
}

function SignUp() {
	const initialValues: Fields = {
		username: "",
		email: "",
		password: "",
		password2: "",
		profilePicture: 1,
	};
	const router = useRouter();

	const { signup } = useContext(AuthContext);

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

		signupUser();
	};

	const signupUser = async () => {
		try {
			await signup({
				username: formValues.username,
				email: formValues.email,
				password: formValues.password,
				password2: formValues.password2,
				profile_pic: formValues.profilePicture,
			});
			alert("Signed In Successfully");
			router.push("/");
		} catch (err: any) {
			alert(err);
		}
	};

	const validate = () => {
		const errors: Fields = initialValues;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!regex.test(formValues.email)) {
			errors.email = "This is not a valid email format!";
		}

		if (formValues.password.length < 6 || formValues.password.length > 10) {
			errors.password = "Password must be 6-10 characters";
		} else if (formValues.password2 !== formValues.password) {
			errors.password2 = "Passwords must match";
		}

		if (errors == initialValues) {
			return false;
		}

		setFormErrors(errors);
		return true;
	};

	function updateProfilePic(choice: number) {
		setFormValues({ ...formValues, profilePicture: choice });
	}
	interface PictureProps { 
		picture: number;
		updatePicture: Function
	}
	const ProfilePicSection = (props: PictureProps) => {
		const currentSelection = props.picture;
		const updatePicture = props.updatePicture;
		let options = Array.from(Array(4), (_, index) => index + 1);
		return(
			<div>
				<h3 className="font-bold">Choose a profile picture</h3>
				<div className="flex flex-row">
					{options.map((x) => {
						if (x === currentSelection) return (
							<button 
								className="text-center px-2 font-bold bg-blue-50 p-1 rounded-lg"
								key={x}
							>
								<img
									src={`/images/avatar_${x}.png`}
									className="flex-center rounded-full object-cover h-16 w-16 mx-auto"
								/>
								Selected Option {x}
							</button>
						);
						else return (
							<button 
								className="text-center px-2 hover:bg-blue-50 p-1 rounded-lg"
								onClick={() => updatePicture(x)}
								key={x}
							>
								<img
									src={`/images/avatar_${x}.png`}
									className="flex-center rounded-full object-cover h-16 w-16 mx-auto"
								/>
								Option {x}
							</button>
						)
					})}
				</div>
			</div>
		);
	}

	return (
		<div className="formPage">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-2xl mb-4">Signup Form</h1>
					</div>
					<div className="ui form">
						<div className="form">
							<label className="block font-bold mb-2">Username</label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="username"
								required
								placeholder="johndoe"
								value={formValues.username}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.username}</p>
						<div className="form">
							<label className="block font-bold mb-2">Email </label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="text"
								name="email"
								required
								placeholder="jdoe@gmail.com"
								value={formValues.email}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.email}</p>
						<div className="form">
							<label className="block font-bold mb-2">Password </label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password"
								required
								placeholder="123456"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p>{formErrors.password}</p>
						<div className="form">
							<label className="block font-bold mb-2">Confirm Password </label>
							<input
								className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
								type="password"
								name="password2"
								required
								placeholder="123456"
								value={formValues.password2}
								onChange={handleChange}
							/>
						</div>
						<ProfilePicSection picture={formValues.profilePicture} updatePicture={updateProfilePic} />
						<p>{formErrors.password2}</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3">
							Submit
						</button>
						<div className="flex flex-col text-center mt-2">
							<Link href={"/auth/login"}>
								<p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2">
									Already have an account?
								</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
