import React, { useEffect, useState } from "react";
import up from "../../assets/pictures/icon-updown.svg";
import down from "../../assets/pictures/icon-downup.svg";
const SeedingView = () => {
  const [videoView, setVideoView] = useState({
    viewTimeStart: 30,
    viewTimeEnd: 50,
  });
  const [openText, setOpenText] = useState(false);
  //
  const handleIncreaseVideoViewTimeStart = () => {
    setVideoView((prevValue) => {
      return {
        ...prevValue,
        viewTimeStart: prevValue.viewTimeStart + 1,
      };
    });
  };
  const handleDescreaseVideoViewTimeStart = () => {
    setVideoView((prevValue) => {
      return {
        ...prevValue,
        viewTimeStart:
          prevValue.viewTimeStart > 0 ? prevValue.viewTimeStart - 1 : 0,
      };
    });
  };
  const handleIncreaseVideoViewTimeEnd = () => {
    setVideoView((prevValue) => {
      return {
        ...prevValue,
        viewTimeEnd: prevValue.viewTimeEnd + 1,
      };
    });
  };
  const handleDescreaseVideoViewTimeEnd = () => {
    setVideoView((prevValue) => {
      return {
        ...prevValue,
        viewTimeEnd: prevValue.viewTimeEnd > 0 ? prevValue.viewTimeEnd - 1 : 0,
      };
    });
  };

  return (
    <div className="-seeding-like">
      <div className="scrollable-container">
        <div className="-seeding-wrapper-like">
          <div className="-back-home">
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
            <p>Boost followers</p>
          </div>
          <div className="-option-boost-like">
            <p>
              Video view time <span>(s)</span>:
            </p>
            <div className="-option-boost-like__number">
              <div className="-option-boost-like__number__icon">
                <div
                  style={{ marginBottom: "2px" }}
                  onClick={handleIncreaseVideoViewTimeStart}
                >
                  <img src={up} alt="up" width={10} height={7} />
                </div>
                <div
                  style={{ marginTop: "2px" }}
                  onClick={handleDescreaseVideoViewTimeStart}
                >
                  <img src={down} alt="down" width={10} height={7} />
                </div>
              </div>
              <input type="text" value={videoView.viewTimeStart} onChange />
            </div>
            <span>to</span>
            <div className="-option-boost-like__number">
              <div className="-option-boost-like__number__icon">
                <div
                  style={{ marginBottom: "2px" }}
                  onClick={handleIncreaseVideoViewTimeEnd}
                >
                  <img src={up} alt="up" width={10} height={7} />
                </div>
                <div
                  style={{ marginTop: "2px" }}
                  onClick={handleDescreaseVideoViewTimeEnd}
                >
                  <img src={down} alt="down" width={10} height={7} />
                </div>
              </div>
              <input type="text" value={videoView.viewTimeEnd} onChange />
            </div>
          </div>
          <div className="-option-boost-like -option-boost-comment">
            <p style={{ width: "100%" }}>
              Video ID: <span style={{ float: "inline-end" }}>(0)</span>
            </p>
            <div className="-option-boost-comment__wrapper">
              <textarea
                name="textContent"
                style={{ width: "501px" }}
                // defaultValue={"Video ID"}
                // value={}
                onClick={() => setOpenText(true)}
              ></textarea>
              <div
                className="-option-boost-comment__wrapper__content"
                style={{ display: openText ? "none" : "block" }}
              >
                <p>
                  <span style={{ paddingRight: "7%" }}>1</span>Enter the ID here
                </p>
                <p>
                  <span style={{ paddingRight: "6%" }}>2</span>Each ID/line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedingView;
