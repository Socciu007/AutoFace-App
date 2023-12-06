import React, { useEffect, useState } from 'react';
import './style.scss';
import Loading from '../../components/loading/Loading.jsx';
import WatchVideo from '../../components/WatchVideo/WatchVideo';
import WatchStory from '../../components/WatchStory/WatchStory.jsx';
import Newsfeed from '../../components/Newsfeed/Newsfeed.jsx';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post_Interaction from '../../components/Post_Interaction/Post_Interaction.jsx';
import Delete_Post from '../../components/Delete_Post/Delete_Post.jsx';
import Send_Message from '../../components/Send_Message/Send_Message.jsx';
import Reply_Message from '../../components/Reply_Message/Reply_Message.jsx';
import View_Notifications from '../../components/View_Notifications/View_Notifications.jsx';
import AddFriend from '../../components/Add_Friends/AddFriend.jsx';
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
        {/* <CreatePost></CreatePost> */}
        {/* <Post_Interaction></Post_Interaction> */}
        {/* <Delete_Post></Delete_Post> */}
        {/* <Send_Message></Send_Message> */}
        {/* <Reply_Message></Reply_Message> */}
        {/* <View_Notifications></View_Notifications> */}
        <AddFriend></AddFriend>
      </div>
    </>
  );
};

export default Dashboard;
