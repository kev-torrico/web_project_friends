import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode(); //Copied from Chakra-ui to toggle light and dark color mode
  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")} //useColorModeValue is to make the background iteractive
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }} //from the small screen and below, it will be none (invisible), and above will be flex (visible)
          >
            <img src="/react.png" alt="React logo" width={50} height={50} />
            <Text fontSize={"40px"}>+</Text>
            <img src="/python.png" alt="Python logo" width={50} height={50} />
            <Text fontSize={"40px"}>=</Text>
            <img src="/explode.png" alt="Explode logo" width={50} height={50} />
          </Flex>
          {/* Rigth side */}
          <Flex gap={3} alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }} //medium screens and above will be block, but below that will be none
            >
              BFFship 🔥
            </Text>
            <IconButton
              onClick={toggleColorMode}
              variant="outline"
              size="sm"
              borderColor="none"
              px={4}
              minH="38.4px"
            >
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <CreateUserModal />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
