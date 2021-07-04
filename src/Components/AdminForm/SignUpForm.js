import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper'
import ButtonWrapper from '../Form/ButtonWrapper';
import SelectionWrapper from '../Form/SelectionWrapper';
import AutoSelectionWrapper from '../Form/AutoSelectionWrapper';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper';

// Import Mutations
import { createStudents, createSelectedSubject, deleteStudents } from '../../graphql/mutations';

// Queries Import
import { listSubjectss } from '../../graphql/queries';

// Dummy Data
import { roles } from '../../data/Data'

const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    const [subjects, setSubjects] = useState([]);
    
    const initialState = {
        userName: '',
        email: '',
        password: '',
        role: 'admin',
        subject: '1',
        isStudent: false
    }
    
    let formSchema = Yup.object().shape({
        isStudent: Yup.bool(),
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required').min(8, 'Must be atleast 8 characters'),
        role: Yup.string().required(`Required`),
        subject: Yup.object().notRequired().nullable()
    })

    const signUpUser = async (userName, email, password, role, code) => {
        try {
            await Auth.signUp({
                username: userName,
                password,
                attributes: {
                    email,
                    'custom:role': role
                }
            });
            setLoading(false);
            setOpen(true);
            setMsg({
                msg: `User created successfully with Username: ${userName}`,
                color: `success`
            })
        } catch (error) {
            setLoading(false);
            setOpen(true);
            setMsg({
                msg: error.message,
                color: `error`
            })
            if (role === 'student') {
                await API.graphql(graphqlOperation(deleteStudents, { deleteStudent: { rollNum: userName } }))
            }
        }
    }

    const SignUpStudent = async (userName, email, password, role, { code, name }) => {
        try {
            const res = await API.graphql(graphqlOperation(createStudents, { createStudentsInput: { name: userName, email: email }}));
            await API.graphql(graphqlOperation(createSelectedSubject, { createSelectedSubjectInput: { studentRoll: res.data.createStudents.rollNum, subjectCode: code }}));
            signUpUser((userName).toString(), email, password, role, code);
        } catch (error) {
            setLoading(false);
            setOpen(true);
            setMsg({
                msg: error.message,
                color: `error`
            })           
            console.log(error)
        }
    }

    const handleSubmit = async ({ userName, email, password, role, subject }) => {
        setLoading(true)
        role === `student` ? SignUpStudent(userName, email, password, role, subject) : signUpUser(userName, email, password, role);
    }

    useEffect(() => {
        const fetchSubjects = async () => {
            const res = await API.graphql(graphqlOperation(listSubjectss));
            setSubjects(res.data.listSubjectss);
        }
        fetchSubjects();
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
                        <Typography variant='h6' >
                            Create User Account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='userName' label={isStudent ? `Name` : `Username`} />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextFieldWrapper name='email' label='Email' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='password' label='Password' type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectionWrapper name='role' label='Role' options={roles} isstudent={isStudent} setisstudent={setIsStudent} />
                    </Grid>
                    {isStudent && (
                        <Grid item xs={12}>
                            <AutoSelectionWrapper name='subject' label='Subject' options={subjects} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <ButtonWrapper loading={loading} name='Create Account' />
                    </Grid>
                </Grid>
                <SnackBarWrapper open={open} setOpen={setOpen} msg={msg.msg} color={msg.color} />
            </Form>
        </Formik>
    )
}

export default SignUpForm;