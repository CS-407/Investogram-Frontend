import React, { useState } from "react";
import axios from "axios";
import { User } from "@/util/types";

axios.defaults.baseURL = "http://localhost:8080/";

interface InitState {
    isAuth: boolean;
    user: Partial<User> | null;
    token: string | null;
}

const initialState: InitState = {
    isAuth: false,
    user: null,
    token: null
}

const AuthContext = React.createContext({
    ...initialState,
    login: async (user: Partial<User>) => {},
    logout: async () => {},
    signup: async (user: Partial<User>) => {},
    forgot: async (email: string) => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<InitState>(initialState);

    const loginHandler = async (user: Partial<User>) => {
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

    const signupHandler = async (user: Partial<User>) => {
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
            throw new Error(err);
        }
    }

    const forgotHandler = async (email: string) => {}

    const logoutHandler = async () => {
        localStorage.removeItem("token");
        setState({
            isAuth: false,
            user: null,
            token: null
        });
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

export default AuthContext;