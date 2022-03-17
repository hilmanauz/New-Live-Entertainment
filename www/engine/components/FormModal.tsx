import { Box, VStack, HStack, Center, Spacer, FormControl, Select, Button, Text, Input, Flex, UseDisclosureProps, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form';
import useUserInfo from '../hooks/useUserInfo';
import styles from "../../styles/Home.module.css";
import _ from 'lodash';

function FormModal({ disclosure }: { disclosure: UseDisclosureProps }) {
  const userInfo = useUserInfo();
  const formRef = useForm<{
    username: {
      value: string,
      placeholder: string
    };
    name: {
      value: string,
      placeholder: string
    };
    gender: {
      value: string,
      placeholder: string
    };
    age: {
      value: string,
      placeholder: string
    };
    city: {
      value: string,
      placeholder: string
    }
  }>({
    mode: "onChange",
    defaultValues: {
      name: {
        value: "",
        placeholder: ""
      },
      username: {
        value: "",
        placeholder: "Your character name"
      },
      gender: {
        value: "Male",
        placeholder: "Choose gender"
      },
      age: {
        value: "",
        placeholder: "17"
      },
      city: {
        value: "",
        placeholder: "Jakarta"
      },
    }
  });
  const data = formRef.watch();
  React.useEffect(() => {
    if (userInfo.data) {
      formRef.setValue("name.value", userInfo.data.name);
    }
  }, [userInfo.data]);
  const toast = useToast();
  const onSubmit = React.useCallback((formData) => {
    const values = Object.values(formData);
    // @ts-ignore
    if (values.find(item => !item.value)) return toast({
      title: "Form must be filled in completely",
      status: "error",
    });
    Cookies.set(`${userInfo.data?.nickname}:SetForm`, formData.username.value, { expires: 1 });
    disclosure.onOpen && disclosure.onOpen();
  }, [userInfo.data, disclosure]);
  const errorMessage = formRef.formState.errors;
  return (
    <>
      <Center position={"fixed"} top={0} right={0} left={0} bottom={0} backgroundImage={"./welcome-page.jpeg"} backgroundPosition={"center"} backgroundSize={"cover"} className={styles.mainContent}>
        <Box bg={"white"} borderRadius={"10px"} width={{ md: "25vw", sm: "75vw" }} height={"55vh"}>
          <VStack height={"full"} flexDirection={"column"}>
            <Center width={"full"} height={"100px"} className={styles.border} borderTopRadius={"10px"}>
              <Box fontFamily={"GaliverSans"} textAlign={"center"} fontSize={["20px", "25px"]} color={"white"}>
                New Land Experience
              </Box>
            </Center>
            <Flex flex={1}>
              <form onSubmit={formRef.handleSubmit(onSubmit)}>
                <VStack padding={"32px"} paddingBottom={"20px"} fontSize={"2xl"} gap={4} height={"full"}>
                  {
                    Object.entries(data).map(([key, value]) =>
                      <HStack width={"100%"} key={key}>
                        <Center alignItems={"flex-end"} width={"50%"} height={"full"} fontFamily={"GaliverSans"}>
                          <Text textAlign={"start"}>{_.capitalize(key)}</Text>
                          <Spacer />
                          <Text textAlign={"end"}>:</Text>
                        </Center>
                        <FormControl width={"50%"}>
                          {
                            key === "gender" || key === "age" ?
                              <Select variant={"flushed"} {...formRef.register(`${key}.value`)} fontWeight={"bold"} fontSize={"xl"}>
                                {
                                  (key === "gender" ? ["Male", "Female"] : Array.from({length:100},(v,k)=>k+1)).map((item, key) =>
                                    <option value={item} key={key}>{item}</option>
                                  )
                                }
                              </Select>
                              :
                              <>
                                {/* @ts-ignore */}
                                <Input placeholder={data[key].placeholder} type={key === "age" ? "number" : "text"} variant={"flushed"} fontWeight={"bold"} fontSize={"xl"} {...formRef.register(`${key}.value`, {
                                  onChange: () => formRef.clearErrors("name.value")
                                })} 
                                />
                              </>
                          }
                        </FormControl>
                      </HStack>
                    )
                  }
                  <Spacer />
                  <Button type="submit" colorScheme={"pink"} fontWeight={"extrabold"} fontSize={"18px"} fontFamily={"MontRegular"} width={"full"} paddingY={"30px"}>
                    Submit
                  </Button>
                </VStack>
              </form>
            </Flex>
          </VStack>
        </Box>
      </Center>
    </>
  )
}

export default FormModal