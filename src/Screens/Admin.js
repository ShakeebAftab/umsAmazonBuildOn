import { Grid, Container, Box, makeStyles } from '@material-ui/core';

// External Components
import Header from "../Components/Header/Header";
import SignUpForm from '../Components/AdminForm/SignUpForm';
import EmailForm from '../Components/AdminForm/EmailForm';
import ConfirmForm from '../Components/AdminForm/ConfirmForm';

// Styles
const useStyles = makeStyles({
    confirmForm: {
        marginBottom: `32px`
    }
})

const Admin = () => {

    const classes = useStyles();

    return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} />
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item md={6}>
                        <Container maxWidth="sm">
                            <EmailForm />
                        </Container>
                    </Grid>
                    <Grid item md={6}>
                        <Container maxWidth="sm">
                            <SignUpForm />
                        </Container>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="lg" className={classes.confirmForm}>
                        <ConfirmForm />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Admin;