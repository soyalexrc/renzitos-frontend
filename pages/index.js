import Head from "next/head";
import styles from "../styles/Home.module.css";
import {Paper} from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <Paper elevation={5} sx={{p:5}}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">
            Next.js!</a> integrated with{" "}
            <a href="https://mui.com/">Material-UI!</a>
          </h1>
          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>
              pages/index.js</code>
          </p>
        </Paper>

      </main>
    </div>
  );
}
