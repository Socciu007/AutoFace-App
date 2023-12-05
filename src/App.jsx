import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Route, Routes } from "react-router-dom";
import ScriptManager from "./pages/Script-Manager";
import CreateScript from "./pages/Create-Script";
function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<ScriptManager></ScriptManager>} />
        <Route path="/create" element={<CreateScript></CreateScript>} />
      </Routes>
    </>
  );
}

export default App;
