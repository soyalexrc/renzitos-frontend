import Head from "next/head";
import {Button, Grid, Paper, Typography} from "@mui/material";
import groq from "groq";
import {getClient} from "../lib/sanity-server";
import Link from "next/link";
import {urlForThumbnail} from "../utils/image";
import {useContext} from "react";
import {Store} from "../src/context/StoreContext";
import FiltersDesktop from "../src/components/FiltersDesktop";
import SortDesktop from "../src/components/SortDektop";

export default function Home({ products }) {

  const {state: {cart: {cartItems}}, dispatch} = useContext(Store)

  async function addToCartHandler(item) {
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
  }

  console.log('products', products);
  return (
    <div>
      <Head>
        <title>Home | Renzitos</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 1 }}>
              <FiltersDesktop />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <SortDesktop />
            <Paper elevation={5} sx={{p: 5}}>
              <Typography variant='h1'>
                home
              </Typography>
              <Link href='/productos'>productos</Link>
            </Paper>

            {
              products.map((product) => (
                <Paper key={product._id} elevation={2} sx={{ my: 5, p: 5 }}>
                  <Typography variant='h3'>
                    {product.title}
                  </Typography>
                  <Link href={`/productos/${product.slug.current}`}>Ir a verlo!</Link>
                  <Button onClick={() => addToCartHandler(product)}>Agregar al carrito</Button>
                </Paper>
              ))
            }
          </Grid>
        </Grid>

      </main>
    </div>
  );
}

const query = groq`
 *[_type == "product"] {
  _id,
  title,
  brand,
  code,
  image,
  slug,
  stock,
  "categories": categories[]->{_id, title},
  "colors": colors[]->{_id, title, value},
  "sizes": sizes[]->{_id, title},
  "genders": genders[]->{_id, title},
  materials,
  unitPrice,
  wholesalePrice
}
`

export async function getServerSideProps({preview = false}) {
  const products = await getClient(preview).fetch(query)
  console.log('server Product', products);
  return {
    props: {
      products
    }
  }
}

