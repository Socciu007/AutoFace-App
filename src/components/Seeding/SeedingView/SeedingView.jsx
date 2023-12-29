import React, { useEffect, useState } from 'react';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import back from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const SeedingView = ({ onGoBackClick }) => {
  const [videoView, setVideoView] = useState({
    viewTimeStart: 30,
    viewTimeEnd: 50,
    videoID: '',
  });
  const [line, setLine] = useState(0);
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${videoView.videoID ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
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

  const handleClickText = () => {
    document.getElementById('videoID').focus();
  };
  const onChangeLine = (e) => {
    const lines = e.target.value.split('\n');
    setLine(lines.length);
  };
  const handleOnchangeVideoID = (value) => {
    setVideoView({
      ...videoView,
      videoID: value,
    });
  };

  return (
    <div className="-layout-component">
      <div className="-seeding-like">
        <div className="scrollable-container">
          <div className="-seeding-wrapper-like">
            <div className="-back-home">
              <img src={back} alt="Back Button" onClick={() => onGoBackClick(true)} />
              <p>Boost video view</p>
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
                Video ID: <span style={{ float: 'inline-end' }}>({line})</span>
              </p>
              <div className="-option-boost-comment__wrapper">
                <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                  <Editor
                    value={videoView.videoID}
                    onValueChange={handleOnchangeVideoID}
                    onChange={onChangeLine}
                    highlight={(textContent) => hightlightWithLineNumbers(textContent, languages.js)}
                    padding={15}
                    className="editor"
                    textareaId="videoID"
                    style={{
                      background: '#f5f5f5',
                      fontSize: 15,
                    }}
                  />
                </div>
                <div
                  className="-option-boost-comment__wrapper__content"
                  onClick={handleClickText}
                  style={{ display: videoView.videoID ? 'none' : 'inline' }}
                >
                  <p>
                    <span>1</span>
                    <div>Enter the ID here</div>
                  </p>
                  <p>
                    <span>2</span>
                    <div>Each ID/line</div>
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
