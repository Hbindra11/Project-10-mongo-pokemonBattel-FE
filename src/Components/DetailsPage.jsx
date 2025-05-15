import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams(); // Pokémon ID from the URL
  const [pokemon, setPokemon] = useState(null); // Pokémon details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Navigation

  useEffect(() => {
    // Fetch Pokémon details from PokeAPI
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        const data = response.data;
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type) => type.type.name), // Extract types
          abilities: data.abilities.map((ability) => ability.ability.name), // Extract abilities
          stats: data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })), // Extract stats
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      });
  }, [id]);

  // Add Pokémon to roster via backend
  const addToRoster = async () => {
    try {
      const response = await axios.post("http://localhost:3000/roster", {
        name: pokemon.name,
        image: pokemon.image,
      });
      alert(response.data.message || "Pokémon added to roster!");
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Show error from backend
      } else {
        alert("Error adding Pokémon to roster!");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Loading Pokémon details...</p>;
  }

  if (!pokemon) {
    return <p className="text-center text-xl">No Pokémon found.</p>;
  }

  return (
    <div className="p-10">
      {/* Pokémon Name */}
      <h1 className="text-4xl font-bold capitalize text-center mb-6">{pokemon.name}</h1>

      {/* Pokémon Image */}
      <div className="text-center">
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-6" />
      </div>

      {/* Pokémon Details in Table Format */}
      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Attribute</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Types */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Types</td>
              <td className="border border-gray-300 px-4 py-2">{pokemon.types.join(", ")}</td>
            </tr>

            {/* Abilities */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Abilities</td>
              <td className="border border-gray-300 px-4 py-2">{pokemon.abilities.join(", ")}</td>
            </tr>

            {/* Stats */}
            {pokemon.stats.map((stat, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">{stat.name}</td>
                <td className="border border-gray-300 px-4 py-2">{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add to Roster Button */}
      <div className="text-center mt-6">
        <button
          onClick={addToRoster}
          className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Add to Roster
        </button>
      </div>

      {/* Back to Homepage */}
      {/*<div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Back to Homepage
        </button>
      </div> */}
    </div>
  );
};

export default DetailsPage;
