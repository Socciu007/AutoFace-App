import React, { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../components/loading/Loading";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    console.log(e);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <>
      <div className="dashboard ">
        <span className="dashboard__title">{t("Title")}</span>

        <div className="dashboard__loading">
          <Loading></Loading>
          {t("Loading")}...
        </div>

        <select
          onChange={(e) => {
            changeLanguage(e);
          }}
          style={{
            marginTop: 20,
          }}
        >
          <option value="eng">English</option>
          <option value="vie">Vietnamese</option>
        </select>
      </div>
    </>
  );
};

export default Dashboard;
