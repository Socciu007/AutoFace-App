import { useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Routes } from 'react-router-dom';
import CreateScript from './pages/Create-Script/index.jsx';
import ScriptManager from './pages/Script-Manager/index.jsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.jsx';
import ProxySettingsPage from './pages/ProxySettingsPage/ProxySettingsPage.jsx';
import ProfilesPage from './pages/ProfilesPage/ProfilesPage.jsx';
function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/create" element={<CreateScript></CreateScript>} />
        <Route path="/scripManager" element={<ScriptManager></ScriptManager>} />{' '}
        <Route path="/settings" element={<SettingsPage></SettingsPage>} />
        <Route path="/settings-proxy" element={<ProxySettingsPage></ProxySettingsPage>} />
        <Route path="/" element={<ProfilesPage></ProfilesPage>} />
      </Routes>
    </>
  );
}

export default App;
