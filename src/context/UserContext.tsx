import React, { useState, useContext } from "react";

import AuthContext from "./AuthContext";
import axios from "axios";
import { User } from "@/util/types";

interface InitState {
    
}

const initialState: InitState = {
    
}

const UserContext = React.createContext({
    ...initialState,
    buyStock: async () => {},
    sellStock: async () => {},
    
});

export const UserContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<InitState>(initialState);

    const buyStock = async () => {
    }

    const sellStock = async () => {
    }
}

export default UserContext;