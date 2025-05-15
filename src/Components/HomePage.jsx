import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "./Hero";

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    // Fetch Pokémon data
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        // Fetch individual Pokémon details to get images
        const fetchDetails = response.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => ({
            name: res.data.name,
            image: res.data.sprites.front_default, // Get the Pokémon image
          }))
        );

        // Wait for all Pokémon details to load
        Promise.all(fetchDetails).then((details) => setPokemonList(details));
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }, []);

  return (
    <div className="p-10">
      {/* Hero Section */}
      <Hero />

      {/* Pokémon List */}
      <h2 className="text-3xl font-bold mb-6 text-center">Available Pokémon</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 text-center"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mx-auto mb-4 h-24 w-24"
            />
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
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
