// import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Route, Routes } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage/ProfilesPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProxySettingsPage from "./pages/ProxySettingsPage/ProxySettingsPage";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<ProfilesPage></ProfilesPage>} />
        <Route path="/settings" element={<SettingsPage></SettingsPage>} />
        <Route path="/settings-proxy" element={<ProxySettingsPage></ProxySettingsPage>} />
      </Routes>
    </>
  );
}

export default App;
