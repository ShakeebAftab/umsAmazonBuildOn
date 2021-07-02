import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField, useFormikContext } from 'formik';

const AutoSelectionWrapper = ({ name, options, label, otherProps }) => {

    const {field, meta} = useField(name);

    const { setFieldValue } = useFormikContext();

    const configSelect = {}

    if (meta && meta.touched && meta.error){
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
    <Autocomplete
        id="combo-box-demo"
        options={options}
        {...field}
        {...configSelect}
        {...otherProps}
        getOptionLabel={(option) => option.title}
        onChange = {(event, value) => setFieldValue(name, value)}
        renderInput={(params) => <TextField {...params} color='secondary' label={label} variant="outlined" />}
    />
    )
}

export default AutoSelectionWrapper;
