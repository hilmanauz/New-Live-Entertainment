import { extendTheme } from "@chakra-ui/react";

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
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
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

export default theme;