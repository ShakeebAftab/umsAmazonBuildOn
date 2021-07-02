import { useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';

// Screen Imports
import MainApp from './Screens/MainApp';

// Context
import { AuthStateContext } from './State/AuthState';
import SignInScreen from './Screens/SignInScreen';

const App = () => {
  const [,, signedIn, setSignedIn] = useContext(AuthStateContext);

  useEffect(() => {
    const checkSignedIn = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setSignedIn(true);
      } catch (error) {
        setSignedIn(false);
      }
    }
    checkSignedIn();
  }, [setSignedIn])

  if (!signedIn) {
    return <SignInScreen />
  }

  return (
    <MainApp />
  );
}

export default App;

