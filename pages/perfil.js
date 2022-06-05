import {Box, Button, Container, TextField, Typography} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Store } from '../src/context/StoreContext';
import {Form, FormikProvider, useFormik} from "formik";
import {RegisterSchema} from "../utils/validationSchemas";
import Cookies from "js-cookie";

function ProfileScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  console.log(userInfo)

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [router, userInfo]);

  const formik = useFormik({
    initialValues: {
      name: userInfo ? userInfo.name : '' ,
      email: userInfo ? userInfo.email : '',
      password: "",
      confirmationPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        setSubmitting(true);
        const {data} = await axios.put('/api/users/profile', {
          name: values.name,
          email: values.email,
          password: values.password
        },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        )
        dispatch({type: 'USER_LOGIN', payload: data})
        Cookies.set('userInfo', JSON.stringify(data));
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        // resetForm();
        setSubmitting(false);
      }
    },
  });

  const {errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid} = formik;

  return (
    <Container sx={{py: {xs: 5, md: 10}}}>
      <Box maxWidth={800} width="100%" display="block" mx="auto">
        <Typography variant="h2" sx={{mb: 2}}>
          Actualiza tu informacion
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="body1">Nombre *</Typography>
            <TextField
              fullWidth
              type="text"
              {...getFieldProps("name")}
              size="small"
              placeholder="Escribir texto"
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              sx={{mb: 2}}
            />
            <Typography variant="body1">Email *</Typography>
            <TextField
              fullWidth
              type="text"
              {...getFieldProps("email")}
              size="small"
              placeholder="mail@ejemplo.com"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{mb: 2}}
            />

            <Typography variant="body1">Contrasena</Typography>
            <TextField
              fullWidth
              type="text"
              {...getFieldProps("password")}
              size="small"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{mb: 3}}
            />
            <Typography variant="body1">Conirmar contrasena</Typography>
            <TextField
              fullWidth
              type="text"
              {...getFieldProps("confirmationPassword")}
              size="small"
              error={Boolean(touched.confirmationPassword && errors.confirmationPassword)}
              helperText={touched.confirmationPassword && errors.confirmationPassword}
              sx={{mb: 3}}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting || !isValid}
              sx={{display: "block", mx: "auto"}}
            >
              {isSubmitting && 'Actualizando...'}
              {!isSubmitting && 'Actualizar'}
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(ProfileScreen), { ssr: false });
