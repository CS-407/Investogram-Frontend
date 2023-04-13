import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/util/types";
import { BASE_URL } from "@/util/globals";

axios.defaults.baseURL = BASE_URL;

interface InitState {
	isAuth: boolean;
	user: Partial<User> | null;
	token: string | null;
}

const initialState: InitState = {
	isAuth: false,
	user: null,
	token: null,
};

const AuthContext = React.createContext({
	...initialState,
	login: async (user: Partial<User>) => {},
	logout: async () => {},
	signup: async (user: Partial<User>) => {},
	forgot: async (email: string) => {},
	resetPassword: async (user: Partial<User>) => {},
	resetUsername: async (user: Partial<User>) => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
	const [state, setState] = useState<InitState>(initialState);

	useEffect(() => {
		let userdatastring: string | null = "";
		let userData = null;
        let lsToken = null;

		if (typeof window !== "undefined") {
			userdatastring = localStorage.getItem("userdata");
            lsToken = localStorage.getItem("token");
		}

		if (userdatastring) {
			userData = JSON.parse(userdatastring);
		}

		setState({
			isAuth: userData ? true : false,
			user: userData ? userData : null,
			token: userData ? lsToken : null,
		});
	}, []);

	const loginHandler = async (user: Partial<User>) => {
		try {
			const res = await axios.post("/api/auth/login", user, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("userdata", JSON.stringify(res.data.user));

			setState({
				isAuth: true,
				user: res.data.user,
				token: res.data.token,
			});
		} catch (err: any) {
			if (err.response) {
				throw err.response.data.msg;
			}
			throw err.message;
		}
	};

	const signupHandler = async (user: Partial<User>) => {
		try {
			const res = await axios.post("/api/auth/signup", user, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = res.data;

			localStorage.setItem("token", data.token);
            localStorage.setItem("userdata", JSON.stringify(data.user));

			setState({
				isAuth: true,
				user: data.user,
				token: data.token,
			});
		} catch (err: any) {
			if (err.response) {
				console.log(err.response);
				throw err.response.data.msg;
			}
			throw err.message;
		}
	};

	const forgotHandler = async (email: string) => {
		try {
			const reqBody = {
				email: email,
			};

			await axios.post("/api/auth/forgot", reqBody, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (err: any) {
			if (err.response) {
				throw err.response.data.msg;
			}
			throw err.message;
		}
	};

	const resetPasswordHandler = async (user: Partial<User>) => {
		try {
			await axios.patch("/api/auth/resetpass", user, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (err: any) {
			if (err.response) {
				throw err.response.data.msg;
			}
			throw err.message;
		}
	};

	const resetUsernameHandler = async (user: Partial<User>) => {
		try {
			await axios.patch("/api/auth/resetuser", user, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (err: any) {
			if (err.response) {
				throw err.response.data.msg;
			}
			throw err.message;
		}
	};

	const logoutHandler = async () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userdata");

		setState({
			isAuth: false,
			user: null,
			token: null,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuth: state.isAuth,
				user: state.user,
				token: state.token,
				login: loginHandler,
				signup: signupHandler,
				forgot: forgotHandler,
				logout: logoutHandler,
				resetPassword: resetPasswordHandler,
				resetUsername: resetUsernameHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
