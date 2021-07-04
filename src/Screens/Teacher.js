import { useState } from 'react';
import { Grid, Box, Container } from '@material-ui/core';

// Custom Components
import Header from '../Components/Header/Header';
import AttendanceForm from '../Components/TeacherForm/AttendanceForm';
import MarksForm from '../Components/TeacherForm/MarksForm';
import Embed from '../Components/Dashboard/Embed';

const Teacher = () => {

    const [dashboard, setDashboard] = useState(false);

    if (dashboard === true) return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} isTeacher={true} buttonName='Records' dashboard={dashboard} setDashboard={setDashboard} />
                </Grid>
                <Grid container item spacing={2} style={{paddingBottom: '32px'}}>
                    <Embed />
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} isTeacher={true} buttonName='Dashboard' dashboard={dashboard} setDashboard={setDashboard} />
                </Grid>
                <Grid container item spacing={2} style={{paddingBottom: '32px'}}>
                    <Grid item md={6}>
                        <Container maxWidth="sm">
                            <AttendanceForm />
                        </Container>
                    </Grid>
                    <Grid item md={6}>
                        <Container maxWidth="sm">
                            <MarksForm />
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Teacher;