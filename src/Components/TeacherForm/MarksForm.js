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
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'

// Graphql Imports
import  { listStudentss, listSubjectss } from '../../graphql/queries';
import { createMarks } from '../../graphql/mutations';

// Data
import { ExamType } from '../../data/Data';

const getRolls = (rolls) => {
    const array = [];
    rolls.map(roll => array.push({name: roll.rollNum.toString()}))
    return array;
}


const TeacherForm = () => {

    const initialState = {
        rollNo: '',
        date: '',
        type: 'quiz',
        marks: '',
    }
    
    const formSchema = Yup.object().shape({
        rollNo: Yup.object().required('Required'),
        subject: Yup.object().notRequired().nullable(),
        type: Yup.string().required('Required'),
        marks: Yup.number().required('Required').min(0, 'Marks should be between 0 and 100').max(100, 'Marks should be between 0 and 100')
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});
    const [rolls, setRolls] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const handleSubmit = async ({ rollNo, subject, type, marks }) => {
        setLoading(true);
        try {
            await API.graphql(graphqlOperation(createMarks, { createMarksInput: {type: type, subjectCode: subject.code, studentRoll: parseInt(rollNo.name), marks: marks} })); 
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
                            Add Student Marks
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper getOptionSelected={(opt) => opt.title} name='rollNo' label='Roll Number' options={rolls} />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoSelectionWrapper name='subject' label='Subject' options={subjects} />
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