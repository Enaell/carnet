import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Column } from './components/common/Flexbox';
import { RoutesSwitch } from './routes/Routes';

function App() {
  return (
    <BrowserRouter>

    <Column horizontal='center' width='100%' style={{backgroundColor: '#white'}}>
    {/* <Navbar /> */}
    <RoutesSwitch />
  </Column>
  </ BrowserRouter>

  );
}

export default App;
