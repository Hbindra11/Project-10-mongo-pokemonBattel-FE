const Hero = () => {
    return (
      <div className="text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-10 rounded-md shadow-lg mb-10">
        <h1 className="text-5xl font-bold">Welcome to Pokémon Battle Game</h1>
        <p className="text-xl mt-6">
          Select your Pokémon, battle with others, and climb the leaderboard!
        </p>
        <button className="mt-10 px-6 py-3 bg-white text-blue-500 font-bold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white">
          Start Playing
        </button>
      </div>
    );
  };
  
  export default Hero;
  