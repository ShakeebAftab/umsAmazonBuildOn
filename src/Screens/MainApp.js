import { useEffect, useContext, useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Auth } from 'aws-amplify';

// Screen Imports
import Admin from './Admin';
import Teacher from './Teacher';
import Student from './Student';
import Loader from '../Components/Loader/Loader';

// Context
import { AuthStateContext } from '../State/AuthState';

const MainApp = () => {
    const [authState, setAuthState] = useContext(AuthStateContext);
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchUserType = async () => {
            const user = await Auth.currentAuthenticatedUser();
            setAuthState(user.attributes[`custom:role`]);
            setUserName(user.username);
        }
        fetchUserType();
    }, [setAuthState])

    if (userName === 'admin') return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item sm={12}>
                    <Loader />
                </Grid>
            </Grid>
        </Box>
    )

    // if (authState === 'admin') return <Admin />
    // if (authState === 'teacher') return <Teacher />
    // return <Student userName={userName} />
    return <Admin />
}

export default MainApp;