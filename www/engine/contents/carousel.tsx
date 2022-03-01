import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Img } from "@chakra-ui/image";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
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

type CarouselItem = {
  src: string;
  type: "youtube" | "image";
};

const items: CarouselItem[] = [{ src: "", type: "youtube" }];

export default registry
  .from(
    { items, description: "This is a description" },
    {
      required: ["items", "description"],
      type: "object",
      properties: {
        description: { type: "string" },
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
      }, [props.instance])
      return (
        <Modal
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            maxW="720px"
            overflow="hidden"
            width={{ base: "360px", sm: "720px" }}
          >
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
                        isRound
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
                        isRound
                        variant="ghost"
                        size="sm"
                      />
                    )}
                  >
                    {props.instance.options.items.map((item) => (
                      <Flex
                        position="relative"
                        height={"360px"}
                        width={"360px"}
                        key={item.src}
                      >
                        <Center>
                          {item.type === "youtube" ? (
                            <ReactPlayer
                              url={`https://www.youtube.com/watch?v=${item.src}`}
                              height={"360px"}
                              width={"360px"}
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
                <Box
                  flex={1}
                  padding="20px"
                  paddingTop="36px !important"
                  width={{ base: "360px", sm: "360px" }}
                  height={{ base: "260px", sm: "360px" }}
                  overflowY="auto"
                  // dangerouslySetInnerHTML={{
                  //   __html: props.instance.options.description,
                  // }}
                >
                  {props.instance.options.description}
                </Box>
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
