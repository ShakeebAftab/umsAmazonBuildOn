import { useContext, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Auth } from 'aws-amplify';
import * as Yup from 'yup';

// Custom Components
import TextFieldWrapper from '../Form/TextFieldWrapper';
import ButtonWrapper from '../Form/ButtonWrapper';

// Context
import { AuthStateContext } from '../../State/AuthState';

const SignInForm = ({ setErr }) => {

    // Context
    const [,,, setSignedIn] = useContext(AuthStateContext);
    const [buttonLoading, setButtonLoading] = useState(false);

    const initialState = {
        userName: '',
        password: '',
    }
    
    const formSchema = Yup.object().shape({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    })


    const handleSubmit = async ({ userName, password }) => {
        setButtonLoading(true);
        const username = userName;
        try {
            await Auth.signIn({username, password});
            setSignedIn(true);
        } catch (error) {
            setErr(true);
            setButtonLoading(false);
            console.log(error); 
        }
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
                        <TextFieldWrapper name='userName' label='Username' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldWrapper name='password' label='Password' type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper loading={buttonLoading} name='Sign In' />
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}


export default SignInForm
