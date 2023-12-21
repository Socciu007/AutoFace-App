// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { MessageTextarea, useRangeValues } from './Reply_Message';

const Reply_Message = ({ onGoBackClick }) => {
  const initialValues = {
    NumberFriendStart: 5,
    NumberFriendEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const numberFriendValues = useRangeValues(initialValues, 'NumberFriend');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const { textContentMessage, handleChange, handleDivClick, hightlightWithLineNumbers } = MessageTextarea();
  return (
    <div className="replyMessage">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Reply message</p>
            </div>

            <div className="component-item numberOfFriend">
              <p className="component-item__header">Number of friends:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberFriendValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberFriendValues.handleDecrement} />
                </div>
                <input
                  name="Start"
                  type="text"
                  value={numberFriendValues.NumberFriendStart}
                  onChange={(event) => numberFriendValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberFriendValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberFriendValues.handleDecrementEnd} />
                </div>
                <input
                  name="End"
                  type="text"
                  value={numberFriendValues.NumberFriendEnd}
                  onChange={(event) => numberFriendValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>

            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time<span style={{ marginLeft: '1px' }}> (s):</span>
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

            <div className="messages">
              <p className="selectComment__header">Messages</p>
              <div className="component-item " style={{ position: 'relative' }}>
                <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                  <Editor
                    value={textContentMessage}
                    onValueChange={handleChange}
                    highlight={(textContentMessage) => hightlightWithLineNumbers(textContentMessage, languages.js)}
                    padding={15}
                    className="editor"
                    textareaId="codeArea"
                    style={{
                      background: '#f5f5f5',
                      fontSize: 15,
                    }}
                  />
                </div>
                <div onClick={handleDivClick} className={`placeholder ${textContentMessage ? 'hide' : ''}`}>
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
