import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { PokemonProvider } from "./context/PokemonContext";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <PokemonProvider>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ❤️</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </PokemonProvider>
  );
}

export default App;
