import { Box, VStack, HStack, Center, Spacer, FormControl, Select, Button, Text, Input, Flex, UseDisclosureProps } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react'
import { useForm } from 'react-hook-form';
import useUserInfo from '../engine/hooks/useUserInfo';
import styles from "../styles/Home.module.css";

function FormModal({ disclosure }: { disclosure: UseDisclosureProps }) {
  const userInfo = useUserInfo();
  const formRef = useForm<{
    name: string;
    gender: string;
    age: string;
    username: string;
    uniqueCode: string;
  }>({
    mode: "onChange",
    defaultValues: {
      name: "",
      gender: "Male",
      age: "",
      username: "",
      uniqueCode: ""
    }
  });
  const data = formRef.watch();
  React.useEffect(() => {
    if (userInfo.data) {
      formRef.setValue("name", userInfo.data.name);
      formRef.setValue("username", userInfo.data.nickname);
    }
  }, [userInfo.data]);
  const onSubmit = React.useCallback((formData) => {
    Cookies.set(`${userInfo.data?.nickname}:SetForm`, formData.username, { expires: 1 });
    disclosure.onOpen && disclosure.onOpen();
  }, [userInfo.data, disclosure]);
  return (
    <>
      <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundImage={"./welcome-page.jpeg"} backgroundPosition={"center"} backgroundSize={"cover"} className={styles.mainContent}>
        <Flex flexDirection={"column"} bg={"white"} borderRadius={"10px"} width={{ md: "25vw", sm: "75vw" }} height={"55vh"}>
          <Box width={"full"} height={"20%"} className={styles.border} borderTopRadius={"10px"} display={"block"} />
          <form onSubmit={formRef.handleSubmit(onSubmit)}>
            <VStack padding={"32px"} fontSize={"2xl"} gap={3}>
              {
                Object.entries(data).map(([key, value]) =>
                  <HStack width={"100%"} key={key}>
                    <Center alignItems={"flex-end"} width={"50%"} height={"full"} fontFamily={"GaliverSans"}>
                      <Text textAlign={"start"}>{key === "uniqueCode" ? "Unique code" : key}</Text>
                      <Spacer />
                      <Text textAlign={"end"}>:</Text>
                    </Center>
                    <FormControl width={"50%"} isRequired={key === "username" || key === "uniqueCode"}>
                      {
                        key === "gender" ?
                          <Select variant={"flushed"} {...formRef.register(`${key}`)} fontWeight={"bold"} fontSize={"xl"}>
                            {
                              ["Male", "Female"].map(item =>
                                <option value={item}>{item}</option>
                              )
                            }
                          </Select>
                          :
                          <>
                            {/* @ts-ignore */}
                            <Input type={key === "age" ? "number" : "text"} variant={"flushed"} fontWeight={"bold"} fontSize={"xl"} {...formRef.register(`${key}`)} />
                          </>
                      }
                    </FormControl>
                  </HStack>
                )
              }
              <Button type="submit" fontWeight={"bold"} fontSize={"18px"} fontFamily={"MontRegular"} width={"full"}>
                Submit
              </Button>
            </VStack>
          </form>
        </Flex>
      </Center>
    </>
  )
}

export default FormModal