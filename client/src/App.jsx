import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import MUI ThemeProvider and createTheme
import Form from './components/Form'; // Import your Form component

// Create a MUI theme (you can customize this)
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Example primary color
    },
    secondary: {
      main: '#f50057', // Example secondary color
    },
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <>
         <Form /> 
      </>
    </ThemeProvider>
  );
}

export default App;