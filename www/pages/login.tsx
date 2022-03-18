import React from "react";
import qs from "query-string";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import useWebAuth from "../engine/hooks/useWebAuth";
import { Auth0DecodedHash, Auth0UserProfile, WebAuth } from "auth0-js";
import styles from "../styles/Home.module.css";
import { Box, Center, CircularProgress, HStack, VStack, Text, Flex } from "@chakra-ui/react";
import useUserInfo from "../engine/hooks/useUserInfo";
import { ReactTypical } from '@deadcoder0904/react-typical'
import { decode, encode } from "string-encode-decode";
import axios from "axios";

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
      const qoreToken = await axios.post("/api/exchange-token", {token: accessToken});
      Cookies.set("token", qoreToken.data.token, {expires: 1});
      Cookies.set("accessToken", accessToken, { expires: 1 });
    })();
  }, []);
  React.useEffect(() => {
    if (userInfo.data) {
      const parsedQuery = qs.parse(window.location.search);
      const entrypoint = parsedQuery.entrypoint;
      Cookies.remove(`${userInfo.data?.nickname}:SetForm`);
      Cookies.remove(`${userInfo.data?.nickname}:SetCharacter`)
      if (typeof entrypoint === "string") {
        setTimeout(() => {
          router.push(entrypoint);
        }, 1000)
      }
    }
  }, [userInfo.data])
  return (
    <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundImage={"./welcome-page.jpeg"} backgroundPosition={"center"} backgroundSize={"cover"} className={styles.mainContent}>
      <Flex flexDirection={"column"} bg={"white"} borderRadius={"10px"} width={{ md: "25vw", sm: "75vw" }} minHeight={"50vh"}>
        <Center flexDirection={"column"} minHeight={"50vh"}>
          <CircularProgress isIndeterminate color='blue.300' size={"3xs"} marginBottom={"20px"} />
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
        </Center>
      </Flex>
    </Center>
  );
}
