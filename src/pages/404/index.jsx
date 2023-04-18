import { Button, Heading, Container, Text, Center } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <main>
      <Container
        display="grid"
        height="70vh"
        placeContent="center"
        textAlign="center"
      >
        <Heading as="h1" fontSize="8rem">404</Heading>
        <Text letterSpacing={1} p={5}>
          Oops! Página não encontrada.
        </Text>
        <Center>
          <Button
            colorScheme="red"
            size="md"
            width="150px"
            as={RouterLink}
            to="/"
          >
            Voltar
          </Button>
        </Center>
      </Container>
    </main>
  );
};
