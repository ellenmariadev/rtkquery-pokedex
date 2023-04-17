import { useGetAllQuery } from "@/api/apiSlice";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { data, isLoading } = useGetAllQuery(10);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.results.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonList;
