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
      throw new Error("Invalid credentials");
    }
  };

  try {
    const { token } = await loginUser(username, password);
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};
