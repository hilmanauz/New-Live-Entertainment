import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Head from 'next/head'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Roboto', sans-serif",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
