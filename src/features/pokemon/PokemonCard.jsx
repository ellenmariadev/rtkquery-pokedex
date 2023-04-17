import { useGetByNameQuery } from "@/api/apiSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToFavorites } from "./favoriteSlice";

const PokemonCard = ({ name }) => {
  const { data, isLoading } = useGetByNameQuery(name);

  const dispatch = useDispatch();

  const handleFavorite = useCallback((pokemon) => {
    dispatch(addToFavorites(pokemon));
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <p>{data.name}</p>
      <button onClick={() => handleFavorite(data)}>❤️</button>
    </div>
  );
};

export default PokemonCard;
