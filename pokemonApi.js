export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data.results;
};

export const fetchPokemonDetails = async (url) => {
  const res = await fetch(url);
  return res.json();
};
