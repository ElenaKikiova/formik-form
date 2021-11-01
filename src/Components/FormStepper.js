import { React } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

import FIELDS from '../fields';


export default function FormStepper(props) {

  // Store state for steps
  const steps = useSelector((store) => store.steps);
  const currentStep = useSelector((store) => store.currentStep);
  const data = useSelector((store) => store.data);


  // Render stepper
  return (
    <Box sx={{ width: '100%', margin: '2.5rem 0 2rem 0' }}>
      {
        currentStep === steps.length ? (
        <>
          <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
            All steps completed. Thank you for signing up!
          </Typography>
          <ul>
            {
              Object.keys(data).map((field) => (
                data[field] !== "" && field !== "password" ? (
                  <li>{FIELDS[field]}: {data[field]}</li>
                ) : ''
              ))
            } 
          </ul>
        </>
        ) : (
          <Stepper activeStep={currentStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if(currentStep > index) {
                stepProps.completed = true;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        ) 
      }
    </Box>
  );
}