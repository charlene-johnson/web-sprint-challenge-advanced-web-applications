import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);

        history.pushState("/bubblepage");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitLogin}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChanges}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
