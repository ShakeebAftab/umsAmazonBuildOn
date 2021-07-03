import { useState, useEffect } from 'react'; 
import { Grid, Box, Container } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';

// Custom Components
import Header from '../Components/Header/Header';
import AttendanceRecord from '../Components/StudentRecords/AttendanceRecord';
import MarksRecord from '../Components/StudentRecords/MarksRecord';

import Loader from '../Components/Loader/Loader';

// Queries
import { listAttendances, listMarkss } from '../graphql/queries';

const getAttendance = (attendances, userName) => attendances.filter(attendance => attendance.studentRoll === parseInt(userName));

const Student = ({ userName }) => {

    const [attendance, setAttendance] = useState([]);
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resOne, resTwo] = await Promise.all([API.graphql(graphqlOperation(listAttendances)), API.graphql(graphqlOperation(listMarkss))]);
                setAttendance(getAttendance(resOne.data.listAttendances, userName));  
                setMarks(getAttendance(resTwo.data.listMarkss, userName));  
                setLoading(false);              
            } catch (error) {
                console.log(error);
            }
        } 
        fetchData();
    }, [userName])

    if (loading) return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} />
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item sm={12}>
                        <Loader />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <Box overflow='hidden'>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <Header hidden={true} />
                </Grid>
                <Grid container item spacing={2} style={{paddingBottom: '32px'}}>
                    <Grid item sm={12}>
                        <Container maxWidth="lg">
                            <AttendanceRecord records={attendance} />
                        </Container>
                    </Grid>
                    <Grid item sm={12}>
                        <Container maxWidth="lg">
                            <MarksRecord records={marks} />
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Student;