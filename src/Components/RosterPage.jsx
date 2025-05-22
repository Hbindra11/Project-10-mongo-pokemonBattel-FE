import { useEffect, useState } from "react";
import axios from "axios";

const RosterPage = () => {
  const [roster, setRoster] = useState([]); // Holds the roster data
  const [loading, setLoading] = useState(true); // Indicates if data is loading

  // Fetch roster data from the backend when the component mounts
  useEffect(() => {
    axios
      .get("https://project-10-be.onrender.com/roster")
      .then((response) => {
        setRoster(response.data); // Update roster state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching roster:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Remove a Pokémon from the roster by its ID
  const removeFromRoster = async (id) => {
    try {
      await axios.delete(`https://project-10-be.onrender.com/roster/${id}`); // Send DELETE request to backend
      setRoster(roster.filter((pokemon) => pokemon._id !== id)); // Remove Pokémon from local state
      alert("Pokémon removed from roster!");
    } catch (error) {
      console.error("Error removing Pokémon:", error);
      alert("Failed to remove Pokémon from roster!");
    }
  };

  // Show loading message while data is being fetched
  if (loading) {
    return <p className="text-center text-xl">Loading your roster...</p>;
  }

  // Show message if the roster is empty
  if (roster.length === 0) {
    return <p className="text-center text-xl">Your roster is empty!</p>;
  }

  // Render the roster page
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Your Pokémon Roster</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {roster.map((pokemon) => (
          <div
            key={pokemon._id}
            className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 text-center"
          >
            <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-4" />
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
            <button
              onClick={() => removeFromRoster(pokemon._id)}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RosterPage;
