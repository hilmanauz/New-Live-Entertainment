import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Img } from "@chakra-ui/image";
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/layout";
import styles from "../../styles/Home.module.css";
import {
  BiInfoCircle,
  BiChevronLeft,
  BiChevronRight,
  BiSearchAlt,
} from "react-icons/bi";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import Carousel from "nuka-carousel";
import ReactPlayer from "react-player";
import registry from "./registry";
import React from "react";
import { css } from "@chakra-ui/react";

type CarouselItem = {
  src: string;
  type: "youtube" | "image";
};

const items: CarouselItem[] = [{ src: "", type: "youtube" }];

export default registry
  .from(
    { items, description: "This is a description", title: "" },
    {
      required: ["items", "description", "title"],
      type: "object",
      properties: {
        description: { type: "string" },
        title: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            required: ["src", "type"],
            properties: {
              src: { type: "string" },
              type: { type: "string", enum: ["youtube", "image"] },
            },
          },
        },
      },
    }
  )
  .addEmbed("gallery", () => ({
    EditorComponent: (props) => <div></div>,
    RuntimeComponent: (props) => {
      const disclosure = useDisclosure();
      React.useEffect(() => {
        props.instance && disclosure.onOpen();
      }, [props.instance]);
      return (
        <Modal
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            maxW="60vw"
            overflow="hidden"
            width={{ xl: "1080px", base: "720px", sm: "720px" }}
          >
            <ModalCloseButton
              display={{ base: "none", sm: "block" }}
              variant="outline"
              _focus={{borderWidth: "0px"}}
              zIndex={"10"}
            />
            <ModalBody padding="0">
              <Box display={{ base: "block", sm: "flex" }} width={"full"} height={"full"}>
                <Box
                  flex={1}
                  background="gray.300"
                  position="relative"
                >
                  <Carousel
                    renderCenterLeftControls={props.instance.options.items.length > 1 ? ({ previousSlide }) => (
                      <IconButton
                        aria-label="left"
                        icon={<BiChevronLeft />}
                        onClick={() => {
                          previousSlide();
                        }}
                        isRound
                        size="sm"
                        variant="ghost"
                      />
                    ) : null}
                    renderCenterRightControls={props.instance.options.items.length > 1 ? ({ nextSlide }) => (
                      <IconButton
                        aria-label="left"
                        icon={<BiChevronRight />}
                        onClick={() => {
                          nextSlide();
                        }}
                        isRound
                        variant="ghost"
                        size="sm"
                      />
                    ) : null}
                  >
                    {props.instance.options.items.map((item) => (
                      <Flex
                        position="relative"
                        flex={1}
                        key={item.src}
                      >
                        <Center width={{ xl: "540px", base: "360px", sm: "360px" }} height={{xl: "full", base: "full", sm: "360px"}}>
                          {item.type === "youtube" ? (
                            <ReactPlayer
                              url={`https://www.youtube.com/watch?v=${item.src}`}
                            />
                          ) : (
                            <>
                              <Img src={item.src} />
                              <Button
                                leftIcon={<BiInfoCircle />}
                                size="sm"
                                position="absolute"
                                bottom="10px"
                                right="10px"
                                as="a"
                                href={item.src}
                                target="_blank"
                              >
                                View detail
                              </Button>
                            </>
                          )}
                        </Center>
                      </Flex>
                    ))}
                  </Carousel>
                </Box>
                <VStack
                  flex={1}
                  width={{ base: "360px", sm: "360px" }}
                  height={{ base: "260px", sm: "360px" }}
                  overflowY="auto"
                  // dangerouslySetInnerHTML={{
                  //   __html: props.instance.options.description,
                  // }}
                >
                  <Center height={"50px"} width={"full"} className={styles.border} position={"sticky"} top={0}>
                    <Box fontFamily={"GaliverSans"} textAlign={"center"} fontSize={["20px", "22px"]} color={"white"}>
                      {props.instance.options.title.toUpperCase()}
                    </Box>
                  </Center>
                  <Box color={"black"} fontWeight={"bold"} padding={"20px"} fontSize={["13px", "17px"]}>
                    {props.instance.options.description}
                  </Box>
                </VStack>
              </Box>
            </ModalBody>
            <ModalFooter display={{ base: "block", sm: "none" }}>
              <Button onClick={disclosure.onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    },
  }));
