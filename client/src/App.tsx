import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Column } from './components/common/Flexbox';
import { RoutesSwitch } from './routes/Routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Column horizontal='center' width='100%' style={{backgroundColor: '#white'}}>
          {/* <Navbar /> */}
          <RoutesSwitch />
        </Column>
      </ BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
