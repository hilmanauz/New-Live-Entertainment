import React from "react";
import qs from "query-string";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import useWebAuth from "../engine/hooks/useWebAuth";
import { Auth0DecodedHash } from "auth0-js";
import styles from "../styles/Home.module.css";
import { Box, Center, CircularProgress, HStack, VStack, Text } from "@chakra-ui/react";
import useUserInfo from "../engine/hooks/useUserInfo";
import { ReactTypical } from '@deadcoder0904/react-typical'

export default function LoginPage() {
  const router = useRouter();
  const webAuth = useWebAuth();
  const userInfo = useUserInfo();
  React.useEffect(function handleLogin() {
    (async () => {
      const authResult = await new Promise<Auth0DecodedHash>((resolve) => {
        webAuth.parseHash((err, result) => {
          if (result && result.accessToken) resolve(result);
          else throw err;
        });
      });

      const accessToken = authResult.accessToken;

      if (!accessToken) return;

      Cookies.set("accessToken", accessToken, { expires: 1 });
    })();
  }, []);
  React.useEffect(() => {
    if (userInfo.data) {
      const parsedQuery = qs.parse(window.location.search);
      const entrypoint = parsedQuery.entrypoint;
      if (typeof entrypoint === "string") {
        setTimeout(() => {
          router.push(entrypoint);
        }, 1000)
      }
    }
  }, [userInfo.data])
  return (
    <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundColor="black">
      <Center bg={"white"} borderRadius={"4px"} width={{ md: "25vw", sm: "75vw" }} height={"50vh"} padding="32px">
        <VStack spacing={3}>
          <CircularProgress isIndeterminate color='blue.300' size={"3xs"} />
          <HStack fontWeight={"600"} fontSize={"20px"}>
            {
              !userInfo.data ?
                <>
                  <Text>
                    Trying to sign in
                  </Text>
                  <ReactTypical
                    steps={["", 1000, '.', 1000, "..", 1000, "...", 2000]}
                    loop={Infinity}
                    wrapper="div"
                  />
                </>
                :
                <>
                  <Text>
                    Sign in successfull!
                  </Text>
                </>
            }
          </HStack>
        </VStack>
      </Center>
    </Center>
  );
}