// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { PostOption, useRangeValues, useTextarea } from './Send_Message';
const Send_Message = ({ onGoBackClick }) => {
  const initialValues = {
    PostStart: 5,
    PostEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const postValues = useRangeValues(initialValues, 'Post');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const { selectedValueFriend, handleSelectChangeFriend } = PostOption();

  const {
    value: textContent,
    handleChange: handleTextareaChange,
    textareaRef: UIDTextareaRef,
    handleDivClick: handleUIDDivClick,
  } = useTextarea('');

  const {
    value: messagesContent,
    handleChange: handleTextareaChangeMessages,
    textareaRef: MessagesTextareaRef,
    handleDivClick: handleMessagesDivClick,
  } = useTextarea('');

  return (
    <div className="sendMessage">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Send message</p>
            </div>
            <div className="component-item numberOfPost">
              <p className="component-item__header">Number of posts:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={postValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={postValues.handleDecrement} />
                </div>
                <input
                  name="Start"
                  type="text"
                  value={postValues.PostStart}
                  onChange={(event) => postValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={postValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={postValues.handleDecrementEnd} />
                </div>
                <input
                  name="End"
                  type="text"
                  value={postValues.PostEnd}
                  onChange={(event) => postValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time<span style={{ marginLeft: '2px' }}> (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={delayTimeValues.DelayTimeStart}
                  onChange={(event) => delayTimeValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={delayTimeValues.DelayTimeEnd}
                  onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item Post">
              <div className="component-item__header">
                <p>Post options</p>
              </div>
              <div className="PostContent">
                <div className="component-item postOption">
                  <Select
                    name="postOption"
                    className="PostType"
                    onChange={handleSelectChangeFriend}
                    value={selectedValueFriend}
                  >
                    <MenuItem value="randomFriend">Randomly choose friends</MenuItem>
                    <MenuItem value="specificFriend">Specific friends</MenuItem>
                  </Select>
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
                        ref={UIDTextareaRef}
                      ></textarea>
                      <div onClick={handleUIDDivClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
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
                    ref={MessagesTextareaRef}
                  ></textarea>
                  <div onClick={handleMessagesDivClick} className={`placeholder ${messagesContent ? 'hide' : ''}`}>
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
