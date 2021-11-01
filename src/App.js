import './App.scss';

import { React, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import { Container, Card } from '@mui/material';

import FormStepper from './Components/FormStepper';
import Form from './Components/Form';

function App() {

  const theme = useTheme();



  return (
  <Container>
    <Card variant="outlined" className="form">
      <h1>Formik form</h1>

      
      <FormStepper></FormStepper>

      <Form></Form>

      
    </Card>
  </Container>);
}

export default App;
