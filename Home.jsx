import { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { filteredPokemon, loading, search, setSearch } =
    useContext(PokemonContext);

  const itemsPerPage = 25; // Grid: 5x5
  const [page, setPage] = useState(1);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const current = filteredPokemon.slice(start, start + itemsPerPage);

  return (
    <div className="container">

      {/* Search Bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Pokemon Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid"
        >
          {current.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
