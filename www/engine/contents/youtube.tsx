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
          margin={"0px"}
        >
          <ModalBody margin={"0px"}
          overflow="hidden"
          padding={"0px"} >
            <Box display={{ base: "block", sm: "flex" }}>
              <iframe style={{display:"block", width:"100%", height:"95vh"}} src="https://cdn.siar.us/player/?link=nle.siar.us/nle/live"
                scrolling="no" frameBorder="0" allow="autoplay" allowFullScreen />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      );
    },
  }));
