import { useState } from "react";
import { Modal } from "react-bootstrap";
import httpClient from "../httpClient";
interface Props {
  show: boolean;
  onHide: () => void;
  problemName: string;
  url: string;
  id: string;
}

const UpdateForm = ({ show, onHide, problemName, url, id }: Props) => {
  const [updatedName, setUpdatedName] = useState(problemName);
  const [updatedUrl, setUrl] = useState(url);

  // Send update problem request
  const updateProblem = async () => {
    console.log(updatedName);

    const response = await httpClient.post(`//localhost:5000/update/${id}`, {
      problemName: updatedName,
      url: updatedUrl,
    });

    // Close modal and reload for new todo-list
    onHide();
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Updating Problem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Problem name:</label>
          <input
            className="form-control"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          ></input>
          <br />
          <label>Problem URL:</label>
          <input
            className="form-control"
            type="text"
            value={updatedUrl}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary"
          onClick={updateProblem}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateForm;
