import { VStack, Center, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { BiMailSend } from 'react-icons/bi'
import styles from "../../styles/Home.module.css";
import { FcGoogle } from 'react-icons/fc'
import useWebAuth from '../hooks/useWebAuth';

function LoginModal() {
  const webAuth = useWebAuth();
  const handleLoginWithGoogle = React.useCallback(() => {
    webAuth.authorize({
      connection: "google-oauth2",
      responseType: "token id_token",
      redirectUri: `${window.location.origin}/login?entrypoint=${window.location.pathname}`,
    });
  }, []);
  const handleLoginWithEmail = React.useCallback(() => {
    webAuth.authorize({
      connection: "Username-Password-Authentication",
      responseType: "token id_token",
      redirectUri: `${window.location.origin}/login?entrypoint=${window.location.pathname}`,
    });
  }, []);
  return (
    <VStack>
      <Center width={"full"} height={"175px"} className={styles.border} borderTopRadius={"10px"}>
        <Box fontFamily={"GaliverSans"} textAlign={"center"} fontSize={["20px", "25px"]} color={"white"}>
          New Live Entertainment
        </Box>
      </Center>
      <Center height={"full"} width={"full"} flexDirection={"column"} alignItems={"normal"} color={"black"} padding={"32px"}>
        <VStack spacing={4}>
          <Button
            leftIcon={<BiMailSend fontSize={"26px"} />}
            width={["90%", "80%"]}
            color={"white"}
            fontFamily={"MontRegular"}
            size={"lg"}
            fontSize={["14px", "20px"]}
            borderRadius={"8px"}
            className={styles.buttonBackground1}
            _focus={{ borderWidth: "0px" }}
            onClick={handleLoginWithEmail}
          >
            Sign in with Email
          </Button>
          <Button
            leftIcon={<FcGoogle fontSize={"26px"} />}
            width={["90%", "80%"]}
            fontFamily={"MontRegular"}
            color={"white"}
            size={"lg"}
            fontSize={["14px", "20px"]}
            className={styles.buttonBackground2}
            _focus={{ borderWidth: "0px" }}
            borderRadius={"8px"}
            onClick={handleLoginWithGoogle}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Center>
    </VStack>
  )
}

export default LoginModal