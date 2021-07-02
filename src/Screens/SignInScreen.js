import { useState } from 'react';
import Header from '../Components/Header/Header';
import { Grid, Container, Box } from '@material-ui/core';

// Custom Components
import SignInForm from '../Components/SignInForm/SignInForm';
import SnackBarWrapper from '../Components/SnackBarWrapper/SnackBarWrapper';

const SignInScreen = () => {

    const [err, setErr] = useState(false);

    return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header msg="UNIVERSITY MANAGEMENT SYSTEM" hidden={false} />
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="sm">
                        <SnackBarWrapper open={err} setOpen={setErr} msg='Invalid Credentials Provided' color='error' />
                        <SignInForm setErr={setErr} />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignInScreen;