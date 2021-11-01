
import { React, useState } from 'react';

import { Formik, useFormik } from 'formik';

import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useSelector } from 'react-redux';

import * as Yup from 'yup';

export default function Form(props){

  const currentStep = useSelector((store) => store.currentStep);

  const initValues = [
    {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: null
    },
    {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: null
    },
  ]

  const validation = [
    // General step validation schema
    Yup.object().shape({
      firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      middleName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
      lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      gender: Yup.string().required('Required'),
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(formik);

  return (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
    >
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

      <FormControl fullWidth>
        <InputLabel id="gender-select">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender-select"
          value={formik.values.gender}
          label="Gender"
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Femaile</MenuItem>
          <MenuItem value="O">Prefer not to say</MenuItem>
        </Select>
      </FormControl>
      </>
    </Formik>
  )
}