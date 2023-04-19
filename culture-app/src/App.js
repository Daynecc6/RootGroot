import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize the primary color
    },
    secondary: {
      main: "#ff9800", // Customize the secondary color
    },
    tertiary: {
      main: "#4caf50", // Customize the tertiary color
    },
  },
});

function App() {
  return (
    <div>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
