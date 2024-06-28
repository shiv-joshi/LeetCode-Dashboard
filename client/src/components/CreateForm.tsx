import "../styles/CreateForm.css";
import { useState } from "react";
import httpClient from "../httpClient";

interface Props {
  username: string;
}

const CreateForm = ({ username }: Props) => {
  const [problemName, setProblemName] = useState("");
  const [url, setUrl] = useState("");

  const createProblem = async () => {
    try {
      const response = await httpClient.post(
        `//localhost:5000/create/${username}`,
        {
          problemName: problemName,
          url: url,
        }
      );
      window.location.href = "/";
    } catch (e: any) {
      alert(e.response.data.error);
    }
  };

  return (
    <div>
      <form className="create">
        <label>Problem name:</label>
        <input type="text" onChange={(e) => setProblemName(e.target.value)} />
        <label>Link to problem:</label>
        <input type="text" onChange={(e) => setUrl(e.target.value)} />
        <button
          type="button"
          className="btn btn-success"
          onClick={createProblem}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
