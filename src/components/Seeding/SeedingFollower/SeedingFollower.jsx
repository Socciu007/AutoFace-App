import React, { useState } from 'react';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import back from '../../../assets/icon/icon-back.svg';
import { Select } from 'antd';
const SeedingFollower = ({ onGoBackClick }) => {
  const [followers, setFollowers] = useState({
    delayTimeStart: 3,
    delayTimeEnd: 5,
    selectTypeFollow: 'Profile',
    UIDList: '',
  });
  const [openUIDList, setOpenUIDList] = useState(false);
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
  const handleOnchangeUIDList = (e) => {
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
                <textarea
                  name="UIDList"
                  style={{ width: '501px' }}
                  onClick={handleUIDList}
                  onChange={handleOnchangeUIDList}
                  value={followers.UIDList}
                ></textarea>
                <div className="-option-boost-comment__wrapper__content">
                  <p>
                    <span style={{ paddingRight: '7%' }}>1</span>
                    <div style={{ display: openUIDList ? 'none' : 'inline' }}>Enter the UID here</div>
                  </p>
                  <p>
                    <span style={{ paddingRight: '6%' }}>2</span>
                    <div style={{ display: openUIDList ? 'none' : 'inline' }}>Each UID/line</div>
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
