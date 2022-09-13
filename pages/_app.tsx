import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '../theme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import { ToastContainer } from "react-toast";
import favicon from '../assets/images/favicon.ico'
import Head from 'next/head'


const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
  // uri: 'https://sub.chayenu.dev/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <main className='main'>
            <Box className="content">
              <Component {...pageProps} />
            </Box>
            <ToastContainer position={"bottom-right"} delay={3000} />
          </main>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
