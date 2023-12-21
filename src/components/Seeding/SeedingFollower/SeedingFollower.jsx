import React, { useState } from 'react';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import back from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Select } from 'antd';
const SeedingFollower = ({ onGoBackClick }) => {
  const [followers, setFollowers] = useState({
    delayTimeStart: 3,
    delayTimeEnd: 5,
    selectTypeFollow: 'Profile',
    UIDList: '',
  });
  const [openUIDList, setOpenUIDList] = useState(false);
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${followers.UIDList ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  //delay time
  const handleDelayTimeStart = (type) => {
    if (type === 'increase') {
      setFollowers({
        ...followers,
        delayTimeStart: followers.delayTimeStart + 1,
      });
    } else {
      setFollowers({
        ...followers,
        delayTimeStart: followers.delayTimeStart > 0 ? followers.delayTimeStart - 1 : 0,
      });
    }
  };
  const onChangeDelayTimeStart = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setFollowers({ ...followers, [e.target.name]: parseInt(value) });
    }
  };
  const handleDelayTimeEnd = (type) => {
    if (type === 'increase') {
      setFollowers({
        ...followers,
        delayTimeEnd: followers.delayTimeEnd + 1,
      });
    } else {
      setFollowers({
        ...followers,
        delayTimeEnd: followers.delayTimeEnd > 0 ? followers.delayTimeEnd - 1 : 0,
      });
    }
  };
  const onChangeDelayTimeEnd = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setFollowers({ ...followers, [e.target.name]: parseInt(value) });
    }
  };

  //type follower
  const handleOnchangeTypeFollower = (value) => {
    setFollowers({
      ...followers,
      selectTypeFollow: value,
    });
  };
  //UID list
  const handleUIDList = () => {
    setOpenUIDList(true);
  };
  const handleOnchangeUIDList = (value) => {
    setFollowers({
      ...followers,
      UIDList: value,
    });
  };
  return (
    <div className="-layout-component">
      <div className="-seeding-like">
        <div className="scrollable-container">
          <div className="-seeding-wrapper-like">
            <div className="-back-home">
              <img src={back} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Boost followers</p>
            </div>
            <div className="-option-boost-like">
              <p>
                Delay time <span>(s)</span>:
              </p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{ marginBottom: '2px' }} onClick={() => handleDelayTimeStart('increase')}>
                    <img src={up} alt="up" width={10} height={7} />
                  </div>
                  <div style={{ marginTop: '2px' }} onClick={() => handleDelayTimeStart('des')}>
                    <img src={down} alt="down" width={10} height={7} />
                  </div>
                </div>
                <input
                  type="text"
                  name="delayTimeStart"
                  value={followers.delayTimeStart}
                  onChange={onChangeDelayTimeStart}
                />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
                <div>
                  <div className="-option-boost-like__number__icon">
                    <div style={{ marginBottom: '2px' }} onClick={() => handleDelayTimeEnd('increase')}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{ marginTop: '2px' }} onClick={() => handleDelayTimeEnd('des')}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="delayTimeEnd"
                    value={followers.delayTimeEnd}
                    onChange={onChangeDelayTimeEnd}
                  />
                </div>
              </div>
            </div>
            <div className="-option-boost-like -type-follower">
              <p>Select type</p>
              <div className="PostContent">
                <Select
                  id="typeProfile"
                  className="PostContent__select PostContent__details"
                  value={followers.selectTypeFollow}
                  onChange={handleOnchangeTypeFollower}
                  bordered={false}
                  options={[
                    {
                      value: 'fanpage',
                      label: 'Fanpage',
                    },
                    {
                      value: 'profile',
                      label: 'Profile',
                    },
                  ]}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="-option-boost-like -option-boost-comment">
              <p>UID list</p>
              <div className="-option-boost-comment__wrapper">
                <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                  <Editor
                    value={followers.UIDList}
                    onValueChange={handleOnchangeUIDList}
                    onClick={handleUIDList}
                    highlight={(textContent) => hightlightWithLineNumbers(textContent, languages.js)}
                    padding={15}
                    className="editor"
                    textareaId="codeArea"
                    style={{
                      background: '#f5f5f5',
                      fontSize: 15,
                    }}
                  />
                </div>
                <div
                  className="-option-boost-comment__wrapper__content"
                  onClick={handleUIDList}
                  style={{ display: openUIDList ? 'none' : 'inline' }}
                >
                  <p>
                    <span>1</span>
                    <div>Enter the UID here</div>
                  </p>
                  <p>
                    <span>2</span>
                    <div>Each UID/line</div>
                  </p>
                </div>
              </div>
            </div>

            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="like" onChange />
                <p>Like page</p>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="share" onChange />
                <p>Follow page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedingFollower;
