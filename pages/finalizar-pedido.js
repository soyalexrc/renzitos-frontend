import CheckoutWizard from "../src/components/cart/CheckoutWizard";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Link,
  Table,
  Paper,
  TableContainer,
  TableHead, TableRow,
  Typography, TableBody, TableCell
} from "@mui/material";
import * as NextLink from 'next/link';
import {useContext, useEffect, useState} from "react";
import {Store} from "../src/context/StoreContext";
import {useRouter} from "next/router";
import Cookies from 'js-cookie'
import Image from "next/image";
import dynamic from 'next/dynamic';
import axios from "axios";

function PlaceOrderScreen() {
  const {state, dispatch} = useContext(Store)
  const [loading, setLoading] = useState(false);
  const {userInfo, cart: {shippingAddress, paymentMethod, cartItems}} = state;
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(cartItems.reduce((a, c) => a + c.unitPrice * c.quantity, 0))
  const shippingPrice = itemsPrice > 200 ? 0 : 15
  const taxPrice = round2(itemsPrice * 0.12)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/metodo-de-pago')
    }
    if (cartItems.length === 0) {
      router.push('/carrito')
    }
  }, [cartItems.length, paymentMethod, router])

  async function placeOrder() {
    try {
      setLoading(true)
      const {data} = await axios
        .post('/api/orders', {
            orderItems: cartItems.map((x) => ({
              ...x,
              countInStock: undefined,
              slug: undefined,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`
            }
          });
      // await dispatch({type: 'CLEAR_CART'})
      // Cookies.remove('cartItems')
      setLoading(false)
      // router.push(`/orden/${data}`)

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <Box>
      <CheckoutWizard activeStep={3}/>
      <Container>
        <Typography variant="h4" aling={'center'} sx={{mb: 2}}>
          Finalizar pago
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper elevation={2} sx={{p: 3, mb: 5}}>
              <List>
                <ListItem>
                  <Typography variant='h4'>Direccion de envio</Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </ListItem>
                <ListItem>
                  <Button variant='contained' size='small' color='secondary' onClick={() => router.push('/envio ')}>
                    Editar
                  </Button>
                </ListItem>
              </List>
            </Paper>
            <Paper elevation={2} sx={{p: 3, mb: 5}}>
              <List>
                <ListItem>
                  <Typography variant='h4'>Metodo de pago</Typography>
                </ListItem>
                <ListItem>
                  {paymentMethod}
                </ListItem>
                <ListItem>
                  <Button variant='contained' size='small' color='secondary' onClick={() => router.push('/pago ')}>
                    Editar
                  </Button>
                </ListItem>
              </List>
            </Paper>
            <Paper elevation={2} sx={{p: 3, mb: 5}}>
              <List>
                <ListItem>
                  <Typography variant='h4'>Productos</Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Imagen</TableCell>
                          <TableCell>Nomnbre</TableCell>
                          <TableCell align='right'>Cantidad</TableCell>
                          <TableCell align='right'>Precio</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map(item => (
                          <TableRow key={item._key}>
                            <TableCell>
                              <NextLink href={`/productos/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/productos/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align='right'>
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align='right'>
                              <Typography>$ {item.unitPrice}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{p: 3}}>
              <List>
                <ListItem>
                  <Typography variant='h4'>Total de orden</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Productos: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>$ {itemsPrice} </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Envio: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>$ {shippingPrice} </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right'>$ {totalPrice} </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button variant='contained' size='small' fullWidth disabled={loading}
                          onClick={placeOrder}>Comprar</Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), {ssr: false})
