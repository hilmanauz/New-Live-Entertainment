import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, IconButton, Center, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import registry from "./registry";

export default registry
  .from(
    { videoID: "404" },
    {
      required: ["videoID"],
      type: "object",
      properties: { videoID: { type: "string" } },
    }
  )
  .addEmbed("youtube", () => ({
    EditorComponent: () => <div></div>,
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
          maxW="95vw"
          height={"95vh"}
          overflow="hidden"
          width={"95vw"}
        >
          <ModalBody padding="0">
            <Box display={{ base: "block", sm: "flex" }} flex={1}>
              <ReactPlayer
                height={"95vh"}
                width={"95vw"}
                url={`https://www.youtube.com/watch?v=${props.instance.options.videoID}`}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      );
    },
  }));
