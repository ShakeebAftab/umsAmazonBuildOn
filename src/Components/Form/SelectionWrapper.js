import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectionWrapper = ({ name, options, ...otherProps }) => {

    const [field, meta] = useField(name);

    const { setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        const { value } = event.target;
        setFieldValue(name, value);
        if (otherProps.isstudent !== undefined && value === 'student') {
            otherProps.setisstudent(value)
            setFieldValue('isstudent', true)
        } else if (otherProps.isstudent !== undefined) {
            otherProps.setisstudent(false);
            setFieldValue('isStudent', false)
        }
    }

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: `outlined`,
        fullWidth: true,
        color: 'secondary',
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error){
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {Object.keys(options).map((option, pos) => (
                <MenuItem key={pos} value={option}>
                    {options[option]}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectionWrapper;
