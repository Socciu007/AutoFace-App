// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../../assets/img/Page-1.png';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';

const Reply_Message = () => {
  //NumberOfFriend start
  const [inputValueNumberOfFriendStart, setInputValueNumberOfFriendStart] = useState(5);
  const handleIncrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //NumberOfFriend end
  const [inputValueNumberOfFriendEnd, setInputValueNumberOfFriendEnd] = useState(10);
  const handleIncrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //DelayTime start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //DelayTime end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //cai dat cho phan text comment
  const [textContentMessage, setTextContentMessage] = useState('');

  const handleTextareaChangeMessage = (event) => {
    setTextContentMessage(event.target.value);
  };
  return (
    <div className="replyMessage">
      <h1 className="watch-video__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>Reply message</p>
            </div>

            <div className="component-item numberOfFriend">
              <p className="component-item__header">Number of friends:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberOfFriendStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberOfFriendStart} />
                </div>
                <input type="text" value={inputValueNumberOfFriendStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberOfFriendEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberOfFriendEnd} />
                </div>
                <input type="text" value={inputValueNumberOfFriendEnd} onChange />
              </div>
            </div>

            <div className="component-item delayTime">
              <p className="component-item__header">Waiting time (s): </p>
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

            <div className="messages">
              <p className="selectComment__header">Messages</p>
              <div className="component-item text">
                <textarea
                  id="textContent"
                  name="textContent"
                  rows="10"
                  value={textContentMessage}
                  onChange={handleTextareaChangeMessage}
                ></textarea>
                <div className={`placeholder ${textContentMessage ? 'hide' : ''}`}>
                  <p>
                    <span>1</span>Enter the content here
                  </p>
                  <p>
                    <span>2</span>Each content/line
                  </p>
                </div>
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

export default Reply_Message;
