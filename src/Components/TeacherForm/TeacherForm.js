import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { API, graphqlOperation } from 'aws-amplify';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper'
import ButtonWrapper from '../Form/ButtonWrapper';
import SelectionWrapper from '../Form/SelectionWrapper';
import AutoSelectionWrapper from '../Form/AutoSelectionWrapper';
import DateWrapper from '../Form/DateWrapper';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'

// Graphql Imports
import  { getStudents } from '../../graphql/queries';
import { createAttendance } from '../../graphql/mutations';

// Data
import { Subjects, AttendanceOpts, ExamType } from '../../data/Data';

const getRolls = (rolls) => {
    const array = [];
    rolls.map(roll => array.push({title: roll.rollNum.toString()}))
    return array;
}


const TeacherForm = () => {

    const initialState = {
        rollNo: '',
        date: '',
        attendance: '1',
        type: 'quiz',
        marks: ''
    }
    
    const formSchema = Yup.object().shape({
        rollNo: Yup.object().required('Required'),
        date: Yup.date().required('Required'),
        subject: Yup.object().notRequired().nullable(),
        attendance: Yup.bool().required('Required'),
        type: Yup.string().required('required'),
        marks: Yup.number().required(`Required`).min(0, 'Marks must be between 0 to 100').max(100, 'Marks must be between 0 to 100'),
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});
    const [rolls, setRolls] = useState([]);

    const handleSubmit = async ({ rollNo, date, subject, attendance, type, marks }) => {
        setLoading(true);
        try {
            const res = await API.graphql(graphqlOperation(createAttendance, { createAttendanceInput: {day: date, subCode: subject.code, rollNum: parseInt(rollNo.title), attendance: attendance} }))
            setOpen(true);
            setLoading(false);
            setMsg({
                msg: `Record stored successfully`,
                color: `success`
            })
            console.log(res);
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
            const res = await API.graphql(graphqlOperation(getStudents));
            setRolls(getRolls(res.data.getStudents));
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
                            Add Student Record
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper getOptionSelected={(opt) => opt.title} name='rollNo' label='Roll Number' options={rolls} />
                    </Grid>
                    <Grid item xs={12}>
                        <DateWrapper name='date' label='Date' />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper name='subject' label='Subject' options={Subjects} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectionWrapper name='attendance' label='Attendance' options={AttendanceOpts} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectionWrapper name='type' label='Type' options={ExamType} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='marks' label='Marks' />
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

export default TeacherForm;
