import { Modal, ModalOverlay, ModalContent, ModalBody, Center, Box, Img, VStack, Button, Text, useToast, Progress, CircularProgress, HStack } from '@chakra-ui/react';
import { BiAt, BiMailSend, BiVoicemail } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import type { NextPage } from 'next'
import useUserInfo from '../engine/hooks/useUserInfo';
import useWebAuth from '../engine/hooks/useWebAuth';
import Unity from "react-unity-webgl";
import React from 'react';
import useUnityContext from '../engine/hooks/useUnityContext';
import Cookies from 'js-cookie';
import styles from "../styles/Home.module.css";
import { ReactTypical } from '@deadcoder0904/react-typical'


const Home: NextPage = () => {
  const userInfo = useUserInfo();
  const webAuth = useWebAuth();
  const [progression, setProgression] = React.useState(0);
  const unityContext = useUnityContext();
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
  const toast = useToast();
  React.useEffect(() => {
    if (userInfo.data?.nickname) {
      unityContext.on("progress", function (progression) {
        if (progression === 1) {
          setProgression(99);
          setTimeout(() => {
            setProgression(100);
            setTimeout(() => {
              setProgression(101);
              toast({
                title: `Welcome ${userInfo?.data?.nickname}`,
                position: "bottom",
              });
            }, 3000)
          }, 2500);
        } else {
          setProgression(progression * 100);
        }
      });
    }
  },
    [userInfo.data?.nickname]
  );

  React.useEffect(() => {
    if (progression === 99) {
      setTimeout(() => {
        const character = Cookies.get(`${userInfo.data?.nickname}:SetCharacter`);
        unityContext.send("PlayerNameInput", "HandlePlayerIdentity", `${userInfo.data?.nickname}|${character ? true : false}|${character ? character : 1}`);
      }, 4000);
    }
  }, [progression]);

  unityContext.on("PlayerIdentity", function (userName, alreadyChooseCharacter, score) {
    Cookies.set(`${userName}:SetCharacter`, score);
  });

  if (!userInfo.data && !userInfo.error) return (
    <Box position={"absolute"} width={"100vw"} height={"100vh"} backgroundColor={"black"} />
  )

  if (userInfo.data) return (
    <Box position={"absolute"} width={"100vw"} height={"100vh"} backgroundColor={"black"}>
      {
        progression < 101 &&
        (
          <Center top={0} right={0} left={0} bottom={0} className={progression == 100 ? styles.loadingEntranceBackgroundBlur : styles.loadingEntranceBackground}>
            <Center backgroundColor={"white"} borderRadius={"4px"} width={{ md: "25vw", sm: "75vw" }} height={"50vh"} className={progression == 100 ? styles.loadingEntranceModalBlur : styles.loadingEntranceModal} padding="32px">
              {
                progression <= 99 &&
                <VStack spacing={3}>
                  <CircularProgress value={progression} isIndeterminate={progression === 99} color='blue.300' size={"3xs"} />
                  <HStack fontWeight={"600"} fontSize={"20px"}>
                    <Text>
                      Please Wait
                    </Text>
                    <ReactTypical
                      steps={["", 1000, '.', 1000, "..", 1000, "...", 2000]}
                      loop={Infinity}
                      wrapper="div"
                    />
                  </HStack>
                </VStack>
              }
            </Center>
          </Center>
        )
      }
      <Unity unityContext={unityContext} className={"unity-canvas"} />
    </Box>
  )

  return (
    <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundColor="black">
      <Center bg={"white"} borderRadius={"4px"} width={{ md: "25vw", sm: "75vw" }} height={"50vh"} padding="32px">
        <VStack alignItems={"normal"}>
          <Center>
            <Box fontWeight={"400"} fontSize={"25px"}>
              New Live Entertainment
            </Box>
          </Center>
          {/* <Text textAlign="center">{tour.description}</Text> */}
          <br />
          <VStack>
            <Button
              leftIcon={<BiMailSend />}
              width={["90%", "100%"]}
              color={"white"}
              size={"lg"}
              fontWeight={400}
              fontSize={["14px", "16px"]}
              _hover={{ backgroundColor: "black" }}
              borderRadius={"0px"}
              backgroundColor={"black"}
              _focus={{ borderWidth: "0px" }}
              onClick={handleLoginWithEmail}
            >
              Sign in with Email
            </Button>
            <Button
              leftIcon={<FcGoogle />}
              width={["90%", "100%"]}
              color={"white"}
              size={"lg"}
              fontWeight={400}
              fontSize={["14px", "16px"]}
              _hover={{ backgroundColor: "black" }}
              _focus={{ borderWidth: "0px" }}
              borderRadius={"0px"}
              backgroundColor={"black"}
              onClick={handleLoginWithGoogle}
            >
              Sign in with Google
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Center>
  )
}

export default Home
