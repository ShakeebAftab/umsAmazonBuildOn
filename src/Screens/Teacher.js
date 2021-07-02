import { Grid, Box, Container } from '@material-ui/core';

// Custom Components
import Header from '../Components/Header/Header';
import TeacherForm from '../Components/TeacherForm/TeacherForm';

const Teacher = () => {
    return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} />
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item xs={12}>
                        <Container maxWidth="sm">
                            <TeacherForm />
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Teacher;