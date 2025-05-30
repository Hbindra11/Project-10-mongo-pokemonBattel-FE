import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LeaderboardPage component
const LeaderboardPage = () => {
  // State to hold leaderboard scores
  const [score, setScore] = useState([]);
  // State to hold new score input
  const [newScore, setNewScore] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data on mount
  useEffect(() => {
    axios
      .get("https://project-10-be.onrender.com/leaderboard")
      .then((res) => {
        console.log(res.data);
        setScore(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
        toast.success("Data was successfully saved!");
        setNewScore([]);
        // Close the modal dialog after successful save
        document.getElementById("my_modal_3").close();
        // Optionally, refresh the leaderboard
        axios
          .get("https://project-10-be.onrender.com/leaderboard")
          .then((res) => setScore(res.data));
      })
      .catch((err) => {
        console.error("error message: " + err);
        toast.error("Oops! Something went wrong!");
        // Close the modal dialog even if there's an error
        document.getElementById("my_modal_3").close();
      });
    // Do not navigate away, stay on the same page
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-xl mt-10">Loading data...</div>
      ) : (
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
            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
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
                <button type="submit" className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                  Save
                </button>
              </form>
              <span>press Esc to close</span>
            </div>
          </dialog>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default LeaderboardPage;
