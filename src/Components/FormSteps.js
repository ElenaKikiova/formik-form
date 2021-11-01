
import { React, useState } from 'react';

import { Formik, Form, useFormik } from 'formik';

import { TextField, FormHelperText, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { goNext } from '../store';

export default function FormSteps(props){
  const dispatch = useDispatch();

  const currentStep = useSelector((store) => store.currentStep);

  let formFields;

  const initValues = [
    {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: ''
    },
    {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: ''
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
        .max(50, 'Name should be max. 50 characters long')
        .required('Please enter your middle name'),
      lastName: Yup.string()
      .min(2, 'Name should be at least 2 characters long')
      .max(50, 'Name should be max. 50 characters long')
      .required('Required'),
      gender: Yup.string().required('Please select your gender'),
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
      console.log('e');
      dispatch(goNext(data));
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

          <FormControl fullWidth error={formik.touched.gender && formik.errors.gender}>
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
            {formik.errors.gender ? (
              <FormHelperText>
                {formik.errors.gender}
              </FormHelperText>) : ''
            }
          </FormControl>
        </>)

      default: 
        return null;
    }
  }

  console.log(formik);

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