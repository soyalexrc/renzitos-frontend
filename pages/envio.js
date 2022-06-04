import CheckoutWizard from "../src/components/cart/CheckoutWizard";
import {Box, Button, Container, Link, TextField, Typography} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import * as NextLink from "next/link";
import {RegisterSchema, ShippingSchema} from "../utils/validationSchemas";
import axios from "axios";
import Cookies from "js-cookie";
import {useContext, useEffect} from "react";
import {Store} from "../src/context/StoreContext";
import {useRouter} from "next/router";

export default function ShippingScreen() {
  const {state, dispatch} = useContext(Store)
  const {userInfo, cart: { shippingAddress }} = state;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/envio')
    }
  }, [router, userInfo])

  const formik = useFormik({
    initialValues: {
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
    },
    validationSchema: ShippingSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        setSubmitting(true);
        dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: values})
        Cookies.set('shippingAddress', JSON.stringify(values));
        router.push('/metodo-de-pago')
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
    <div>
      <CheckoutWizard activeStep={1} />
      <Container sx={{py: {xs: 5, md: 10}}}>
        <Box maxWidth={800} width="100%" display="block" mx="auto">
          <Typography variant="h4" aling={'center'} sx={{mb: 2}}>
            Informacion de envio
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography variant="body1">Nombre completo *</Typography>
              <TextField
                fullWidth
                type="text"
                size="small"
                placeholder="Nombre completo"
                {...getFieldProps("fullName")}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{mb: 2}}
              />
              <Typography variant="body1">Direccion completa *</Typography>
              <TextField
                fullWidth
                type="text"
                {...getFieldProps("address")}
                size="small"
                placeholder="Direccion completa"
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                sx={{mb: 2}}
              />

              <Typography variant="body1">Ciudad *</Typography>
              <TextField
                fullWidth
                type="text"
                {...getFieldProps("city")}
                size="small"
                placeholder="Direccion completa"
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
                sx={{mb: 2}}
              />

              <Typography variant="body1">Codigo postal *</Typography>
              <TextField
                fullWidth
                type="text"
                {...getFieldProps("postalCode")}
                size="small"
                placeholder="Direccion completa"
                error={Boolean(touched.postalCode && errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
                sx={{mb: 2}}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting || !isValid}
                sx={{display: "block", mx: "auto"}}
              >
                {!isSubmitting && 'Pagar'}
              </Button>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </div>
  )
}
