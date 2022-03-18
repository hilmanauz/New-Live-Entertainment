import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, IconButton, Center, ModalFooter, Button, useDisclosure, AspectRatio } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import useUnityContext from "../hooks/useUnityContext";
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
      }, [props.instance]);
      const unityContext = useUnityContext();
      const handleCloseModal = React.useCallback(() => {
        unityContext.send("PlayButton", "PlayMusic", "");
        disclosure.onClose();
      }, [unityContext])
      return (
      <Modal
        isOpen={disclosure.isOpen}
        onClose={handleCloseModal}
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
          padding={"0px"} height={"95vh"}>
            <AspectRatio ratio={1} display={{ base: "block", sm: "flex" }} height={"95vh"}>
              <iframe src="https://cdn.siar.us/player/?link=nle.siar.us/nle/live"
                scrolling="no" frameBorder="0" allow="autoplay" allowFullScreen />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
      );
    },
  }));
