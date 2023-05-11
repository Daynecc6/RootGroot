export const login = (username, password) => async (dispatch) => {
  // Call your actual login API here
  const loginUser = async (username, password) => {
    const response = await fetch(
      "https://root-groot-webservice.onrender.com/api/login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

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
export const register = (formData) => async (dispatch) => {
  // Call your actual register API here
  const registerUser = async (formData) => {
    const response = await fetch(
      "https://root-groot-webservice.onrender.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  };

  try {
    const { token } = await registerUser(formData);
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
    return token;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};
