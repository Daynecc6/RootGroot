import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import MainContent from './components/Content';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize the primary color
    },
    secondary: {
      main: '#ff9800', // Customize the secondary color
    },
    tertiary: {
      main: '#4caf50', // Customize the tertiary color
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
