import { useState } from "react";
import httpClient from "../httpClient";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await httpClient.post("//localhost:5000/register", {
        username: username,
        password: password,
      });
      window.location.href = "/";
    } catch (e) {
      alert("Invalid username or password.");
    }
  };

  return (
    <>
      <h1>Sign up below</h1>
      <form>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="button" onClick={() => registerUser()}>
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
