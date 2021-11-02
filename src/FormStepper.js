
import { React, Children, useState } from 'react';

import  { Formik, Form } from 'formik';
import { Button, Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

import FIELDS from './fields';

export default function FormStepper({children, ...props}){

  const stepsArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = stepsArray[step];
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});

  const isLastStep = () => {
    return step === stepsArray.length - 1;
  };

  const goBack = () => {
    setStep((step) => step - 1);
  }

  const submit = (values, helpers) => {
    if(!isLastStep()){
      setStep((step) => step + 1);
    }
    else{
      setSubmitted(true);
      delete values.repeatPassword;
      setData(values);
    }
  }

  return(
    <Formik
      {...props}
      validationSchema={currentStep.props.validationSchema}
      onSubmit={submit}>
      <Form autoComplete="off">
        <Box sx={{ width: '100%', margin: '2.5rem 0 2rem 0' }}>
          <Stepper activeStep={step}>
            {stepsArray.map((child, index) => {
              const stepProps = {};
              const labelProps = {};
              if(step > index) {
                stepProps.completed = true;
              }
              return (
                <Step key={child.props.label} {...stepProps}>
                  <StepLabel {...labelProps}>{child.props.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        { !submitted ? 
          <Box>
            {currentStep}
            <Box sx={{ display: 'flex', marginTop: '1.5rem', justifyContent: 'space-between' }}>
              <Button onClick={goBack} disabled={step === 0}>BACK</Button>
              <Button type="submit">{!isLastStep() ? 'NEXT' : 'SUBMIT'}</Button>
            </Box>
          </Box>
        :
          <Box>
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
          </Box>
        }
      </Form>
    </Formik>
  );
}