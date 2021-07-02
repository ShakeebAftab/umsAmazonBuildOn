import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const DateWrapper = ({ name, ...otherProps }) => {

    const [field, meta] = useField(name);

    const configDate ={ 
        ...field,
        ...otherProps,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        color: 'secondary',
        InputLabelProps: { shrink: true },
    }

    if (meta && meta.touched && meta.error){
        configDate.error = true;
        configDate.helperText = meta.error;
    }

    return (
        <TextField {...configDate} />
    )
}

export default DateWrapper;
