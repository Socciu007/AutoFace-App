import React, { useEffect, useState } from 'react';
import './style.scss';
import Loading from '../../components/loading/Loading.jsx';
import WatchVideo from '../../components/General/WatchVideo/WatchVideo.jsx';
import WatchStory from '../../components/General/WatchStory/WatchStory.jsx';
import Newsfeed from '../../components/General/Newsfeed/Newsfeed.jsx';
import CreatePost from '../../components/General/CreatePost/CreatePost';
import Post_Interaction from '../../components/General/Post_Interaction/Post_Interaction.jsx';
import Delete_Post from '../../components/General/Delete_Post/Delete_Post.jsx';
import Send_Message from '../../components/General/Send_Message/Send_Message.jsx';
import Reply_Message from '../../components/General/Reply_Message/Reply_Message.jsx';
import View_Notifications from '../../components/General/View_Notifications/View_Notifications.jsx';
import AddFriend from '../../components/General/Add_Friends/AddFriend.jsx';
import CancelFriend from '../../components/General/Cancel_Friend/CancelFriend.jsx';
import JoinGroup from '../../components/Group/Join_Group/JoinGroup.jsx';
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
        {/* <WatchVideo></WatchVideo>
        <WatchStory></WatchStory>
        <Newsfeed></Newsfeed>
        <CreatePost></CreatePost>
        <Post_Interaction></Post_Interaction>
        <Delete_Post></Delete_Post>
        <Send_Message></Send_Message>
        <Reply_Message></Reply_Message>
        <View_Notifications></View_Notifications>
        <AddFriend></AddFriend>
        <CancelFriend></CancelFriend> */}
        <JoinGroup></JoinGroup>
      </div>
    </>
  );
};

export default Dashboard;
