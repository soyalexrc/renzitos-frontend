import {Form, FormikProvider, useFormik} from "formik";
import {LoginSchema} from "../utils/validationSchemas";
import * as NextLink from 'next/link'
import {Box, Button, Container, TextField, Typography, Link} from "@mui/material";


export default function LoginScreen() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        setSubmitting(true);
        await console.log(values);
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error(error);
        resetForm();
        setSubmitting(false);
      }
    },
  });

  const {errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid} = formik;

  return (
    <Container sx={{py: {xs: 5, md: 10}}}>
      <Box maxWidth={800} width="100%" display="block" mx="auto">
        <Typography variant="h2" sx={{mb: 2}} >
          Inicia Sesion
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting || !isValid}
              sx={{display: "block", mx: "auto"}}
            >
              {isSubmitting && 'Ingresando...'}
              {!isSubmitting  && 'Ingresar'}
            </Button>
          </Form>
        </FormikProvider>
      <Typography> No tienes cuenta aun? <NextLink href='/registro' passHref><Link>Registrate!</Link></NextLink></Typography>
      </Box>
    </Container>
  )
}


