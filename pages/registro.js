import {Form, FormikProvider, useFormik} from "formik";
import {RegisterSchema} from "../utils/validationSchemas";
import {Box, Button, Container, Link, TextField, Typography} from "@mui/material";
import * as NextLink from "next/link";


export default function LoginScreen() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: RegisterSchema,
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
          Registrate
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
              {isSubmitting && 'Registrando...'}
              {!isSubmitting  && 'Registrarse'}
            </Button>
          </Form>
        </FormikProvider>
        <Typography>Ya tienes cuenta? <NextLink href='/login' passHref><Link>Inicia Sesion!</Link></NextLink></Typography>
      </Box>
    </Container>
  )
}


