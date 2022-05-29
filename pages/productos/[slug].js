import Head from "next/head";
import {Paper, Typography} from "@mui/material";
import groq from "groq";
import {getClient} from "../../lib/sanity-server";

export default function Producto({ product }) {
  console.log('product', product);
  return (
    <div>
      <Head>
        <title>{product.title} | Renzitos</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Paper elevation={5} sx={{p: 5}}>
          <Typography variant='h1'>
            Producto {product.slug.current} {product.title}
          </Typography>
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
  "colors": colors[]->{_id, title, value},
  "sizes": sizes[]->{_id, title},
  "genders": genders[]->{_id, title},
  materials,
  unitPrice,
  wholesalePrice
}
`
export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "product" && defined(slug.current)][].slug.current`
  )
  console.log('paths:', paths);

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps({params, preview = false}) {
  const product = await getClient(preview).fetch(query, {slug: params.slug})

  return {
    props: {
      product,
    }
  }
}


