import { createContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const limit = 200;
  const offset = 0;

  const fetchPokemon = async () => {
    setLoading(true);

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const detailed = await Promise.all(
      data.results.map(async (p) => {
        const r = await fetch(p.url);
        return await r.json();
      })
    );

    setPokemon(detailed);
    setFilteredPokemon(detailed);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [search, pokemon]);

  // ADD Favorite
  const addFavorite = (poke) => {
    if (!favorites.find((f) => f.id === poke.id)) {
      setFavorites([...favorites, poke]);
    }
  };

  // REMOVE Favorite
  const removeFavorite = (poke) => {
    setFavorites(favorites.filter((f) => f.id !== poke.id));
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        filteredPokemon,
        loading,
        search,
        setSearch,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
