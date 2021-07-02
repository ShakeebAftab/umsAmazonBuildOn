import { createContext, useState } from 'react';

export const AuthStateContext = createContext();

export const AuthStateProvider = ({ children }) => {

    const [authState, setAuthState] = useState('');
    const [signedIn, setSignedIn] = useState(false);

    return (
        <AuthStateContext.Provider value={[authState, setAuthState, signedIn, setSignedIn]} >{children}</AuthStateContext.Provider>
    )
}