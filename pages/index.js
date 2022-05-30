import Head from "next/head";
import {Paper, Typography} from "@mui/material";
import groq from "groq";
import {getClient} from "../lib/sanity-server";
import Link from "next/link";

export default function Home({ products }) {
  console.log('products', products);
  return (
    <div>
      <Head>
        <title>Home | Renzitos</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Paper elevation={5} sx={{p: 5}}>
          <Typography variant='h1'>
            home
          </Typography>
          <Link href='/productos'>productos</Link>
        </Paper>

        {
          products.map((product) => (
            <Paper key={product._id} elevation={2} sx={{ m: 5, p: 5 }}>
              <Typography variant='h3'>
                {product.title}
              </Typography>
              <Link href={`/productos/${product.slug.current}`}>Ir a verlo!</Link>
            </Paper>
          ))
        }

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

