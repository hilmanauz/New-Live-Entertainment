import { Modal, ModalOverlay, ModalContent, ModalBody, Center, Box, Img, VStack, Button, Text, useToast, Progress, CircularProgress, HStack, ModalCloseButton, ModalFooter, ModalHeader, useDisclosure, IconButton, Flex, Spacer, Icon } from '@chakra-ui/react';
import { BiArrowToRight, BiAt, BiChevronLeft, BiChevronRight, BiFullscreen, BiInfoCircle, BiMailSend, BiSkipNext, BiVoicemail } from "react-icons/bi";
import type { NextPage } from 'next'
import useUserInfo from '../engine/hooks/useUserInfo';
import Unity from "react-unity-webgl";
import React from 'react';
import useUnityContext from '../engine/hooks/useUnityContext';
import Cookies from 'js-cookie';
import styles from "../styles/Home.module.css";
import { ReactTypical } from '@deadcoder0904/react-typical'
import ReactPlayer from 'react-player';
import Carousel from "nuka-carousel";
import FormModal from '../engine/components/FormModal';
import WelcomePage from '../engine/components/WelcomePage';

const Home: NextPage = () => {
  const userInfo = useUserInfo();
  const [progression, setProgression] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const gameDisclosure = useDisclosure();
  const [isSelectCharacter, setIsSelectCharacter] = React.useState(false);
  const unityContext = useUnityContext();
  const boxDisclosure = useDisclosure();
  React.useEffect(() => {
    if (userInfo.data?.nickname) {
      unityContext.on("progress", function (progression) {
        if (progression === 1) {
          setProgression(99);
        } else {
          setProgression(progression * 100);
        }
      });
    }
  },
    [userInfo.data?.nickname]
  );``
  const character = Cookies.get(`${userInfo.data?.nickname}:SetCharacter`);
  const username = Cookies.get(`${userInfo.data?.nickname}:SetForm`);

  React.useEffect(() => {
    username && userInfo.data && gameDisclosure.onOpen();
  }, [username]);

  const accessToken = Cookies.get("accessToken");
  React.useEffect(() => {
    if (progression === 99) {
      const username = Cookies.get(`${userInfo.data?.nickname}:SetForm`);
      setTimeout(() => {
        unityContext.send("PlayerNameInput", "HandlePlayerIdentity", `${username}|${character ? true : false}|${character ? character : 1}`);
      }, 4000);
      unityContext.on("PlayerIdentity", function (userName, alreadyChooseCharacter, character) {
        setIsSelectCharacter(true);
        Cookies.set(`${userName}:SetCharacter`, character, { expires: 1 });
      });
      unityContext.on("StartGame", function (message) {
        setStatus(message);
      });
    }
  }, [progression]);
  React.useEffect(() => {
    if (userInfo.data?.nickname) {
      if (status === "Game Already In Room" && character) {
        !isSelectCharacter && setProgression(100);
        setTimeout(() => {
          !isSelectCharacter && setProgression(101);
          boxDisclosure.onOpen();
        }, !isSelectCharacter ? 3000 : 1000);
        return;
      } else if (status === "Game Already Start" && !character) {
        setProgression(100);
        setTimeout(() => {
          setProgression(101);
        }, 4000);
      }
    }
  }, [status]);

  const logInfo = React.useMemo(() => {
    if (!character) {
      return "-Don't forget to choose your character-";
    } else {
      if (progression === 99 && status === "Game Already Start") {
        return "-Joining the room-"
      }
    }
  }, [status, progression, character])

  unityContext.on("ObjectIdentity", function (string) {
    boxDisclosure.onOpen();
  });

  if (!userInfo.data && !userInfo.error) return (
    <Box position={"absolute"} width={"100vw"} height={"100vh"} backgroundImage={"./welcome-page.jpeg"} backgroundSize={"cover"} />
  )

  // const handleOnClickFullscreen = () => {
  //   unityContext.setFullscreen(true);
  //   if (window.screen.availWidth <= 768 && window.screen.orientation.type.startsWith("potrait")) {
  //     screen.orientation.lock("landscape");
  //   }
  // }
  if (!gameDisclosure.isOpen && accessToken?.length && userInfo.data) return <FormModal disclosure={gameDisclosure} />

  if (gameDisclosure.isOpen) return (
    <>
      <Box position={"absolute"} width={"100vw"} height={"100vh"} backgroundColor={"black"} backgroundImage={"./background.jpeg"} backgroundSize={"cover"}>
        {
          progression < 101 &&
          (
            <Center top={0} right={0} left={0} bottom={0} className={progression == 100 ? styles.loadingEntranceBackgroundBlur : styles.loadingEntranceBackground}>
              <Center backgroundColor={"white"} borderRadius={"4px"} width={{ md: "25vw", sm: "75vw" }} height={"50vh"} className={progression == 100 ? styles.loadingEntranceModalBlur : styles.loadingEntranceModal} padding="32px">
                {
                  progression <= 99 &&
                  <VStack spacing={3}>
                    <CircularProgress value={progression} isIndeterminate={progression === 99} color='blue.300' size={"3xs"} />
                    <HStack fontWeight={"600"} fontSize={"23px"}>
                      <Text>
                        Please Wait
                      </Text>
                      <ReactTypical
                        steps={["", 1000, '.', 1000, "..", 1000, "...", 2000]}
                        loop={Infinity}
                        wrapper="div"
                      />
                    </HStack>
                    <Text pt={"20px"} fontSize={"18px"} fontWeight={"800"} textAlign={"center"}>
                      {logInfo}
                    </Text>
                  </VStack>
                }
              </Center>
            </Center>
          )
        }
        <Unity unityContext={unityContext} className={styles.unityCanvas} />
      </Box>
      <Modal
        isOpen={boxDisclosure.isOpen}
        onClose={boxDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          maxW="720px"
          overflow="hidden"
          width={{ base: "360px", sm: "720px" }}
        >
          <ModalCloseButton
            display={{ base: "none", sm: "block" }}
            variant="outline"
          />
          <ModalBody padding="0">
            <Box display={{ base: "block", sm: "flex" }}>
              <Box
                flex={1}
                background="gray.300"
                position="relative"
                width="360px"
                height="360px"
              >
                <Carousel
                  height={"360px"}
                  width={"360px"}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <IconButton
                      aria-label="left"
                      icon={<BiChevronLeft />}
                      onClick={() => {
                        previousSlide();
                      }}
                      size="sm"
                      variant="ghost"
                    />
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <IconButton
                      aria-label="left"
                      icon={<BiChevronRight />}
                      onClick={() => {
                        nextSlide();
                      }}
                      variant="ghost"
                      size="sm"
                    />
                  )}
                >
                  <Center>
                    <ReactPlayer
                      url={"https://www.youtube.com/watch?v=Uvufun6xer8"}
                      width={"360px"}
                      height={"360px"}
                    />
                  </Center>
                  <Center>
                    <ReactPlayer
                      url={"https://www.youtube.com/watch?v=Uvufun6xer8"}
                      width={"360px"}
                      height={"360px"}
                    />
                  </Center>
                </Carousel>
              </Box>
              <Box
                flex={1}
                padding="20px"
                paddingTop="36px !important"
                width={{ base: "360px", sm: "360px" }}
                height={{ base: "260px", sm: "360px" }}
                overflowY="auto"
              ></Box>
            </Box>
          </ModalBody>
          <ModalFooter display={{ base: "block", sm: "none" }}>
            <Button onClick={boxDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

  return <WelcomePage />
}

export default Home
