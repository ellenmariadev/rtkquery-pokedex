import { useGetAllQuery } from "@/api/apiSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
  Heading,
  Icon,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { TbPokeball, TbHeart } from "react-icons/tb";
import VirtualizedList from "./VirtualizedList";

const PokemonList = () => {
  const [limit, setLimit] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const { data, isLoading, isFetching, isError } = useGetAllQuery(limit);
  const results = data?.results ?? [];

  const { favorites } = useSelector((state) => state.favorites);

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

  return (
    <Container maxW="1180px" py={4}>
      <Tabs variant="soft-rounded">
        <Heading size="3xl" color="gray.700" pb="3">
          Lista
        </Heading>
        <TabList pb={3}>
          <Tab>
            <Icon mr={1} boxSize={5} as={TbPokeball} />
            Todos
          </Tab>
          <Tab
            _selected={{ bg: "red.200" }}
            isDisabled={favorites.length === 0 ? true : false}
          >
            <Icon mr={1} boxSize={5} as={TbHeart} />
            Favoritos
          </Tab>
        </TabList>
        {isLoading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red.500"
              size="xl"
              mt={10}
            />
          </Center>
        ) : (
          <TabPanels>
            <TabPanel>
              <Text
                fontSize="xs"
                letterSpacing={1}
                fontWeight={600}
                color="gray.600"
                textTransform="uppercase"
                pb={5}
              >
                Total: {results.length}
              </Text>
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
            </TabPanel>
            <TabPanel>
              <Text
                fontSize="xs"
                letterSpacing={1}
                fontWeight={600}
                color="gray.600"
                textTransform="uppercase"
                pb={5}
              >
                Total: {favorites.length}
              </Text>
              <VirtualizedList results={favorites} gridRef={gridRef} />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </Container>
  );
};

export default PokemonList;
