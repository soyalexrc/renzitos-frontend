import Head from "next/head";
import styles from "../styles/Home.module.css";
import {Paper, Typography} from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next AppS</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <Paper elevation={5} sx={{p:5}}>
          <Typography variant='h1'>
            Welcome to <a href="https://nextjs.org">
            Next.js!</a> integrated with{" "}
            <a href="https://mui.com/">Material-UI!</a>
          </Typography>
          <Typography variant='body1'>
            Get started by editing{" "}
            <code className={styles.code}>
              pages/index.js</code>
          </Typography>
        </Paper>

      </main>
    </div>
  );
}
