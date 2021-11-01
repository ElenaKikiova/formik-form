import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { goNext, goBack, reset } from '../store';
import { useSelector, useDispatch } from 'react-redux';


export default function FormStepper(props) {
  const dispatch = useDispatch();
  const steps = useSelector((store) => store.steps);
  const currentStep = useSelector((store) => store.currentStep);

  const handleNext = () => {
    dispatch(goNext());
  };

  const handleBack = () => {
    dispatch(goBack());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <Box sx={{ width: '100%' }}>
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
      {currentStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={currentStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}