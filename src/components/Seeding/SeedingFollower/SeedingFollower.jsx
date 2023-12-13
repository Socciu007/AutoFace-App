import React, { useState } from 'react';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import back from '../../../assets/icon/icon-back.svg';
const SeedingFollower = ({ onGoBackClick }) => {
  const [followers, setFollowers] = useState({
    delayTimeStart: 3,
    delayTimeEnd: 5,
    selectTypeFollow: '',
  });
  //delay time
  const handleUpDelayTimeStart = () => {
    setFollowers((prevValue) => {
      return {
        ...prevValue,
        delayTimeStart: prevValue.delayTimeStart + 1,
      };
    });
  };
  const handleDownDelayTimeStart = () => {
    setFollowers((prevValue) => {
      return {
        ...prevValue,
        delayTimeStart: prevValue.delayTimeStart > 0 ? prevValue.delayTimeStart - 1 : 0,
      };
    });
  };
  const handleUpDelayTimeEnd = () => {
    setFollowers((prevValue) => {
      return {
        ...prevValue,
        delayTimeEnd: prevValue.delayTimeEnd + 1,
      };
    });
  };
  const handleDownDelayTimeEnd = () => {
    setFollowers((prevValue) => {
      return {
        ...prevValue,
        delayTimeEnd: prevValue.delayTimeEnd > 0 ? prevValue.delayTimeEnd - 1 : 0,
      };
    });
  };
  const handleOnchangeTypeFollower = (e) => {
    setFollowers({
      ...followers,
      [e.target.name]: e.target.value,
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
                  <div style={{ marginBottom: '2px' }} onClick={handleUpDelayTimeStart}>
                    <img src={up} alt="up" width={10} height={7} />
                  </div>
                  <div style={{ marginTop: '2px' }} onClick={handleDownDelayTimeStart}>
                    <img src={down} alt="down" width={10} height={7} />
                  </div>
                </div>
                <input type="text" value={followers.delayTimeStart} onChange />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{ marginBottom: '2px' }} onClick={handleUpDelayTimeEnd}>
                    <img src={up} alt="up" width={10} height={7} />
                  </div>
                  <div style={{ marginTop: '2px' }} onClick={handleDownDelayTimeEnd}>
                    <img src={down} alt="down" width={10} height={7} />
                  </div>
                </div>
                <input type="text" value={followers.delayTimeEnd} onChange />
              </div>
            </div>
            <div className="-option-boost-like -type-follower">
              <p>Select type</p>
              <div className="PostContent">
                <div className="component-item postOption">
                  <select
                    name="selectTypeFollow"
                    className="PostType"
                    onChange={handleOnchangeTypeFollower}
                    value={followers.selectTypeFollow}
                  >
                    <option value="fanpage">Fanpage</option>
                    <option value="friend">Friend</option>
                    <option value="group">Group</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="-option-boost-like -option-boost-comment">
              <p>UID list</p>
              <div className="-option-boost-comment__wrapper">
                <textarea
                  name="textContent"
                  style={{ width: '501px' }}
                  // value={}
                ></textarea>
                <div className="-option-boost-comment__wrapper__content">
                  <p>
                    <span style={{ paddingRight: '7%' }}>1</span>Enter the UID here
                  </p>
                  <p>
                    <span style={{ paddingRight: '6%' }}>2</span>Each UID/line
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
