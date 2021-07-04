import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Auth } from 'aws-amplify';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper'
import ButtonWrapper from '../Form/ButtonWrapper';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'

const ConfirmForm = () => {

    const initialState = {
        userName: '',
        code: '',
    }
    
    const formSchema = Yup.object().shape({
        userName: Yup.string().required('Required'),
        code: Yup.string().required('Required').min(6, 'Must be exactly 6 characters').max(6, 'Must be exactly 6 characters')
    })

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({});

    const handleSubmit = async ({ userName, code }, form) => {
        setLoading(true);
        try {
            await Auth.confirmSignUp(userName, code);
            setOpen(true);
            setMsg({
                msg: `User successfully confirmed`,
                color: 'success'
            });
            setLoading(false);
        } catch (error) {
            setOpen(true);
            setMsg({
                msg: error.message,
                color: 'error'
            });
            setLoading(false);
            form();
        }
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
                            Confirm User
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='userName' label='Username' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='code' label='Code'/>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper loading={loading} name='Confirm User' />
                    </Grid>
                </Grid>
                <SnackBarWrapper open={open} setOpen={setOpen} msg={msg.msg} color={msg.color} />
            </Form>
        </Formik>
    )
}

export default ConfirmForm;
