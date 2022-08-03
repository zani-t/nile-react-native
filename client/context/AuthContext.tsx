import React, { createContext, useState } from "react";

import { AppState, KeyboardState, AppDisplay } from '../bin/App';

interface AuthProviderProps {
    children: React.ReactNode;
    states?: any;
};

interface AuthStateProps {
    user: any,
    authTokens: any,
};

interface AuthContextProps {
    authState: AuthStateProps,
    setAuthState: React.Dispatch<React.SetStateAction<AuthStateProps>>,
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {

    const [authState, setAuthState] = useState<AuthStateProps>({
        user: null,
        authTokens: null,
    });

    const logoutUser = () => {
        setAuthState({
            user: null,
            authTokens: null,
        });
        // Remove authTokens from keychain storage
        // Navigate to auth
    };

    // Display splash when loading
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </AuthContext.Provider>
    );

}