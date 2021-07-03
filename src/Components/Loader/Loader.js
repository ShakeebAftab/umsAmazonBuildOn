import { Container, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    loader: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: `center`,
        alignItems: 'center'
    }
})

const Loader = () => {

    const classes = useStyles();

    return (
        <Container className={classes.loader}>
            <CircularProgress color='secondary' />
        </Container>
    )
}

export default Loader;
