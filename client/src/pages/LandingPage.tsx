import { useEffect, useState } from "react";
import httpClient from "../httpClient";
import CreateForm from "../components/CreateForm";
import ProblemList from "../components/ProblemList";
import { Problem, User } from "../types";
import UpdateForm from "../components/UpdateForm";

// Page will have create functionality and full problem list
const LandingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [problemList, setProblemList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  // On load, get the current user
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await httpClient.get("//localhost:5000/@me");
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Fetch problem list when the user is available
  useEffect(() => {
    if (user) {
      fetchList();
    }
  }, [user]);

  const fetchList = async () => {
    try {
      const response = await httpClient.get(
        `//localhost:5000/get-problems/${user?.username}`
      );
      setProblemList(response.data.allProblems);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Display update modal
  const updateCallback = (problem: Problem) => {
    setProblemName(problem.problemName);
    setUrl(problem.url);
    setId(problem.id);
    setShowModal(true);
  };

  return (
    <div className="container">
      {showModal && (
        <UpdateForm
          show={showModal}
          onHide={() => setShowModal(false)}
          problemName={problemName}
          url={url}
          id={id}
        />
      )}
      <div className="pb-2 mt-4 mb-2 border-bottom">
        <h1>LeetCode Dashboard</h1>
        <small>
          Use spaced repetition to retain information longer and master LeetCode
          at a faster pace! After you add a problem, it will show up in the
          review tab after 1, 3, 7, 21, and 30 days to combat Ebbinghaus's
          Forgetting Curve.
        </small>
      </div>
      {user !== null ? (
        <>
          <h4>Hi {user.username}.</h4>
          <CreateForm username={user.username} />
          <ProblemList
            problemList={problemList}
            updateCallback={updateCallback}
          />
        </>
      ) : (
        <div>
          <h4>You are not logged in.</h4>
          <a href="/login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
