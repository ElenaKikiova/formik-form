import './App.scss';

import { Container, Card, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import { Field, ErrorMessage } from 'formik';

import FormStepper from './Components/FormStepper';
import Step from './Components/Step';

import * as Yup from 'yup';

import REGEX from './regex';
import FIELDS from './fields';

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

      <Typography variant="h3">
        Formik form
      </Typography>
      
      <FormStepper
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

        <Step label="General" validationSchema={validation[0]}>
          <Field
            name="firstName"
            component={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label={FIELDS.firstName} 
                {...field}
              />
            ))} />
            <ErrorMessage name="firstName" component="Error"/>
          <Field
            name="middleName"
            component={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label={FIELDS.middleName} 
                {...field} 
              />
            ))} />
            <ErrorMessage name="middleName" className="error"/>
          <Field
            name="lastName"
            component={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label={FIELDS.lastName} 
                {...field} 
              />
            ))} />
            <ErrorMessage name="lastName" className="error"/>
          <Field
            name="hairColor"
            component={(({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="hairColor-label-select">{FIELDS.hairColor}</InputLabel>
                <Select
                  id="hairColor-select"
                  label={FIELDS.hairColor} 
                  {...field}
                >
                  <MenuItem value={"Black"}>Black</MenuItem>
                  <MenuItem value={"Brown"}>Brown</MenuItem>
                  <MenuItem value={"Blonde"}>Blonde</MenuItem>
                  <MenuItem value={"Red"}>Red</MenuItem>
                  <MenuItem value={"Grey"}>Grey</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            ))} />
            <ErrorMessage name="hairColor" className="error"/>
          <Field
            name="gender"
            component={(({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="hairColor-label-select">{FIELDS.gender}</InputLabel>
                <Select
                  id="hairColor-select"
                  label={FIELDS.gender} 
                  {...field}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            ))} />
            <ErrorMessage name="hairColor" className="error"/>
        </Step>

        <Step label="Contact info" validationSchema={validation[1]}>
          <Field
            name="phone"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label={FIELDS.phone}
                name="phone" 
                {...field} 
              />
            ))} />
            <ErrorMessage name="phone" className="error"/>
          <Field
            name="email"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label={FIELDS.email}
                name="email"
                {...field} 
              />
            ))} />
            <ErrorMessage name="email" className="error"/>
          <Field 
            name="address"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                label="Address"
                name="address"
                {...field} 
              />
            ))} />
            <ErrorMessage name="address" className="error"/>
        </Step>

        <Step label="Password" validationSchema={validation[2]}>
          <Field
            name="password"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="Password"
                name="password" 
                {...field} 
              />
            ))} />
            <ErrorMessage name="password" className="error"/>
          <Field fullWidth
            name="repeatPassword"
            render={(({ field }) => (
              <TextField 
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="Repeat password"
                name="repeatPassword"
                {...field} 
              />
            ))} />
            <ErrorMessage name="repeatPassword" className="error"/>
        </Step>
        
      </FormStepper>
    </Card>
  </Container>);
}

export default App;

export function Error(message){
  return <Typography className="error">{message}</Typography>
}