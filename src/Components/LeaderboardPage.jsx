import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// LeaderboardPage component
const LeaderboardPage = () => {
  // State to hold leaderboard scores
  const [score, setScore] = useState([]);
  // State to hold new score input
  const [newScore, setNewScore] = useState([]);
  const navigate = useNavigate();

  // Fetch leaderboard data on mount
  useEffect(() => {
    axios
      .get("https://project-10-be.onrender.com/leaderboard")
      .then((res) => {
        console.log(res.data);
        setScore(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle input changes for new score form
  const handeChange = (e) => {
    setNewScore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("input name: " + JSON.stringify(newScore));
  };

  // Handle form submission to add a new score
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://project-10-be.onrender.com/leaderboard", newScore)
      .then((res) => {
        console.log("here is the response: " + res.data);
        alert("data was successfully saved!");
        setNewScore([]);
      })
      .catch((err) => {
        console.error("error message: " + err);
        alert("oops! something went wrong!");
      });
    navigate("/");
  };

  return (
    <>
      {
        // Main container
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-lg mt-4">
            Check the top players and their scores!
          </p>
          {/* Leaderboard list */}
          <div className="flex justify-center ">
            <div className=" bg-blue-200 w-56  m-6 outline-double overflow-y-scroll h-80">
              <ul className="list-none ">
                {score.map((aScore) => (
                  <div key={crypto.randomUUID()} className=" h-11 ">
                    <li>
                      <div className=" flex justify-between m-5 ">
                        {aScore.username}
                        <div />
                        {aScore.score}
                      </div>
                    </li>
                  </div>
                ))}{" "}
              </ul>
            </div>
          </div>

          {/* Button to open modal for adding a new score */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Add Score
          </button>
          {/* Modal dialog for adding a new score */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog" onSubmit={handelSubmit}>
                {/* Input for player username */}
                <br></br>
                <label className="input input-bordered flex items-center gap-2">
                  Player
                  <input
                    type="text"
                    className="grow"
                    name="username"
                    onChange={handeChange}
                    required
                    placeholder="Type here"
                  />
                </label>
                <br></br>
                {/* Input for player score */}
                <label className="input input-bordered flex items-center gap-2">
                  Score
                  <input
                    type="number"
                    className="grow"
                    name="score"
                    placeholder="Type here"
                    onChange={handeChange}
                    required
                  />
                </label>
                <br></br>
                {/* Submit button */}
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </form>
              <span>press Esc to close</span>
            </div>
          </dialog>
        </div>
      }
    </>
  );
};

export default LeaderboardPage;
