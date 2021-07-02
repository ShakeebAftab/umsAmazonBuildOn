import { useState } from 'react';
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
import { createStudent, createSubject, deleteStudent, deleteSubject } from '../../graphql/mutations';

// Dummy Data
import { Subjects } from '../../data/Subjects'

const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    
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
    
    const roles = {
        admin: `Admin`,
        teacher: `Teacher`,
        student: `Student`
    }

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
                await API.graphql(graphqlOperation(deleteSubject, {deleteStudent: { subCode: code }}));
                await API.graphql(graphqlOperation(deleteStudent, { deleteStudent: { rollNum: userName } }))
            }
        }
    }

    const SignUpStudent = async (userName, email, password, role, { title, code }) => {
        try {
            const res = await API.graphql(graphqlOperation(createStudent, { createStudentInput: { name: userName }}));
            await API.graphql(graphqlOperation(createSubject, { createSubjectInput: { name: title, subCode: code, rollNum: res.data.createStudent.rollNum }}));
            signUpUser((res.data.createStudent.rollNum).toString(), email, password, role, code);
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
                            <AutoSelectionWrapper name='subject' label='Subject' options={Subjects} />
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