import { useContext } from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Auth } from 'aws-amplify';

// Context
import { AuthStateContext } from '../../State/AuthState'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
  },
  button: {
    fontWeight: 800,
  }
}));


const Header = ({ msg, hidden, isTeacher, buttonName, dashboard, setDashboard }) => {
  const classes = useStyles();

  const [, setAuthState,, setSignedIn] = useContext(AuthStateContext)
  
  const handleLogout = () => {
      Auth.signOut();
      setAuthState('');
      setSignedIn(false);
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" color='secondary'>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {msg ? msg : `WELCOME`}
                </Typography>
                {isTeacher && <Button color="inherit" className={classes.button} size="medium" onClick={() => setDashboard(setDashboard(!dashboard))}>{buttonName}</Button>}
                {hidden === true && <Button color="inherit" className={classes.button} size="medium" onClick={() => handleLogout()} >SIGN OUT</Button>}
            </Toolbar>
        </AppBar>
    </div>
  );
}

export default Header;