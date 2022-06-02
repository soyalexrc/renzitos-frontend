import {Badge, Box, IconButton, Link} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {useContext} from "react";
import {Store} from "../context/StoreContext";
import * as NextLink from 'next/link';

export default function Header() {
  const {state} = useContext(Store)
  const { cart: {cartItems}, userInfo } = state
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
      <IconButton aria-label="cart">
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>
      {
        userInfo && 
        <NextLink href='/perfil' passHref>
          <Link>
            {userInfo.name}
          </Link>
        </NextLink>
      }
      <NextLink passHref href='/login'>
        <Link>
          Login
        </Link>
      </NextLink>
    </Box>

  )
}
