import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link as={RouterLink} to="/list">
        Ir para a Lista
      </Link>
    </div>
  );
};
