import { forwardRef } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})


const SnackBarWrapper = ({ open, setOpen, msg, color }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarWrapper;