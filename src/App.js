import './App.scss';

import { Container, Card, Typography } from '@mui/material';

import FormStepper from './Components/FormStepper';
import FormSteps from './Components/FormSteps';

function App() {

  return (
  <Container>
    <Card variant="outlined" className="form">
      <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
        Formik form
      </Typography>
      <FormStepper></FormStepper>
      <FormSteps></FormSteps>
    </Card>
  </Container>);
}

export default App;
