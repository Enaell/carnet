import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './LandingPage';
import { RouteNotfound } from './RouteNotfound';

export const RoutesSwitch = () => {
  
  const [name, setName] = useState<string>();

  return (
      <div style={{width:'100%', minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<LandingPage onLogin={setName}/>}/>
          {/* <Route path="/notebook" element={<NotebookPage />}/> */}
          <Route element={<RouteNotfound />} />
        </Routes>
      </div>
  )
}
