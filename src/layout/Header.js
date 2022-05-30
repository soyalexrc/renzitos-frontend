import {Badge, IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {useContext} from "react";
import {Store} from "../context/StoreContext";

export default function Header() {
  const {state: {cart: {cartItems}}} = useContext(Store)
  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={cartItems.length} color="secondary">
        <ShoppingCartIcon/>
      </Badge>
    </IconButton>
  )
}
