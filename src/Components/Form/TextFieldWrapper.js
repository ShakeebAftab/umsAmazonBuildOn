import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...otherProps }) => {
    
    const [field, meta] = useField(name);

    let configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
        color: 'secondary' 
    }

    if (meta && meta.touched && meta.error){
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField {...configTextField} />
    )
}

export default TextFieldWrapper;
