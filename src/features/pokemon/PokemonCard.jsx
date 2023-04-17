import { useGetByNameQuery } from "@/api/apiSlice";

const PokemonCard = ({ name }) => {
  const { data, isLoading } = useGetByNameQuery(name);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <p>{data.name}</p>
    </div>
  );
};

export default PokemonCard;
