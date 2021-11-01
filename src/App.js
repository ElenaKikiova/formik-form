import './App.scss';

import { Container, Card, TextField } from '@mui/material';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import Stepper from './Components/Stepper';
import Step from './Components/Step';
// import { React, useState } from 'react';

import * as Yup from 'yup';

import REGEX from './regex';

function App() {

  const validation = [
    // General step validation schema
    Yup.object().shape({
      firstName: Yup.string()
        .min(2, 'Name should be at least 2 characters long!')
        .max(50, 'Name should be max. 50 characters long')
        .required('Please enter your first name'),
      middleName: Yup.string()
        .min(2, 'Name should be at least 2 characters long')
        .max(50, 'Name should be max. 50 characters long'),
      lastName: Yup.string()
        .min(2, 'Name should be at least 2 characters long')
        .max(50, 'Name should be max. 50 characters long'),
      hairColor: Yup.string(),
      gender: Yup.string()
    }),
    // Contact info validation schema
    Yup.object().shape({
      phone: Yup.string().matches(REGEX.phone, 'This phone number is not valid'),
      email: Yup.string()
        .required('Please enter your email')
        .matches(REGEX.email, 'This email is not valid'),
      address: Yup.string()
        .min(2, 'Address should be at least 2 characters long')
        .max(50, 'Address should be max. 50 characters long'),
    }),
     // Password validation schema
     Yup.object().shape({
      password: Yup.string()
        .required('Please enter your password')
        .matches(REGEX.password, 'Your password should be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character'),
      repeatPassword: Yup.string()
        .required('Please repeat your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
  ];

  return (
  <Container>
    <Card variant="outlined" className="form">
      
      <Stepper
        initialValues={{
          firstName: '',
          middleName: '',
          lastName: '',
          hairColor: '',
          gender: '',
          phone: '',
          email: '',
          address: '',
          password: '',
          repeatPassword: ''
        }}
        onSubmit={() => {}}
      >
        <Step validationSchema={validation[0]}>
          <Field fullWidth
            name="firstName"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label="First name"
                name="firstName" 
                {...field} 
              />
            ))} />
            <ErrorMessage name="firstName"/>
          <Field fullWidth
            name="middleName"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label="Middle name"
                name="middleName"
                {...field} 
              />
            ))} />
            <ErrorMessage name="middleName"/>
          <Field fullWidth
            name="lastName"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last name"
                name="lastName"
                {...field} 
              />
            ))} />
            <ErrorMessage name="lastName"/>
        </Step>
        
      </Stepper>
    </Card>
  </Container>);
}

export default App;