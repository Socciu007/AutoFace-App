import React, { useEffect, useState } from 'react';
import './style.scss';
// import Loading from '../../components/loading/Loading.jsx';
// import WatchVideo from '../../components/WatchVideo/WatchVideo';
// import WatchStory from '../../components/WatchStory/WatchStory.jsx';
// import Newsfeed from '../../components/Newsfeed/Newsfeed.jsx';
import CreatePost from '../../components/CreatePost/CreatePost';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
const Dashboard = () => {
  const { t } = useTranslation('translation');
  const changeLanguage = (e) => {
    console.log(e);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <>
      <div className="dashboard ">
        {/* <WatchVideo></WatchVideo> */}
        {/* <WatchStory></WatchStory> */}
        {/* <Newsfeed></Newsfeed> */}
        <CreatePost></CreatePost>
      </div>
    </>
  );
};

export default Dashboard;
