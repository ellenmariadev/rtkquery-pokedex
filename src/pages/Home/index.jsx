import { Heading, Button, Text, Container } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "./home.css";
import { useMediaQuery } from "@chakra-ui/react";

export const Home = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <main className="background-image">
      <Container
        maxW="1180px"
        display="grid"
        textAlign="center"
        placeItems="center"
        placeContent={isLargerThan900 ? "start center" : "center"}
        pt={isLargerThan900 ? 20 : 0}
      >
        <Heading as="h1" size="lg" fontSize={isLargerThan900 ? "7rem" : "3.5rem"} color="red.600">
          Pokédex
        </Heading>
        <Text py={5} letterSpacing={1}>
          Encontre os pokémons e crie uma lista com os seus favoritos.
        </Text>
        <Button
          colorScheme="red"
          size="md"
          width="150px"
          as={RouterLink}
          to="/list"
        >
          Ir para a Lista
        </Button>
      </Container>
    </main>
  );
};