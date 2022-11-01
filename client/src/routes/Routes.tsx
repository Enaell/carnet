import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './LandingPage';
import { NotebookPage } from './NotebookPage';
import { RouteNotfound } from './RouteNotfound';

export const RoutesSwitch = () => {
  


  return (
      <div style={{width:'100%', minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/notebook/:username" element={<NotebookPage />}/>
          <Route path="*" element={<RouteNotfound />} />
        </Routes>
      </div>
  )
}
