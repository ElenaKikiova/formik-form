import './App.scss';

import { Container, Card } from '@mui/material';

import FormStepper from './Components/FormStepper';
import FormSteps from './Components/FormSteps';

function App() {

  return (
  <Container>
    <Card variant="outlined" className="form">
      <h1>Formik form</h1>
      <FormStepper></FormStepper>
      <FormSteps></FormSteps>
    </Card>
  </Container>);
}

export default App;
