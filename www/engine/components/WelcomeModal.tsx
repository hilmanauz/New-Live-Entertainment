import { Box, VStack, Spacer, HStack, Button, Icon, Text, UseDisclosureProps } from '@chakra-ui/react'
import React from 'react'
import { BiArrowToRight } from 'react-icons/bi'
import styles from "../../styles/Home.module.css";

function WelcomeModal({ disclosure }: { disclosure: UseDisclosureProps }) {
  return (
    <>
      <Box width={"full"} height={"100px"}className={styles.border} borderTopRadius={"10px"} />
      <VStack textAlign={"center"} height={"90%"} width={"full"} paddingY={"10px"} paddingX={"32px"} spacing={1} color={"black"}>
        <Text className={styles.welcomeHeader} fontSize={["40px", "60px"]}>Hello..</Text>
        <Text paddingX={"50px"} fontWeight={"600"} fontSize={["13px", "20px"]} className={styles.welcomeBody}>{
          "Welcome to the prototype version of the New Land Experience 😊. Hopefully it can provide a new experience in enjoying virtual events. Lets play on New Land Experience"
        }</Text>
        <Spacer />
        <HStack justifyContent={"flex-end"} width={"full"}>
          <Button fontFamily={"MontBold"} colorScheme={"gray"} variant={"ghost"} onClick={disclosure.onOpen} _focus={{ borderWidth: "0px" }}>Next <Icon as={BiArrowToRight} /></Button> 
        </HStack>
      </VStack>
    </>
  )
}

export default WelcomeModal