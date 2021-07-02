import { useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';

// Screen Imports
import Admin from './Admin';
import Teacher from './Teacher';
import Student from './Student';

// Context
import { AuthStateContext } from '../State/AuthState';

const MainApp = () => {
    const [authState, setAuthState] = useContext(AuthStateContext);

    useEffect(() => {
        const fetchUserType = async () => {
        const { attributes } = await Auth.currentAuthenticatedUser();
        setAuthState(attributes[`custom:role`]);
        }
        fetchUserType();
    }, [setAuthState])

    if (authState === 'admin') return <Admin />
    if (authState === 'teacher') return <Teacher />
    return <Student />
}

export default MainApp;