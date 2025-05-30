import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/HomePage";
import BattlePage from "./Components/BattlePage";
import DetailsPage from "./Components/DetailsPage";
import RosterPage from "./Components/RosterPage";
import LeaderboardPage from "./Components/LeaderboardPage";

/**
 * Main application component that sets up the routing for the Pokemon Battle app.
 *
 * @component
 *
 * @returns {JSX.Element} The root component containing the navigation bar and all route definitions.
 *
 * @example
 * // Renders the application with navigation and page routing
 * <App />
 *
 * Routes:
 * - "/" renders the Homepage component.
 * - "/details/:id" renders the DetailsPage component for a specific Pokemon.
 * - "/roster" renders the RosterPage component.
 * - "/battle" renders the BattlePage component.
 * - "/leaderboard" renders the LeaderboardPage component.
 */
const App = () => {
  return (
    <Router>
      {/* Make Navbar fixed at the top */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <Navbar />
      </div>
      {/* Add padding-top to prevent content from being hidden behind the fixed Navbar */}
      <div style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
