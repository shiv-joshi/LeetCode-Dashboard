import "../styles/ProblemList.css";
import httpClient from "../httpClient";
import { Problem } from "../types";

interface Props {
  problemList: Problem[];
  updateCallback: (arg0: Problem) => void;
}

const ProblemList = ({ problemList, updateCallback }: Props) => {
  // Delete problem request
  const deleteProblem = async (problem: Problem) => {
    const response = await httpClient.delete(
      `//localhost:5000/delete/${problem.id}`
    );
    alert("Problem deleted!");
    window.location.reload();
  };

  return (
    <div>
      {problemList.length === 0 ? (
        <p>There are no problems to display.</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Problem Name</th>
              <th scope="col">URL</th>
              <th scope="col">Date Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {problemList.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.problemName}</td>
                <td>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {problem.url}
                  </a>
                </td>
                <td>
                  {problem.date.toString().split(" ").slice(0, 4).join(" ")}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => updateCallback(problem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteProblem(problem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProblemList;
