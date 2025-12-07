import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./pagination.css";

export default function Pagination() {
  const { page, nextPage, prevPage } = useContext(PokemonContext);

  return (
    <div className="pagination-container">
      <button 
        onClick={prevPage} 
        disabled={page === 0}
      >
        ⬅ Previous
      </button>

      <span>Page {page + 1}</span>

      <button onClick={nextPage}>Next ➡</button>
    </div>
  );
}
