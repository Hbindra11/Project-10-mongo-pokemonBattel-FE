import axios from "axios";
import { useState, useEffect } from "react";
// Import toast from react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Fetch details for the selected player's Pokémon from the PokéAPI
  const fetchPlayerPokemon = async (pokemonName) => {
    if (!pokemonName) return;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
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

  // Fetch player Pokémon whenever the selection changes
  useEffect(() => {
    if (selectedPok) {
      fetchPlayerPokemon(selectedPok);
    } else {
      setplayerPokemon(null);
    }
    // eslint-disable-next-line
  }, [selectedPok]);

  // Handle change in the dropdown selection
  const handelChange = (e) => {
    setSelectPok(e.target.value);
  };

  // Fetch a random Pokémon for the computer
  const fetchRandomComputerPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1; // Random Pokémon ID (1-150)
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setComputerPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
      });
      console.log("Computer Pokémon fetched:", response.data);
    } catch (error) {
      console.error("Error fetching computer Pokémon:", error);
    }
  };

  // Fetch computer Pokémon whenever the player selects a Pokémon, with a slight delay before displaying
  useEffect(() => {
    if (selectedPok) {
      // Clear the previous computerPokemon immediately
      setComputerPokemon(null);
      // Add a delay before fetching and displaying the new computer Pokémon
      const timer = setTimeout(() => {
        fetchRandomComputerPokemon();
      }, 700); // 700ms delay before showing computer's Pokémon
      return () => clearTimeout(timer);
    } else {
      setComputerPokemon(null);
    }
    // eslint-disable-next-line
  }, [selectedPok]);

  // Fetch a random Pokémon for the computer and then decide the winner after a delay
  const fetchComputerPokemon = async () => {
    // Don't fetch a new computer Pokémon, just decide the winner
    // Wait a moment before deciding the winner so the user can see the computer's Pokémon
    setTimeout(() => {
      let win = Math.floor(Math.random() * 2); // 0 or 1
      if (win === 1) {
        toast.success("Player wins!");
      } else {
        toast.error("Computer wins!");
      }
    }, 1000); // 1 second delay
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Battle Page</h1>
      <p className="text-lg mt-4">Start battling with a random Pokémon and may the lucky one win!</p>
      <br />
      {/* Player selects a Pokémon from their roster */}
      <label>Choose a Pokemon</label>
      <br />
      <select
        className="select select-success w-full max-w-xs"
        value={selectedPok}
        onChange={handelChange}
      >
        <option disabled value="">
          Pick your pokemon
        </option>
        {/* Render options for each Pokémon in the user's roster */}
        {myPokemonlist.map((pokemon) => (
          <option key={pokemon._id || pokemon.name}>{pokemon.name}</option>
        ))}
      </select>

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
              <p> And I&apos;m your Pokémon ready to fight!</p>
            </div>
            <figure>
              <img src={playerPokemon.image} alt="Player pokemon" />
            </figure>
          </div>
        )}

        {/* Display the computer's randomly selected Pokémon card, styled the same as player's card */}
        {computerPokemon && (
          <div className="card bg-blue-100 w-96 shadow-xl mt-7 ml-7">
            <div className="card-body">
              <h2 className="card-title">
                Hi! I&apos;m
                <div className="badge badge-accent text-lg">
                  {computerPokemon.name}
                </div>
              </h2>
              <p> And I&apos;m the Computer&apos;s Pokémon!</p>
            </div>
            <figure>
              <img src={computerPokemon.image} alt="Computer pokemon" />
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
      <ToastContainer />
    </div>
  );
};

export default BattlePage;
