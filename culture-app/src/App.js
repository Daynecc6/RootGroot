import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./pages/Login/redux/store";
import Main from "./components/Main";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
