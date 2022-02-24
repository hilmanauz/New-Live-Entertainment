import { Center, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import LoginModal from './LoginModal'
import WelcomeModal from './WelcomeModal'
import styles from "../styles/Home.module.css";

function WelcomePage() {
  const loginDisclosure = useDisclosure();
  return (
    <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundImage={"./welcome-page.jpeg"} backgroundPosition={"center"} backgroundSize={"cover"} className={styles.mainContent}>
      <Flex flexDirection={"column"} bg={"white"} borderRadius={"10px"} width={{ md: loginDisclosure.isOpen ? "25vw" : "40vw", sm: "75vw" }} height={loginDisclosure.isOpen ? "50vh" : "60vh"}>
        {
          loginDisclosure.isOpen ?
            <LoginModal />
            :
            <WelcomeModal disclosure={loginDisclosure} />
        }
      </Flex>
    </Center>
  )
}

export default WelcomePage