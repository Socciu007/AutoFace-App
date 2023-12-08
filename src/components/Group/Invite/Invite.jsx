// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import saveIcon from '../../../assets/img/Page-1.png';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
const Invite = () => {
  //Value number of Group_Friends start
  const [inputValueGroup_FriendsStart, setInputValueGroup_FriendsStart] = useState(5);
  const handleIncrementGroup_FriendsStart = () => {
    setInputValueGroup_FriendsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementGroup_FriendsStart = () => {
    setInputValueGroup_FriendsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Group_Friends end
  const [inputValueGroup_FriendsEnd, setInputValueGroup_FriendsEnd] = useState(10);
  const handleIncrementGroup_FriendsEnd = () => {
    setInputValueGroup_FriendsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementGroup_FriendsEnd = () => {
    setInputValueGroup_FriendsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Hien thi select Invite option
  const [selectedValueInvite, setSelectedValueInvite] = useState('');

  const handleSelectChangeInvite = (event) => {
    setSelectedValueInvite(event.target.value);
  };
  useEffect(() => {
    setSelectedValueInvite('random');
  }, []);

  //cai dat cho phan UID Text (khi go chu thi placeholder cua textarea se an di)
  const [UIDContent, setUIDContent] = useState('');

  const handleTextareaChangeUIDContent = (event) => {
    setUIDContent(event.target.value);
  };
  return (
    <div className="invite">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleInvite">
              <img src={backButton} alt="Back button" />
              <p>Invite</p>
            </div>
            <div className="component-content__invite">
              <div className="component-item numberOfGroup_Friends">
                <p className="component-item__header">Number of friends/group:</p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroup_FriendsStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroup_FriendsStart} />
                  </div>
                  <input type="text" value={inputValueGroup_FriendsStart} onChange />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroup_FriendsEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroup_FriendsEnd} />
                  </div>
                  <input type="text" value={inputValueGroup_FriendsEnd} onChange />
                </div>
              </div>
              <div className="component-item delayTime">
                <p className="component-item__header">
                  Delay time<span>(s):</span>
                </p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                  </div>
                  <input type="text" value={inputValueDelayTimeStart} onChange />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                  </div>
                  <input type="text" value={inputValueDelayTimeEnd} onChange />
                </div>
              </div>
              <div className="component-item__header">
                <p>Select Invite type</p>
              </div>
              <div className="InviteContent">
                <div className="component-item InviteOption">
                  <select
                    name="InviteOption"
                    className="InviteType"
                    onChange={handleSelectChangeInvite}
                    value={selectedValueInvite}
                  >
                    <option value="random">Random</option>
                    <option value="suggestions">By suggestions</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValueInvite === 'suggestions' || selectedValueInvite === 'random') && (
                  <div>
                    <div className="UIDContent">
                      <div className="UID_Header">
                        <p>Group UID list</p>
                        <span>(0)</span>
                      </div>
                      <div className="component-item UIDText">
                        <textarea
                          id="UIDContent"
                          name="UIDContent"
                          rows="10"
                          value={UIDContent}
                          onChange={handleTextareaChangeUIDContent}
                        ></textarea>
                        <div className={`placeholder ${UIDContent ? 'hide' : ''}`}>
                          <p>
                            <span>1</span>Enter the UID here
                          </p>
                          <p>
                            <span>2</span>Each UID/line
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="componet-right">
          <div className="componet-right__header">
            <div className="componet-right__header__inputBox">
              <input
                type="text"
                name="nameScenario"
                id="nameScenario"
                className="nameScenario"
                placeholder="Enter name here"
              />

              <img src={Edit} alt="Edit button" />
            </div>
            <div className="componet-right__header__function">
              <img src={Debug} alt="Debug button" />
              <img src={RunTest} alt="Run test button" />
              <img src={iconOptions} alt="icon option" />
              <button type="submit" className="btnSave">
                <img src={saveIcon} alt="SaveButton" />
                <span>Save</span>
              </button>
            </div>
          </div>
          <div className="componet-right__content"></div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
