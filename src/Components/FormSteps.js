
import { React, useState } from 'react';

import { Formik, Form, useFormik } from 'formik';

import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { goNext, goBack, reset } from '../store';

import REGEX from '../regex';
import FIELDS from '../fields';

export default function FormSteps(props){
  const dispatch = useDispatch();

  // Store state for steps
  const currentStep = useSelector((store) => store.currentStep);
  const steps = useSelector((store) => store.steps);
  const data = useSelector((store) => store.data);

  // Current values state
  const [values, setValues] = useState({});

  // Validation schemas for each step
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

  // Formik instance 
  const formik = useFormik({
    // Use initial values and validation depending on step index
    values: values,
    initialValues: data,
    validationSchema: validation[currentStep],
    // Track changes in the fields
    handleChange: (event) => {
      setValues(prevValues => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    },
    // On submit: delete repeat password field, send data to store and reset formik
    onSubmit: data => {
      delete data.repeatPassword;
      dispatch(goNext(data));
      formik.resetForm({
        values: data
      });
    },
  });

  const goBackButton = () => {
    dispatch(goBack());
  }

  const resetButton = () => {
    dispatch(reset());
  };

  // Rendering form depending on step index
  const renderForm = () => {
    switch (currentStep) {
      case 0: 
        return (
          <>
            <TextField fullWidth
              id="firstName" label={FIELDS.firstName} name="firstName" 
              variant="outlined" margin="normal"  
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField fullWidth
              id="middleName" label={FIELDS.middleName} name="middleName" 
              variant="outlined" margin="normal"  
              value={formik.values.middleName}
              onChange={formik.handleChange}
              error={formik.touched.middleName && Boolean(formik.errors.middleName)}
              helperText={formik.touched.middleName && formik.errors.middleName}
            />
            <TextField fullWidth
              id="lastName" label={FIELDS.lastName} name="lastName" 
              variant="outlined" margin="normal"  
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormControl fullWidth margin="normal" >
              <InputLabel id="gender-select">{FIELDS.hairColor}</InputLabel>
              <Select
                labelId="hairColor-label"
                id="hairColor-select"
                value={formik.values.hairColor}
                onChange={formik.handleChange("hairColor")}
                label={FIELDS.hairColor}
              >
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"Brown"}>Brown</MenuItem>
                <MenuItem value={"Blonde"}>Blonde</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"Grey"}>Grey</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" >
              <InputLabel id="gender-select">{FIELDS.gender}</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                value={formik.values.gender}
                onChange={formik.handleChange("gender")}
                label={FIELDS.gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </>
        )

      case 1: 
        return (
          <>
            <TextField fullWidth
              id="phone" label={FIELDS.phone} name="phone" 
              variant="outlined" margin="normal" 
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField fullWidth
              id="email" label={FIELDS.email} name="email" 
              variant="outlined" margin="normal" 
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField fullWidth
              id="address" label={FIELDS.address} name="address" 
              variant="outlined" margin="normal" 
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </>
        )

      case 2: 
        return (
          <>
            <TextField fullWidth
              id="password" label={FIELDS.password} name="password" 
              variant="outlined" type="password" margin="normal" 
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField fullWidth
              id="repeatPassword" label={FIELDS.repeatPassword} name="repeatPassword" 
              variant="outlined" type="password" margin="normal" 
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
              helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
            />
          </>
        )

      default: 
        return null;
    }
  }

  return (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
    >
      <Form onSubmit={formik.handleSubmit}>
        { renderForm() }
        
        <Box sx={{ display: 'flex', marginTop: '1.5rem', justifyContent: 'space-between' }}>
          {
            currentStep < steps.length ? (
              <>
                <Button onClick={goBackButton} disabled={currentStep === 0}>BACK</Button>
                <Button type="submit">NEXT</Button>
              </>
            )
            : (
              <Button onClick={resetButton}>Reset</Button>
            )
          }
          </Box>
      </Form>
    </Formik>
  )
}