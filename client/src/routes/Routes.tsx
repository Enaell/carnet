import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './LandingPage';
import { NotebookPage } from './NotebookPage';
import { RouteNotfound } from './RouteNotfound';

export const RoutesSwitch = () => {

  return (
      <div style={{minHeight: '100vh', width: '100%'}}>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/notebook/:username" element={<NotebookPage />}/>
          <Route path="*" element={<RouteNotfound />} />
        </Routes>
      </div>
  )
}
