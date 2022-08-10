import React, { createContext, useState } from 'react';

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

    // Display splash when loading
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </AuthContext.Provider>
    );

}