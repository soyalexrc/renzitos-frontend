import {Badge, Box, Button, IconButton, Link, Menu, MenuItem} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {useContext, useState} from "react";
import {Store} from "../context/StoreContext";
import {useRouter} from 'next/router';
import * as NextLink from 'next/link';
import jsCookie from "js-cookie";

export default function Header() {
  const {state, dispatch} = useContext(Store)
  const {cart: {cartItems}, userInfo} = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  function loginMenuCloseHandler(e, redirect) {
    setAnchorEl(null)
    if (redirect) {
      router.push(redirect)
    }
  }

  function loginClickHandler(e) {
    setAnchorEl(e.currentTarget)
  }

  function logoutClickHandler() {
    setAnchorEl(null);
    dispatch({type: 'USER_LOGOUT'})
    jsCookie.remove('userInfo')
    jsCookie.remove('cartItems')
    jsCookie.remove('shippingAddress')
    jsCookie.remove('paymentMethod')
    router.push('/')
  }


  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', p: 5}}>
      <IconButton aria-label="cart" onClick={() => router.push('/carrito')}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>
      {
        userInfo &&
        <>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={loginClickHandler}
          >
            {userInfo.name}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={loginMenuCloseHandler}>
            <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/perfil')}>
              Profile
            </MenuItem>
            <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/historial-de-ordenes')}>
              Order History
            </MenuItem>
            <MenuItem onClick={logoutClickHandler}>
              Logout
            </MenuItem>
          </Menu>
        </>
      }
      {
        !userInfo &&
        <NextLink passHref href='/login'>
          <Link>
            Login
          </Link>
        </NextLink>
      }
    </Box>

  )
}
