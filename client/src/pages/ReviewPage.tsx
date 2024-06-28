import { useEffect, useState } from "react";
import httpClient from "../httpClient";
import { Problem } from "../types";
import "../styles/ReviewPage.css";

// Page will display the problems to review today
const ReviewPage = () => {
  const [reviewList, setReviewList] = useState<Problem | null>(null);

  // On load, fetch the problems to review
  useEffect(() => {
    fetchReviewList();
  }, []);

  // Make a GET call to the API
  const fetchReviewList = async () => {
    const response = await httpClient.get("//localhost:5000/review-today");
    setReviewList(response.data.todayProblems);
  };

  return (
    <div className="container">
      {reviewList === null ? (
        <p>No problems to review today.</p>
      ) : (
        <>
          <div className="pb-2 mt-4 mb-2 border-bottom">
            <h1>Problems to review today:</h1>
            <small>
              After reviewing every new problem at 4 intervals in the first 30
              days you will improve your recall efficiency and it will take much
              longer to forget this material.{" "}
            </small>
          </div>
          <table className="table table-hover">
            <thead>
              <th scope="col">Problem Name</th>
              <th scope="col">URL</th>
              <th scope="col">Date Created</th>
            </thead>
            <tbody className="table-body">
              {reviewList.map((problem) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
