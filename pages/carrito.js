import {useContext} from "react";
import {Store} from "../src/context/StoreContext";
import * as NextLink from 'next/link'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Box,
  Grid,
  Typography,
  Link,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody, Select, MenuItem, Button, Paper, List, ListItem, IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";


function CartScreen() {
  const {state: {cart: {cartItems}}, dispatch} = useContext(Store);
  const router = useRouter();

  async function updateCartHandler(item, quantity) {
    dispatch({
      type: 'ADD_ITEM', payload: {
        _key: item._key,
        name: item.name,
        slug: item.slug,
        unitPrice: item.unitPrice,
        wholeSalePrice: item.wholeSalePrice,
        image: item.image,
        quantity
      }
    })
  }

  function removeItemHandler(item) {
    dispatch({type: 'REMOVE_ITEM', payload: item})
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h1'>Carrito de productos</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        {
          cartItems.length === 0 &&
          <Box>
            <Typography variant='h4'>El carrito esta vacio...</Typography>
            <Typography variant='body1'>Mira mas de nuestros productos aqui abajo!</Typography>
            <NextLink href='/productos' passHref><Link>Mirar mas productos</Link></NextLink>
          </Box>
        }
        {
          cartItems.length > 0 &&
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align='right'>Cantidad</TableCell>
                  <TableCell align='right'>Precio</TableCell>
                  <TableCell align='right'>Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  cartItems.map(item => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/productos/${item.slug}`} passHref>
                          <Link>
                            <Image src={item.image} alt={item.name} width={50} height={50}/>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/productos/${item.slug}`} passHref>
                          <Link sx={{color: 'black'}}>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align='right'>
                        <Select
                          value={item.quantity}
                          onChange={(e) => updateCartHandler(item, e.target.value)}
                        >
                          {
                            [1, 2, 3, 4, 5, 6, 12, 48, 96, '100+'].map((value, index) => (
                              <MenuItem key={index + 1} value={value === '100+' ? 100 : value}>{value === '100+' ? 100 : value}</MenuItem>
                            ))
                          }
                        </Select>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography>${item.quantity < 12 ? item.unitPrice : item.wholeSalePrice}</Typography>
                      </TableCell>
                      <TableCell  align='right'>
                        <IconButton variant='contained' color='secondary' onClick={() => removeItemHandler(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Grid>
      {
        cartItems.length > 0 &&
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <List>
              <ListItem>
                <Typography>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} productos) : $ {cartItems.reduce((a, c) => a + c.quantity * c.unitPrice,  0)}
                </Typography>
              </ListItem>
              <ListItem>
                <Button color='primary' onClick={() => router.push('/envio')} fullWidth>Checkout</Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      }
    </Grid>
  )
}

export default dynamic(() => Promise.resolve(CartScreen, {ssr: false}))
