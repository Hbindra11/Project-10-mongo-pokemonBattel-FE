import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LeaderboardPage = () => {
  const [score, setScore] = useState([]);
  const [newScore, setNewScore] = useState([]);
  const navigate = useNavigate();
  setNewScore;
  useEffect(() => {
    axios
      .get("http://localhost:3000/leaderboard")
      .then((res) => {
        console.log(res.data);
        setScore(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handeChange = (e) => {
    setNewScore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("input name: " + JSON.stringify(newScore));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/leaderboard", newScore)
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
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-lg mt-4">
            Check the top players and their scores!
          </p>
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

          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Add Score
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog" onSubmit={handelSubmit}>
                {/* if there is a button in form, it will close the modal */}
                {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button> */}
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
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </form><span>press Esc to close</span>
            </div>
          </dialog>
        </div>
      }
    </>
  );
};

export default LeaderboardPage;
