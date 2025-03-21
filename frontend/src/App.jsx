import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";

function App() {
  return (
    <Stack minH={"100vh"}>
      <Navbar />

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }} //Medium screen will and above be 50px and below that it will be 3xlarge
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"to-r"} //Gradient to right from cyan.400 to blue.500
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
            bgClip={"text"} //The image will only be visible inside the text, and not outside of it.
          >
            My Besties
          </Text>
          🚀
        </Text>

        <UserGrid />
      </Container>
    </Stack>
  );
}

export default App;
