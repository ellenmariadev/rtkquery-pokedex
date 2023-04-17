import PokemonList from "@/features/pokemon/PokemonList";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { TbCircleChevronLeft } from "react-icons/tb";

export const List = () => {
  return (
    <div>
      <Link as={RouterLink} to="/">
        <Icon mt={5} ml={5} as={TbCircleChevronLeft} w={16} h={16} color="red.500" />
      </Link>
      <PokemonList />
    </div>
  );
};
