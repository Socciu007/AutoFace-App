import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Route, Routes } from "react-router-dom";
import ScriptManager from "./pages/Script-Manager";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<ScriptManager></ScriptManager>} />
      </Routes>
    </>
  );
}

export default App;
