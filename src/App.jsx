// import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Route, Routes } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage/ProfilesPage";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<ProfilesPage></ProfilesPage>} />
      </Routes>
    </>
  );
}

export default App;
