import { useGetAllQuery } from "@/api/apiSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Container } from "@chakra-ui/react";
import VirtualizedList from "./VirtualizedList";

const PokemonList = () => {
  const [limit, setLimit] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const { data, isLoading, isFetching, isError } = useGetAllQuery(limit);

  const results = data?.results ?? [];

  const gridRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (results.length) {
      setIsLoadingMore(false);
    }
  }, [results]);

  useEffect(() => {
    if (results.length && !isLoadingMore && gridRef.current) {
      gridRef.current.scrollToItem({
        rowIndex: Math.floor((results.length - 8) / 4),
      });
    }
  }, [results, isLoadingMore, gridRef.current]);

  const loadMorePokemons = () => {
    setIsLoadingMore(true);
    setLimit((prev) => prev + 8);
  };

  if (isError) {
    navigate("/error");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxW="1180px" py={4}>
      <VirtualizedList results={results} gridRef={gridRef} />
      <Center>
        <Button
          mt={4}
          isLoading={isLoadingMore || isFetching ? true : false}
          loadingText="Carregando"
          colorScheme="red"
          size="md"
          width="150px"
          onClick={loadMorePokemons}
          spinnerPlacement="start"
        >
          Ver Mais
        </Button>
      </Center>
    </Container>
  );
};

export default PokemonList;
