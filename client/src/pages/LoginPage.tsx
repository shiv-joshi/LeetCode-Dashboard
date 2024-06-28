import { useState } from "react";
import httpClient from "../httpClient";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await httpClient.post("//localhost:5000/login", {
        username,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <>
      <h1>Log into your account</h1>
      <form className="form">
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
        <button type="button" onClick={() => loginUser()} className="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;
