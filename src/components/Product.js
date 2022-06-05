import {Paper, Typography} from "@mui/material";
import Image from "next/image";
import {urlFor, urlForThumbnail} from "../../utils/image";
import {useContext} from "react";
import {Store} from "../context/StoreContext";
import {useRouter} from "next/router";

export default function Product({ product }) {
  const {state: {cart: {cartItems}}, dispatch} = useContext(Store)
  const router = useRouter()

  function addToCart(item) {
    const existItem = cartItems.find(x => x._key === item._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({
      type: 'ADD_ITEM', payload: {
        _key: item._id,
        name: item.title,
        slug: item.slug.current,
        unitPrice: item.unitPrice,
        wholeSalePrice: item.wholeSalePrice,
        image: urlForThumbnail(item.image),
        quantity
      }
    })
    router.push('/carrito');
  }
  return (
    <Paper elevation={5} sx={{p: 5}}>
      <Typography variant='h1'>
        Producto {product.slug.current} {product.title}
      </Typography>
      <Image src={urlFor(product.image)} width={500} height={500} alt='imagen de prodcuto' />
      <button onClick={() => addToCart(product)}>add to cart</button>
    </Paper>
  )
}
