import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import BattlePage from "./components/BattlePage";
import DetailsPage from "./components/DetailsPage";
import RosterPage from "./components/RosterPage";
import LeaderboardPage from "./components/LeaderboardPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
