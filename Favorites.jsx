import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function Favorites() {
  const { favorites } = useContext(PokemonContext);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>❤️ Your Favorite Pokémon</h2>

      <div className="grid">
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((p) => <PokemonCard key={p.id} pokemon={p} />)
        )}
      </div>
    </div>
  );
}
