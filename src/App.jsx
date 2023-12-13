import { useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateScript from './pages/Create-Script/index.jsx';
import ScriptManager from './pages/Script-Manager/index.jsx';
function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        {/* <Route path="/" element={<Dashboard></Dashboard>} /> */}
        <Route path="/create" element={<CreateScript></CreateScript>} />
         <Route path="/" element={<ScriptManager></ScriptManager>} />
      </Routes>
    </>
  );
}

export default App;
