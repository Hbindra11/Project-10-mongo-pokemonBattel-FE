
import axios from "axios";
import { useState, useEffect } from "react";

const BattlePage = () => {
  const [myPokemonlist, setMyPokemonlist] = useState([]); //all roster pokemeon are retrieved from mongodb roster
  const [selectedPok, setSelectPok] = useState(""); //state to store the player selected pokemon
  const [playerPokemon, setplayerPokemon] = useState(null); // Pokémon details
  const [computerPokemon, setComputerPokemon] = useState(null); // Computer-selected Pokémon

  useEffect(() => {
    axios
      .get("http://localhost:3000/roster")
      .then((res) => {
        console.log(res.data);
        setMyPokemonlist(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  //capturing the selected pokemon from the dropdownlist
  const handelChange = (e) => {
    setSelectPok(e.target.value);
  };

  //fetch payer data
  const fetchPlayerPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPok}`
      );
      setplayerPokemon({
        name: response.data.name,

        image: response.data.sprites.front_default,
      });
    } catch (error) {
      console.error("Error fetching player Pokémon:", error);
    } finally {
      computerPokemon &&
        console.log("fetch done" + JSON.stringify(playerPokemon));
    }
  };

  //retrieving pokemon data for pokemon selected by player playing
  const handelSubmit = (e) => {
    e.preventDefault();
    fetchPlayerPokemon();
  };
  // Fetch a random Pokémon for the computer
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
      let win = Math.floor(Math.random() * (2 - 1) + 2); // Random Pokémon ID (1-150)
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
      <br></br>
      {/*Player select's pokemon feature  */}
      <form onSubmit={handelSubmit}>
        <label>Choose a Pokemon</label>
        <br></br>
        <select
          className="select select-success w-full max-w-xs"
          value={selectedPok}
          onChange={handelChange}
        >
          <option disabled>Pick your pokemon</option>{" "}
          {myPokemonlist.map((pokemon) => (
            <>
              <option key={crypto.randomUUID()}>{pokemon.name}</option>
            </>
          ))}
        </select>
        <button type="submit" className="btn btn-success">
          Select
        </button>
      </form>

      <div className="flex justify-center">
        {playerPokemon && (
          <div className="card bg-blue-100 w-96 shadow-xl mt-7 ">
            <div className="card-body">
              <h2 className="card-title">
                Hi! I&apos;m
                <div className="badge badge-accent text-lg">
                  {playerPokemon.name}
                </div>
              </h2>
              <p> And I'm ready to fight!</p>
            </div>
            <figure>
              <img src={playerPokemon.image} alt="Player pokemon" />
            </figure>
          </div>
        )}

        {/* Computer's Pokémon */}
        {computerPokemon && (
          <div className="card bg-blue-100 w-96 shadow-xl m-7">
            <div className="card-body">
              <h2 className="card-title">
                Hi! I&apos;m
                <div className="badge badge-accent text-lg">
                  {computerPokemon.name}
                </div>
              </h2>
              <p> The Computer's Pokémon !</p>
            </div>
            <figure>
              <img src={computerPokemon.image} alt="Player pokemon" />
            </figure>
          </div>
        )}
      </div>
      <div className="text-center mt-10"></div>

      <br></br>
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
