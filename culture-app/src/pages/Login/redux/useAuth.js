import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authActions";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await dispatch(login(username, password));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });

      if (token) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("Login failed: Invalid credentials");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
  };
};
