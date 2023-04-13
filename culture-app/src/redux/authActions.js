export const login = (username, password) => async (dispatch) => {
  // Call your actual login API here
  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  };

  try {
    const { token } = await loginUser(username, password);
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
    return token;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error; // Propagate the error to the LoginForm component
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};

// src/redux/authActions.js
export const register = (email, username, password) => async (dispatch) => {
  // Call your actual register API here
  const registerUser = async (email, username, password) => {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  };

  try {
    const { token } = await registerUser(email, username, password);
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};
