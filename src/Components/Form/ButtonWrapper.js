
import { Button, CircularProgress } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ name, loading, ...otherProps }) => {
    const { submitForm } = useFormikContext();

    const handleSubmit = () => submitForm();

    const configButton = {
        variant: 'contained',
        color: 'secondary',
        fullWidth: true,
        onClick: handleSubmit,
        ...otherProps
    }

    return (
        <Button startIcon={loading === true && <CircularProgress color='inherit' size={20} />} {...configButton}>{name}</Button>
    )
}

export default ButtonWrapper;
