import React from "react";

const SettingsPage = () => {
  return (
    <div className="layout-profiles">
      <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
      <div className="-return-profiles">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
          <path
            d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
            stroke="#01162B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="-btn-profiles">Automation settings</p>
      </div>
    </div>
  );
};

export default SettingsPage;
