import PokemonList from "@/features/pokemon/PokemonList";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const List = () => {
  return (
    <div>
      <Link as={RouterLink} to="/">
        Voltar
      </Link>
      <PokemonList />
    </div>
  );
};
