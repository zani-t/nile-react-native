import React, { createContext, useState } from "react";

import { AppState, KeyboardState, AppDisplay } from '../App';

interface AuthProviderProps {
    children: React.ReactNode;
    appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
    keyboardStateController: React.Dispatch<React.SetStateAction<KeyboardState>>;
};

interface AuthStateProps {
    email: any,
    authTokens: any,
};

interface AuthContextProps {
    authState: AuthStateProps,
    setAuthState: React.Dispatch<React.SetStateAction<AuthStateProps>>,
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {

    const [authState, setAuthState] = useState<AuthStateProps>({
        email: null,
        authTokens: null,
    });

    const logoutUser = () => {
        setAuthState({
            email: null,
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