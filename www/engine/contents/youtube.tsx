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
          maxW="720px"
          overflow="hidden"
          width={{ base: "360px", sm: "720px" }}
        >
          <ModalBody padding="0">
            <Box display={{ base: "block", sm: "flex" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${props.instance.options.videoID}`}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      );
    },
  }));
