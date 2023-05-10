import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./pages/Login/redux/store";
import Main from "./components/Main";
import "./App.css";

function App() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetch("/countries.geo.json")
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
      });
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Main mapData={mapData} />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
