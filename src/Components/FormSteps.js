
import { React, useState } from 'react';

import { Formik, Form, useFormik } from 'formik';

import { TextField, FormHelperText, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { goNext } from '../store';

import REGEX from '../regex';

export default function FormSteps(props){
  const dispatch = useDispatch();

  const currentStep = useSelector((store) => store.currentStep);
  const steps = useSelector((store) => store.steps);

  const initValues = [
    {
      firstName: '',
      middleName: '',
      lastName: '',
      hairColor: '',
      gender: '',
    },
    {
      phone: '',
      email: '',
      address: '',
    },
    {
      password: '',
      repeatPassword: '',
    },
  ]

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

  const [values, setValues] = useState({});

  const formik = useFormik({
    values: values,
    initialValues: initValues[currentStep],
    validationSchema: validation[currentStep],
    handleChange: (event) => {
      setValues(prevValues => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    },
    onSubmit: values => {
      let data = JSON.stringify(values, null, 2);
      if(data.repeatPassword !== undefined) {
        delete data.repeatPassword;
      }
      dispatch(goNext(data));
      if(currentStep + 1 !== steps.length){
        formik.resetForm({
          values: initValues[currentStep + 1]
        });
      }
    },
  });

  const renderForm = () => {
    console.log(currentStep);
    switch (currentStep) {
      case 0: 
        return (
          <>
            <TextField 
              id="firstName" label="First name" name="firstName" 
              variant="outlined" 
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField 
              id="middleName" label="Middle name" name="middleName" 
              variant="outlined" 
              value={formik.values.middleName}
              onChange={formik.handleChange}
              error={formik.touched.middleName && Boolean(formik.errors.middleName)}
              helperText={formik.touched.middleName && formik.errors.middleName}
            />
            <TextField 
              id="lastName" label="Last name" name="lastName" 
              variant="outlined" 
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormControl>
              <InputLabel id="gender-select">Hair color</InputLabel>
              <Select
                labelId="hairColor-label"
                id="hairColor-select"
                value={formik.values.hairColor}
                onChange={formik.handleChange("hairColor")}
                label="Hair color"
              >
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"Brown"}>Brown</MenuItem>
                <MenuItem value={"Blonde"}>Blonde</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"Grey"}>Grey</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                value={formik.values.gender}
                onChange={formik.handleChange("gender")}
                label="Gender"
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
            <TextField 
              id="phone" label="Phone number" name="phone" 
              variant="outlined"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField 
              id="email" label="Email" name="email" 
              variant="outlined" 
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField 
              id="address" label="Address" name="address" 
              variant="outlined" 
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
            <TextField 
              id="password" label="Password" name="password" 
              variant="outlined" type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField 
              id="repeatPassword" label="Repeat password" name="repeatPassword" 
              variant="outlined" type="password"
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

        <Button type="submit">NEXT</Button>
      </Form>
    </Formik>
  )
}