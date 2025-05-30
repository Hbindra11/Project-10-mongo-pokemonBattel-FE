import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "./Hero";

// Homepage component displays a list of Pokémon fetched from the PokéAPI
const Homepage = () => {
  // State to store the list of Pokémon with their names and images
  const [pokemonList, setPokemonList] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of Pokémon (first 150)
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        // For each Pokémon, fetch its details to get the image
        const fetchDetails = response.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => ({
            name: res.data.name,
            image: res.data.sprites.front_default, // Pokémon image URL
          }))
        );

        // Wait for all Pokémon details to be fetched, then update state
        Promise.all(fetchDetails).then((details) => {
          setPokemonList(details);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading data...</div>;
  }

  return (
    <div className="p-10">
      {/* Hero Section at the top of the page */}
      <Hero />

      {/* Heading for the Pokémon list */}
      <h2 className="text-3xl font-bold mb-6 text-center">Available Pokémon</h2>
      {/* Grid layout for displaying Pokémon cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 text-center"
          >
            {/* Pokémon image */}
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mx-auto mb-4 h-24 w-24"
            />
            {/* Pokémon name */}
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
            {/* Link to Pokémon details page */}
            <Link
              to={`/details/${pokemon.name}`}
              className="text-blue-500 underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
