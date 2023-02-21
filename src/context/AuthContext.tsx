import React, { useState } from "react";
import axios from "axios";

const initialState: {
    isAuth: boolean;
    user: any;
    token: string | null;
} = {
    isAuth: false,
    user: null,
    token: null
}

const AuthContext = React.createContext({
    ...initialState,
    login: async (user: any) => {},
    logout: async () => {},
    signup: async (user: any) => {},
    forgot: async (email: string) => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState(initialState);

    const loginHandler = async (user: any) => {
        try {
            const res = await axios.post("/api/auth/login", user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = res.data;

            localStorage.setItem('token', data.token);

            setState({
                isAuth: true,
                user: data.user,
                token: data.token
            })
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const signupHandler = async (user: any) => {
        try {
            const res = await axios.post("/api/auth/signup", user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = res.data;

            localStorage.setItem("token", data.token);

            setState({
                isAuth: true,
                user: data.user,
                token: data.token
            })
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const forgotHandler = async (email: string) => {}

    const logoutHandler = async () => {
        localStorage.removeItem("token");

        setState({
            isAuth: false,
            user: null,
            token: null
        })
    }

    return (
        <AuthContext.Provider value={{
            isAuth: state.isAuth,
            user: state.user,
            token: state.token,
            login: loginHandler,
            signup: signupHandler,
            forgot: forgotHandler,
            logout: logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}