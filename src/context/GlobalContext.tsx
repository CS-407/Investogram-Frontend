import React, { useState } from "react";
import axios from "axios";
import { Stock, User } from "@/util/types";

interface InitState {
    stocks: Stock[],
    users: User[]
}

const initialState: InitState = {
    stocks: [],
    users: []
}

const GlobalContext = React.createContext({
    ...initialState,
    getStocks: () => {},
    getUsers: () => {}
});

export const GlobalContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<InitState>(initialState);

    
}