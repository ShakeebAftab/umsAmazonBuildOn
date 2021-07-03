import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from 'aws-amplify';
import * as Yup from 'yup';

// Custom Components
import ButtonWrapper from '../Form/ButtonWrapper';
import SelectionWrapper from '../Form/SelectionWrapper';
import AutoSelectionWrapper from '../Form/AutoSelectionWrapper';
import DateWrapper from '../Form/DateWrapper';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'

// Graphql Imports
import  { listStudentss, listSubjectss } from '../../graphql/queries';
import { createAttendance } from '../../graphql/mutations';

// Data
import { AttendanceOpts } from '../../data/Data';

const getRolls = (rolls) => {
    const array = [];
    rolls.map(roll => array.push({name: roll.rollNum.toString()}))
    return array;
}


const AttendanceForm = () => {

    const initialState = {
        rollNo: '',
        date: '',
        attendance: '1',
    }
    
    const formSchema = Yup.object().shape({
        rollNo: Yup.object().required('Required'),
        date: Yup.date().required('Required'),
        subject: Yup.object().notRequired().nullable(),
        attendance: Yup.bool().required('Required'),
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});
    const [rolls, setRolls] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const handleSubmit = async ({ rollNo, date, subject, attendance }) => {
        setLoading(true);
        try {
            await API.graphql(graphqlOperation(createAttendance, { createAttendanceInput: {day: date, subjectCode: subject.code, studentRoll: parseInt(rollNo.name), attendance: attendance} })); 
            setOpen(true);
            setLoading(false);
            setMsg({
                msg: `Record stored successfully`,
                color: `success`
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            setOpen(true);
            setMsg({
                msg: error.message,
                color: `error`
            })
        }
    }

    useEffect(() => {
        const fetchRolls = async () => {
            const [resOne, resTwo] = await Promise.all([API.graphql(graphqlOperation(listStudentss)), API.graphql(graphqlOperation(listSubjectss))]);
            setRolls(getRolls(resOne.data.listStudentss));
            setSubjects(resTwo.data.listSubjectss);
        }   
        fetchRolls();
    }, [])

    return (
        <Formik
            initialValues={{...initialState}}
            validationSchema={formSchema}
            onSubmit={values => handleSubmit(values)}
        >
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5' >
                            Add Student Attendance
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper getOptionSelected={(opt) => opt.title} name='rollNo' label='Roll Number' options={rolls} />
                    </Grid>
                    <Grid item xs={12}>
                        <DateWrapper name='date' label='Date' />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper name='subject' label='Subject' options={subjects} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectionWrapper name='attendance' label='Attendance' options={AttendanceOpts} />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper name='Add Record' loading={loading} />
                    </Grid>
                </Grid>
                <SnackBarWrapper open={open} setOpen={setOpen} msg={msg.msg} color={msg.color} />
            </Form>
        </Formik>
    )
}

export default AttendanceForm;