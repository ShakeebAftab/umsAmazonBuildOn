import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Font Import
import '@fontsource/roboto';

// CSS Reset
import { CssBaseline } from '@material-ui/core';

// Global State
import { AuthStateProvider } from './State/AuthState';

// Amplify Setup
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider>
      <CssBaseline />
      <App />
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);