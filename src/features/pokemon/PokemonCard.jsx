import { useGetByNameQuery } from "@/api/apiSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "./favoriteSlice";
import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

const PokemonCard = ({ name }) => {
  const { data: pokemon, isLoading, isFetching } = useGetByNameQuery(name);

  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((item) => item.name === name);

  const handleFavorite = useCallback((pokemon) => {
    dispatch(addToFavorites(pokemon));
  }, []);

  if (isLoading || isFetching) {
    return (
      <Box padding={12} boxShadow="lg" bg="white">
        <Center>
          <SkeletonCircle size={20} />
        </Center>
        <SkeletonText mt={6} noOfLines={3} spacing={5} skeletonHeight={3} />
      </Box>
    );
  }

  const imageUrl = () => {
    const dreamWorldImageUrl = pokemon.sprites.other.dream_world.front_default;
    const defaultImageUrl = pokemon.sprites.front_default;
    return dreamWorldImageUrl ? dreamWorldImageUrl : defaultImageUrl;
  };

  return (
    <Card boxShadow="xl" borderRadius="40px 0" border="3px solid lightblue">
      <CardHeader>
        <Flex>
          <Text fontSize="xs" letterSpacing={1} fontWeight={600} color="gray.600">#{String(`${pokemon.id}`).padStart(3, "0")}</Text>
          <Spacer />
          <Tooltip
            hasArrow
            placement="top"
            label={isFavorite ? "Remover" : "Adicionar aos Favoritos"}
            bg="red.600"
          >
            <Button
              width={0}
              height={5}
              padding={0}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              minW={6}
              pointerEvents="unset"
            >
              <Icon
                onClick={() => handleFavorite(pokemon)}
                boxSize={8}
                bg="none"
                color={isFavorite ? "red.400" : "gray.300"}
                as={isFavorite ? TbHeartFilled : TbHeart}
                cursor="default"
                _hover={{ color: "red.500" }}
              />
            </Button>
          </Tooltip>
        </Flex>
        <Center>
          {imageUrl ? (
            <Image
              width="120px"
              height="120px"
              src={imageUrl()}
              alt={pokemon.name}
            />
          ) : (
            <Image
              className="pokemon-image"
              src="https://i.ibb.co/RzGBsmR/placeholderr.png"
              alt={pokemon.name}
            />
          )}
        </Center>
      </CardHeader>
      <CardBody>
        <Center>
          <Heading as="h3" size="md" fontWeight={700} color="gray.600" textTransform="capitalize">
            {pokemon.name}
          </Heading>
        </Center>
        <Center>
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              mt={1}
              ml={1}
              colorScheme="red"
            >
              {type.type.name}
            </Badge>
          ))}
        </Center>
      </CardBody>
    </Card>
  );
};

export default PokemonCard;

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
};
