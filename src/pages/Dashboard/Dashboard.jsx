import React, { useEffect, useState } from 'react';
import './style.scss';
import Loading from '../../components/loading/Loading.jsx';
import WatchVideo from '../../components/WacthVideo/WatchVideo';
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
        <WatchVideo></WatchVideo>
      </div>
    </>
  );
};

export default Dashboard;
