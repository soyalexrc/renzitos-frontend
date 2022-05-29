import Head from "next/head";
import {Paper, Typography} from "@mui/material";
import groq from "groq";
import {getClient} from "../../lib/sanity-server";
import Link from "next/link";
import Image from "next/image";
import {urlFor} from "../../utils/image";

export default function Producto({ product }) {
  console.log('product', product);
  return (
    <div>
      <Head>
        <title>{product.title} | Renzitos</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Paper elevation={5} sx={{ m: 5, p: 5 }}>
        <Link href='/productos'>Volver</Link>
      </Paper>

      <main>
        <Paper elevation={5} sx={{p: 5}}>
          <Typography variant='h1'>
            Producto {product.slug.current} {product.title}
          </Typography>
          <Image src={urlFor(product.image)} width={500} height={500} />
        </Paper>

      </main>
    </div>
  );
}

const query = groq`
 *[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  brand,
  code,
  image,
  slug,
  stock,
  "categories": categories[]->{_id, title},
  "colors": colors[]->{_id, title, colorValue},
  "sizes": sizes[]->{_id, title},
  "genders": genders[]->{_id, title},
  materials,
  unitPrice,
  wholesalePrice
}
`

export async function getServerSideProps({params, preview = false}) {
  const product = await getClient(preview).fetch(query, {slug: params.slug})

  return {
    props: {
      product
    }
  }
}
