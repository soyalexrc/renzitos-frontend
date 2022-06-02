import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../src/theme/createEmotionCache';
import ThemeConfig from '../src/theme'
import Layout from "../src/layout";
import {StoreProvider} from "../src/context/StoreContext";

// Client-side cache shared for the whole session
// of the users in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {

  const {
    Component, emotionCache =
      clientSideEmotionCache, pageProps
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport"
              content="initial-scale=1, width=device-width"/>
      </Head>

      {/* CssBaseline kickstart an elegant,
				consistent, and simple baseline to
				build upon. */}
      <ThemeConfig>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </ThemeConfig>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
