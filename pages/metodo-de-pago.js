import CheckoutWizard from "../src/components/cart/CheckoutWizard";
import {Box, Button, Container, RadioGroup, Radio, Typography, FormControlLabel} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import {useContext, useEffect, useState} from "react";
import {Store} from "../src/context/StoreContext";
import {useRouter} from "next/router";
import {PaymentMethodSchema, ShippingSchema} from "../utils/validationSchemas";
import Cookies from 'js-cookie'

export default function PaymentScreen() {
  const {state, dispatch} = useContext(Store)
  const {userInfo, cart: {shippingAddress, paymentMethod}} = state;
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/envio')
    }
  }, [router, shippingAddress.address])

  const formik = useFormik({
    initialValues: {
      paymentMethod: paymentMethod,
    },
    validationSchema: PaymentMethodSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        setSubmitting(true);
        console.log()
        Cookies.set('paymentMethod', values.paymentMethod)
        dispatch({type: 'SAVE_PAYMENT_METHOD', payload: values.paymentMethod})
        router.push('/finalizar-pedido')
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
      <CheckoutWizard activeStep={2}/>
      <Container sx={{py: {xs: 5, md: 10}}}>
        <Box maxWidth={800} width="100%" display="block" mx="auto">
          <Typography variant="h4" aling={'center'} sx={{mb: 2}}>
            Informacion de pago
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <RadioGroup
                arai-label='Metodo de pago'
                name='metodo de pago'
                {...getFieldProps("paymentMethod")}
                error={Boolean(touched.paymentMethod && errors.paymentMethod)}
                helperText={touched.paymentMethod && errors.paymentMethod}
              >
                <FormControlLabel
                  label='Paypal'
                  value='Paypal'
                  control={<Radio/>}
                />
                <FormControlLabel
                  label='Tarjeta de debito o credito'
                  value='card'
                  control={<Radio/>}
                />
                <FormControlLabel
                  label='Binance USDT'
                  value='Binance'
                  control={<Radio/>}
                />
                <FormControlLabel
                  label='Efectivo'
                  value='Efectivo'
                  control={<Radio/>}
                />
              </RadioGroup>
              <Box display='flex' justifyContent='space-between' mt={5}>
                <Button
                  type='button'
                  color="secondary"
                  variant="contained"
                  onClick={() => router.push('envio')}
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || !isValid}
                  sx={{display: "block"}}
                >
                  {!isSubmitting && 'Pagar'}
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </div>

  )
}
