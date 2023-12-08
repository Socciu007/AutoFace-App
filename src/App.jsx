// import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Route, Routes } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage/ProfilesPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProxySettingsPage from "./pages/ProxySettingsPage/ProxySettingsPage";
import BoostLikeComment from "./pages/BoostLikeCommentPage/BoostLikeComment";
import BoostFollower from "./pages/BoostFollowerPage/BoostFollower";
import BoostView from "./pages/BoostViewPage/BoostView";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<ProfilesPage></ProfilesPage>} />
        <Route path="/settings" element={<SettingsPage></SettingsPage>} />
        <Route path="/settings-proxy" element={<ProxySettingsPage></ProxySettingsPage>} />
        <Route path="/boost-like-comment" element={<BoostLikeComment></BoostLikeComment>} />
        <Route path="/boost-follower" element={<BoostFollower></BoostFollower>}/>
        <Route path="/boost-view" element={<BoostView></BoostView>}/>
      </Routes>
    </>
  );
}

export default App;
