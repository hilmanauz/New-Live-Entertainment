import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Head from 'next/head'
import qore from '../engine/qore';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "MontThin",
        color: "#171717",
        fontSize: "14px",
        fontWeight: "400",
      },
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: "14px",
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "white",
          },
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
    Switch: {
      defaultProps: {
        size: "md",
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
          },
        },
      },
      sizes: {
        sm: {
          borderRadius: "4px",
          px: "13px",
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
    Button: {
      variants: {
        outline: {
          bg: "white",
        },
      },
      defaultProps: {
        variant: "solid",
        size: "md",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="manifest" href="manifest.json" />
      </Head>
      <qore.context.Provider value={{ client: qore.client }}>
        <Component {...pageProps} />
      </qore.context.Provider>
    </ChakraProvider>
  )
}

export default MyApp
