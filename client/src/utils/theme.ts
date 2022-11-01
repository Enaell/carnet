import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: '#78d851',
      dark: '#007600',
      main: '#41a61d',
      contrastText: 'white',
    },
    secondary:{
      light: '#f75d46',
      main: '#e4472f',
      dark: '#bf2f19',
      contrastText: 'white',
    },
    background: {
      default: '#f9f9f9',
    }
  },
});
