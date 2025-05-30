import axios from "axios";
import { useState, useEffect } from "react";

// BattlePage component handles the Pokémon battle logic and UI
const BattlePage = () => {
  // State to store the user's Pokémon roster fetched from MongoDB
  const [myPokemonlist, setMyPokemonlist] = useState([]);
  // State to store the selected Pokémon's name from the dropdown
  const [selectedPok, setSelectPok] = useState("");
  // State to store the selected player's Pokémon details (name, image)
  const [playerPokemon, setplayerPokemon] = useState(null);
  // State to store the computer's randomly selected Pokémon details
  const [computerPokemon, setComputerPokemon] = useState(null);

  // Fetch the user's Pokémon roster from the backend when the component mounts
  useEffect(() => {
    axios
      .get("https://project-10-be.onrender.com/roster")
      .then((res) => {
        console.log([res.data]);
        setMyPokemonlist(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle change in the dropdown selection
  const handelChange = (e) => {
    setSelectPok(e.target.value);
  };

  // Fetch details for the selected player's Pokémon from the PokéAPI
  const fetchPlayerPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPok}`
      );
      setplayerPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
      });
      console.log("Player Pokémon fetched:", response.data);
    } catch (error) {
      console.error("Error fetching player Pokémon:", error);
    } finally {
      computerPokemon &&
        console.log("fetch done" + JSON.stringify(playerPokemon));
    }
  };

  // Handle form submission to fetch the selected player's Pokémon
  const handelSubmit = (e) => {
    e.preventDefault();
    fetchPlayerPokemon();
  };

  // Fetch a random Pokémon for the computer and determine the winner randomly
  const fetchComputerPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1; // Random Pokémon ID (1-150)
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setComputerPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
      });
    } catch (error) {
      console.error("Error fetching computer Pokémon:", error);
    } finally {
      // Randomly decide the winner (player or computer)
      let win = Math.floor(Math.random() * (2 - 1) + 2);
      if (win === 1) {
        alert("player wins!");
      } else {
        alert("Computer wins!");
      }
    }
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Battle Page</h1>
      <p className="text-lg mt-4">Start battling with random Pokémon!</p>
      <br />
      {/* Player selects a Pokémon from their roster */}
      <form onSubmit={handelSubmit}>
        <label>Choose a Pokemon</label>
        <br />
        <select
          className="select select-success w-full max-w-xs"
          value={selectedPok}
          onChange={handelChange}
        >
          <option disabled>Pick your pokemon</option>
          {/* Render options for each Pokémon in the user's roster */}
          {myPokemonlist.map((pokemon) => (
            <>
              <option key={pokemon._id || pokemon.name}>{pokemon.name}</option>
            </>
          ))}
         
        </select>
        <button type="submit" className="btn btn-success">
          Select
        </button>
      </form>

      <div className="flex justify-center">
        {/* Display the selected player's Pokémon card */}
        {playerPokemon && (
          <div className="card bg-blue-100 w-96 shadow-xl mt-7 ">
            <div className="card-body">
              <h2 className="card-title">
                Hi! I&apos;m
                <div className="badge badge-accent text-lg">
                  {playerPokemon.name}
                </div>
              </h2>
              <p> And I&apos;m ready to fight!</p>
            </div>
            <figure>
              <img src={playerPokemon.image} alt="Player pokemon" />
            </figure>
          </div>
        )}

        {/* Display the computer's randomly selected Pokémon card */}
        {computerPokemon && (
          <div className="card bg-blue-100 w-96 shadow-xl m-7">
            <div className="card-body">
              <h2 className="card-title">
                Hi! I&apos;m
                <div className="badge badge-accent text-lg">
                  {computerPokemon.name}
                </div>
              </h2>
              <p> The Computer&apos;s Pokémon !</p>
            </div>
            <figure>
              <img src={computerPokemon.image} alt="Player pokemon" />
            </figure>
          </div>
        )}
      </div>
      <div className="text-center mt-10"></div>

      <br />
      {/* Button to start the battle and fetch the computer's Pokémon */}
      <button
        onClick={fetchComputerPokemon}
        className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
      >
        Start Battle
      </button>
    </div>
  );
};

export default BattlePage;
