import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper'
import ButtonWrapper from '../Form/ButtonWrapper';
import SelectionWrapper from '../Form/SelectionWrapper';
import DateWrapper from '../Form/DateWrapper';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'

const TeacherForm = () => {

    const initialState = {
        rollNo: '',
        date: '',
        attendence: 'present',
        marks: '',
    }
    
    const formSchema = Yup.object().shape({
        rollNo: Yup.number().required('Required'),
        date: Yup.date().required('Required'),
        attendence: Yup.bool().required('Required'),
        marks: Yup.number().required(`Required`).min(0, 'Marks must be between 0 to 100').max(100, 'Marks must be between 0 to 100')
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});

    const handleSubmit = async ({ userName, email, password, role }) => {
        setLoading(true);
        setOpen(true);
        setMsg({
            msg: 'Works',
            color: 'success'
        })
    }

    const attendenceOpts = {
        'present': 'Present',
        'absent': 'Absent'
    }

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
                        {/* // TODO: Pass Options */}
                        <SelectionWrapper name='rollNum' label='Roll Number' options={{1: 1, 2: 2}} />
                    </Grid>
                    <Grid item xs={12}>
                        <DateWrapper name='date' label='Date' />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectionWrapper name='rollNum' label='Role' options={attendenceOpts} />
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
