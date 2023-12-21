import React, { useEffect, useState } from 'react';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import back from '../../../assets/icon/icon-back.svg';

const SeedingView = ({ onGoBackClick }) => {
  const [videoView, setVideoView] = useState({
    viewTimeStart: 30,
    viewTimeEnd: 50,
    videoID: '',
  });
  const [openText, setOpenText] = useState(false);
  //
  const handleVideoViewTimeStart = (type) => {
    if (type === 'increase') {
      setVideoView({
        ...videoView,
        viewTimeStart: videoView.viewTimeStart + 1,
      });
    } else {
      setVideoView({
        ...videoView,
        viewTimeStart: videoView.viewTimeStart > 0 ? videoView.viewTimeStart - 1 : 0,
      });
    }
  };
  const onChangeVideoViewTimeStart = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setVideoView({ ...videoView, [e.target.name]: parseInt(value) });
    }
  };
  const handleVideoViewTimeEnd = (type) => {
    if (type === 'increase') {
      setVideoView({
        ...videoView,
        viewTimeEnd: videoView.viewTimeEnd + 1,
      });
    } else {
      setVideoView({
        ...videoView,
        viewTimeEnd: videoView.viewTimeEnd > 0 ? videoView.viewTimeEnd - 1 : 0,
      });
    }
  };
  const onChangeVideoViewTimeEnd = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setVideoView({ ...videoView, [e.target.name]: parseInt(value) });
    }
  };

  const handleOnchangeVideoID = (e) => {
    setVideoView({
      ...videoView,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="-layout-component">
      <div className="-seeding-like">
        <div className="scrollable-container">
          <div className="-seeding-wrapper-like">
            <div className="-back-home">
              <img src={back} alt="Back Button" onClick={() => onGoBackClick(true)} />
              <p>Boost followers</p>
            </div>
            <div className="-option-boost-like">
              <p>
                Video view time <span>(s)</span>:
              </p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{ marginBottom: '2px' }} onClick={() => handleVideoViewTimeStart('increase')}>
                    <img src={up} alt="up" width={10} height={7} />
                  </div>
                  <div style={{ marginTop: '2px' }} onClick={() => handleVideoViewTimeStart('des')}>
                    <img src={down} alt="down" width={10} height={7} />
                  </div>
                </div>
                <input
                  type="text"
                  name="viewTimeStart"
                  value={videoView.viewTimeStart}
                  onChange={onChangeVideoViewTimeStart}
                />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{ marginBottom: '2px' }} onClick={() => handleVideoViewTimeEnd('increase')}>
                    <img src={up} alt="up" width={10} height={7} />
                  </div>
                  <div style={{ marginTop: '2px' }} onClick={() => handleVideoViewTimeEnd('increase')}>
                    <img src={down} alt="down" width={10} height={7} />
                  </div>
                </div>
                <input
                  type="text"
                  name="viewTimeEnd"
                  value={videoView.viewTimeEnd}
                  onChange={onChangeVideoViewTimeEnd}
                />
              </div>
            </div>
            <div className="-option-boost-like -option-boost-comment">
              <p style={{ width: '100%' }}>
                Video ID: <span style={{ float: 'inline-end' }}>(0)</span>
              </p>
              <div className="-option-boost-comment__wrapper">
                <textarea
                  name="videoID"
                  style={{ width: '501px' }}
                  value={videoView.videoID}
                  onClick={() => setOpenText(true)}
                  onChange={handleOnchangeVideoID}
                ></textarea>
                <div className="-option-boost-comment__wrapper__content">
                  <p>
                    <span style={{ paddingRight: '7%' }}>1</span>
                    <div style={{ display: openText ? 'none' : 'inline' }}>Enter the ID here</div>
                  </p>
                  <p>
                    <span style={{ paddingRight: '6%' }}>2</span>
                    <div style={{ display: openText ? 'none' : 'inline' }}>Each ID/line</div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedingView;
