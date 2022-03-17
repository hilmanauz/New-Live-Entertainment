import ReactDOM from "react-dom";
import { Modal, ModalOverlay, ModalContent, ModalBody, Center, Box, Img, VStack, Button, Text, useToast, Progress, CircularProgress, HStack, ModalCloseButton, ModalFooter, ModalHeader, useDisclosure, IconButton, Flex, Spacer, Icon, ChakraProvider } from '@chakra-ui/react';
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
import registry from '../engine/contents/registry';
import { Instance } from "../engine/contents";
import {
  carousel,
  youtube,
} from "../engine/contents/loader";

function ContentWrapper(props: { children: React.ReactNode }) {
  return <ChakraProvider>{props.children}</ChakraProvider>;
}

const Home: NextPage = () => {
  const userInfo = useUserInfo();
  const [progression, setProgression] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const gameDisclosure = useDisclosure();
  const [content, setContent] = React.useState<Instance<any>>({options: {}, id: "", type: ""})
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
  const username = Cookies.get(`${userInfo.data?.nickname}:SetForm`);
  const character = Cookies.get(`${username}:SetCharacter`);
  const InteractionBuilder = registry.InteractionBuilders[content.type];
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
      console.log(status, character);
      if (status === "Game Already In Room" && character) {
        !isSelectCharacter && setProgression(100);
        setTimeout(() => {
          !isSelectCharacter && setProgression(101);
          setContent(carousel.build({
            id: "123041",
            options: {
              description: `Hi welcome to the prototype version of the New Land Experience. The current version of the metaverse is still in the development phase. But, hopefully, it can still provide new experiences in enjoying your virtual events. So, let's play on the New Land Experience`,
              variant: "standard-carousel",
              title: "New Land Experience",
              items:
                [
                  {
                    src: "./background.jpeg",
                    type: "image"
                  }
                ]
            },
          }))
        }, !isSelectCharacter ? 3000 : 1000);
        return;
      } else if (status === "Game Already Start" && !character) {
        setProgression(100);
        setTimeout(() => {
          setProgression(101);
        }, 4000);
      }
    }
  }, [status, character]);

  const logInfo = React.useMemo(() => {
    if (!character) {
      if (typeof window !== "undefined" && window.screen.availWidth <= 768) {
        return <>
          <p>Note: For mobile web user.</p><br /><p>Please use landscape mode</p>
        </>      
      } else {
        return "-Don't forget to choose your character-";
      }
    } else {
      if (progression === 99 && status === "Game Already Start") {
        return "-Joining the room-"
      } else if (typeof window !== "undefined" && window.screen.availWidth <= 768) {
        return <>
          <p>Note: For mobile web user.</p><br /><p>Please use landscape mode</p>
        </>      
      } else {
        return `${Math.round(progression < 99 ? progression : progression + 1)}%`
      }
    }
  }, [status, progression, character])
  console.log(content);
  unityContext.on("ObjectIdentity", function (string) {
    const [typeContent, name] = string.split("|");
    switch (typeContent) {
      case "youtube": 
      setContent(youtube.build({
        id: "123041",
        options: {
          videoID: "gElfIo6uw4g",
        },
      }))
      break;
      case "carousel":
      setContent(carousel.build({
        id: "123041",
        options: {
          title: name,
          variant: "full-carousel",
          items:
            [{
              type: "image",
              src: "./banner.jpeg",
            }, {
              type: "image",
              src: "./stage.png",
              desc: `Hi! New Land Experience is your future metaverse. Soon, you can do many things inside of New Land Experience. It is your Live Concert Venue, NFT Mall, E-commerce, Virtual Gallery, Virtual Auditorium and many things! New Land Experience is your new world!`
            }]
        },
      }))
      break;
    }
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
              <Center backgroundColor={"white"} borderRadius={"10px"} width={{ md: "25vw", sm: "75vw" }} height={"50vh"} className={progression == 100 ? styles.loadingEntranceModalBlur : styles.loadingEntranceModal}>
                {
                  progression <= 99 &&
                  <VStack spacing={3} width={"full"} height={"full"}>
                    <Box width={"full"} height={"20%"} className={styles.border} borderTopRadius={"10px"} display={"block"}> 
                      <HStack fontFamily={"GaliverSans"} textAlign={"center"} height={"100%"} fontSize={["20px", "25px"]} color={"white"} justifyContent={"center "}> 
                        <Text>
                          Please Wait
                        </Text>
                        <ReactTypical
                          steps={["", 1000, '.', 1000, "..", 1000, "...", 2000]}
                          loop={Infinity}
                          wrapper="div"
                        />
                      </HStack>
                    </Box>
                    <VStack padding="32px" spacing={3} minHeight={"40vh"} width={"full"} justifyContent={"center"}>
                      <Progress hasStripe value={progression} isIndeterminate={progression === 99} colorScheme='red' size={"md"} height={"32px"} width={"full"}/>
                      <Text pt={"20px"} fontSize={["20px", "25px"]} fontWeight={"800"} textAlign={"center"}>
                        {logInfo}
                      </Text>
                    </VStack>
                  </VStack>
                }
              </Center>
            </Center>
          )
        }
        <Unity unityContext={unityContext} className={styles.unityCanvas} />
        {
          content.id &&
          <InteractionBuilder.RuntimeComponent
            instance={content}
          />
        }
      </Box>
    </>
  )

  return <WelcomePage />
}

export default Home
