import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Img } from "@chakra-ui/image";
import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
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
import { AspectRatio, css } from "@chakra-ui/react";

type CarouselItem = {
  src: string;
  type: "youtube" | "image";
  desc?: string;
};

const items: CarouselItem[] = [{ src: "", type: "youtube" }];

interface Definition {
  items: CarouselItem[],
  description?: string,
  title: string,
  variant: "full-carousel" | "standard-carousel"
}

const definition: Definition = { items, description: "This is a description", title: "", variant: "standard-carousel" }

export default registry
  .from(
    definition,
    {
      required: ["items", "title", "variant"],
      type: "object",
      properties: {
        description: { type: "string", nullable: true },
        variant: { type: "string" },
        title: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            required: ["src", "type"],
            properties: {
              src: { type: "string" },
              type: { type: "string", enum: ["youtube", "image"] },
              desc: { type: "string",  nullable: true },
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
      const [index, setIndex] = React.useState(0);
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
                {
                  props.instance.options.variant === "standard-carousel" ?
                  <>
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
                          <AspectRatio key={item.src} ratio={4/3.25} maxWidth={{ xl: "540px", base: "360px", sm: "360px" }}>
                            {item.type === "youtube" ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${item.src}`}
                                allowFullScreen
                              />
                            ) : (
                              <>
                                <Img src={item.src} objectFit='cover' />
                              </>
                            )}
                          </AspectRatio>
                        ))}
                      </Carousel>
                    </Box>
                    <VStack
                      flex={1}
                      width={{ base: "360px", sm: "360px" }}
                      height={{ base: "260px", sm: "360px" }}
                      overflowY="auto"
                    >
                      <Center height={"50px"} width={"full"} className={styles.border} position={"sticky"} top={0}>
                        <Box fontFamily={"GaliverSans"} textAlign={"center"} fontSize={["20px", "22px"]} color={"white"}>
                          {props.instance.options.title.split("_").join(" ").toUpperCase()}
                        </Box>
                      </Center>
                      <Box color={"black"} fontWeight={"bold"} padding={"20px"} fontSize={["13px", "17px"]}>
                        {props.instance.options.description ? props.instance.options.description : props.instance.options.items[index].desc}
                      </Box>
                    </VStack>
                  </>
                  :
                  <Box
                    flex={1}
                    background="gray.300"
                    position="relative"
                  >
                    <Carousel
                      renderCenterLeftControls={props.instance.options.items.length > 1 ? ({ previousSlide }) => (
                        <IconButton
                          aria-label="left"
                          icon={<BiChevronLeft fontSize={"50px"}  />}
                          onClick={() => {
                            previousSlide();
                          }}
                          colorScheme={"black"}
                          isRound
                          _focus={{borderWidth: "0px"}}
                          size="sm"
                          variant="ghost"
                        />
                      ) : null}
                      renderCenterRightControls={props.instance.options.items.length > 1 ? ({ nextSlide }) => (
                        <IconButton
                          aria-label="left"
                          icon={<BiChevronRight fontSize={"50px"} />}
                          colorScheme={"black"}
                          onClick={() => {
                            nextSlide();
                          }}
                          isRound
                          _focus={{borderWidth: "0px"}}
                          variant="ghost"
                          size="sm"
                        />
                      ) : null}
                    >
                      {props.instance.options.items.map((item) => {
                        if (!item.desc) {
                          return (
                            <AspectRatio key={item.src} maxWidth={{ xl: "1080px", base: "720px", sm: "720px" }} height={"500px"}>
                              {item.type === "youtube" ? (
                                <iframe
                                  src={`https://www.youtube.com/embed/${item.src}`}
                                  allowFullScreen
                                />
                              ) : (
                                  <Img src={item.src} objectFit='cover' />
                              )}
                            </AspectRatio>
                          )
                        } else {
                          return (
                            <Flex width={"100%"} height={"500px"} backgroundColor={"white"}>
                              <AspectRatio key={item.src} ratio={1} width={"50%"} height={"500px"}>
                                {item.type === "youtube" ? (
                                  <iframe
                                    src={`https://www.youtube.com/embed/${item.src}`}
                                    allowFullScreen
                                  />
                                ) : (
                                  <Img src={item.src} objectFit='cover' />
                                )}
                              </AspectRatio>
                              <VStack
                                flex={1}
                                width={"50%"}
                                height={"500px"}
                                overflowY="auto"
                              >
                                <Center height={"50px"} width={"full"} className={styles.border} position={"sticky"} top={0}>
                                  <Box fontFamily={"GaliverSans"} textAlign={"center"} fontSize={["20px", "22px"]} color={"white"}>
                                    {props.instance.options.title.split("_").join(" ").toUpperCase()}
                                  </Box>
                                </Center>
                                <Box color={"black"} fontWeight={"bold"} padding={"20px"} fontSize={["13px", "17px"]}>
                                  {item.desc}
                                </Box>
                              </VStack>
                            </Flex>
                          )
                        }
                      })}
                    </Carousel>
                  </Box>
                }
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
