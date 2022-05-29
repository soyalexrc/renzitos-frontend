import Head from "next/head";
import {Paper, Typography} from "@mui/material";
import Link from "next/link";
import useGetProducts from "../../src/hooks/api/useGetProducts";

export default function Productos() {
  const {data, loading, error} = useGetProducts()
  console.log('data', data);

  return (
    <div>
      <Head>
        <title>Nunestros productos | Renzitos</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Paper elevation={5} sx={{p: 5}}>
          <Typography variant='h1'>
            Productos
          </Typography>
          <Link href='/'>home</Link>
        </Paper>
        {loading && <div>is Loading...</div>}

        {
          data && data.map((product) => (
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

