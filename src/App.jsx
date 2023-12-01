import { useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>} />
      </Routes>
    </>
  );
}

export default App;
