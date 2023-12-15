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
        <Route path="/create" element={<CreateScript></CreateScript>} />
        <Route path="/scripManager" element={<ScriptManager></ScriptManager>} />
        <Route path="/" element={<ProfilesPage></ProfilesPage>} />
        <Route path="/settings" element={<SettingsPage></SettingsPage>} />
        <Route path="/settings-proxy" element={<ProxySettingsPage></ProxySettingsPage>} />
      </Routes>
    </>
  );
}

export default App;
