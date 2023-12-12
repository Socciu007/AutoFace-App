// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
import iconSave from '../../../assets/icon/icon-save.svg';

import { DelayTime, MessageTextarea, NumberOfPost, PostOption, UIDTextarea } from './Send_Message';
const Send_Message = () => {
  const {
    inputValuePostStart,
    handleIncrementPostStart,
    handleDecrementPostStart,
    inputValuePostEnd,
    handleIncrementPostEnd,
    handleDecrementPostEnd,
    handleInputChangePostStart,
    handleInputChangePostEnd,
  } = NumberOfPost();

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

  const { selectedValueFriend, handleSelectChangeFriend } = PostOption();

  const { textContent, handleTextareaChange } = UIDTextarea();

  const { messagesContent, handleTextareaChangeMessages } = MessageTextarea();
  return (
    <div className="sendMessage">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>Send message</p>
            </div>
            <div className="component-item numberOfPost">
              <p className="component-item__header">Number of posts:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPostStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPostStart} />
                </div>
                <input type="text" value={inputValuePostStart} onChange={handleInputChangePostStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPostEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPostEnd} />
                </div>
                <input type="text" value={inputValuePostEnd} onChange={handleInputChangePostEnd} />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time <span>(s):</span>
              </p>
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
            <div className="component-item Post">
              <div className="component-item__header">
                <p>Post options</p>
              </div>
              <div className="PostContent">
                <div className="component-item postOption">
                  <select
                    name="postOption"
                    className="PostType"
                    onChange={handleSelectChangeFriend}
                    value={selectedValueFriend}
                  >
                    <option value="randomFriend">Randomly choose friends</option>
                    <option value="specificFriend">Specific friends</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>

                {selectedValueFriend === 'specificFriend' && (
                  <div className="Messages">
                    <div className="component-item text">
                      <textarea
                        id="textContent"
                        name="textContent"
                        rows="10"
                        value={textContent}
                        onChange={handleTextareaChange}
                      ></textarea>
                      <div className={`placeholder ${textContent ? 'hide' : ''}`}>
                        <p>
                          <span>1</span>Enter the UID here
                        </p>
                        <p>
                          <span>2</span>Each UID/line
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <p className="selectPost__header">Messages</p>
                <div className="component-item messages">
                  <textarea
                    id="messagesContent"
                    name="messagesContent"
                    rows="10"
                    value={messagesContent}
                    onChange={handleTextareaChangeMessages}
                  ></textarea>
                  <div className={`placeholder ${messagesContent ? 'hide' : ''}`}>
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
    </div>
  );
};

export default Send_Message;
