import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { green, lightBlue } from '@material-ui/core/colors';

import MultiStepForm from '../MultiStepForm/MultiStepForm';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
  }
});

function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <MultiStepForm />
    </ThemeProvider>
  );
}

export default App;
