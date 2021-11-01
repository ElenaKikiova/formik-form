
import { React, Children, useState } from 'react';

import  { Formik, Form } from 'formik';
import { Button, Box } from '@mui/material';

export default function Stepper({children, ...props}){

  const stepsArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = stepsArray[step];

  console.log(currentStep, props);

  const isLastStep = () => {
    return step === stepsArray.length
  };

  const goBack = () => {
    setStep((step) => step - 1);
  }

  const submit = async (values, helpers) => {
    console.log(values)
    if(!isLastStep()){
      setStep((step) => step + 1);
    }
    else{
      await props.onSubmit(values, helpers);
    }
  }

  console.log(currentStep.props.validationSchema)

  const reset = () => {

  }

  return(
    <Formik
      {...props}
      validationSchema={currentStep.props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log(values, helpers)
        if(!isLastStep()){
          setStep((step) => step + 1);
        }
        else{
          await props.onSubmit(values, helpers);
        }
      }}
      >
      <Form autoComplete="off">

        {currentStep}
        
        <Box sx={{ display: 'flex', marginTop: '1.5rem', justifyContent: 'space-between' }}>
          {
            !isLastStep() ? (
              <>
                <Button onClick={goBack} disabled={step === 0}>BACK</Button>
                <Button type="submit">NEXT</Button>
              </>
            )
            : (
              <Button type="submit">SUBMIT</Button>
            )
          }
        </Box>

      </Form>
    </Formik>
  );
}