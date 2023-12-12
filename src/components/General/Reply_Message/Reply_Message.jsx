// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
import iconSave from '../../../assets/icon/icon-save.svg';

import { DelayTime, MessageTextarea, NumberOfFriend } from './Reply_Message';

const Reply_Message = () => {
  const {
    inputValueNumberOfFriendStart,
    handleIncrementNumberOfFriendStart,
    handleDecrementNumberOfFriendStart,
    inputValueNumberOfFriendEnd,
    handleIncrementNumberOfFriendEnd,
    handleDecrementNumberOfFriendEnd,
    handleInputChangeNumberOfFriendStart,
    handleInputChangeNumberOfFriendEnd,
  } = NumberOfFriend();

  const {
    inputValueDelayTimeStart,
    handleIncrementDelayTimeStart,
    handleDecrementDelayTimeStart,
    inputValueDelayTimeEnd,
    handleIncrementDelayTimeEnd,
    handleDecrementDelayTimeEnd,
    handleInputChangeDelayTimeStart,
    handleInputChangeDelayTimeEnd,
  } = DelayTime();
  const { textContentMessage, handleTextareaChangeMessage } = MessageTextarea();
  return (
    <div className="replyMessage">
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
                <input
                  type="text"
                  value={inputValueNumberOfFriendStart}
                  onChange={handleInputChangeNumberOfFriendStart}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberOfFriendEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberOfFriendEnd} />
                </div>
                <input type="text" value={inputValueNumberOfFriendEnd} onChange={handleInputChangeNumberOfFriendEnd} />
              </div>
            </div>

            <div className="component-item delayTime">
              <p className="component-item__header">Waiting time (s): </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                </div>
                <input type="text" value={inputValueDelayTimeStart} onChange={handleInputChangeDelayTimeStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                </div>
                <input type="text" value={inputValueDelayTimeEnd} onChange={handleInputChangeDelayTimeEnd} />
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
      </div>
    </div>
  );
};

export default Reply_Message;
