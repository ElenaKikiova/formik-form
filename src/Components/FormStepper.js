import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { reset } from '../store';
import { useSelector, useDispatch } from 'react-redux';


export default function FormStepper(props) {
  const dispatch = useDispatch();

  // Store state for steps
  const steps = useSelector((store) => store.steps);
  const currentStep = useSelector((store) => store.currentStep);
  const data = useSelector((store) => store.data);

  const handleReset = () => {
    dispatch(reset());
  };

  // Render stepper
  return (
    <Box sx={{ width: '100%', margin: '2.5rem 0 2rem 0' }}>
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
      {
        currentStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed. Thank you for signing up!
          </Typography>
          <ul>
            {
              Object.keys(data).map((field) => (
                data[field] !== "" && field !== "password" ? (
                  <li>{field} {data[field]}</li>
                ) : ''
              ))
            } 
          </ul>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
        ) : '' 
      }
    </Box>
  );
}