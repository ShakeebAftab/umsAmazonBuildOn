import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper'
import ButtonWrapper from '../Form/ButtonWrapper';

const AdminForm = () => {
    
    const initialState = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    
    const formSchema = Yup.object().shape({
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required').min(8, 'Must be atleast 8 characters'),
        confirmPassword: Yup.string().required('Required').min(8, 'Must be atleast 8 characters'),
    })

    const handleSubmit = async ({ userName, email, password }, form) => {
        console.log(`handleSubmit`);
        form();
    }

    return (
        <Formik
            initialValues={{...initialState}}
            validationSchema={formSchema}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h6' >
                            Create User Email
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='userName' label='Username' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='email' label='Email' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='password' label='Password' type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='confirmPassword' label='Confirm Password' type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper name='Create Email' />
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default AdminForm;