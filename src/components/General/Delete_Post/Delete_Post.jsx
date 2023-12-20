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
import { UIDTextarea, useRangeValues } from './Delete_Post';

const Delete_Post = ({ onGoBackClick }) => {
  const initialValues = {
    ViewTimeStart: 5,
    ViewTimeEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const viewTimeValues = useRangeValues(initialValues, 'ViewTime');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const {
    textContent,
    handleTextareaChange,
    handleTextareaPaste,
    lineCount,
    handleDivClick,
    hightlightWithLineNumbers,
    setTextContent,
  } = UIDTextarea();
  return (
    <div className="Delete_Post">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Delete post</p>
            </div>
            <div className="PostUIDList">
              <p className="selectComment__header">
                Post UID list
                <span style={{ marginLeft: '2px' }}>({lineCount})</span>
              </p>
              <div className="component-item text">
                <Editor
                  onPaste={handleTextareaPaste}
                  value={textContent}
                  onChange={handleTextareaChange}
                  onValueChange={(textContentComment) => setTextContent(textContentComment)}
                  highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                  padding={15}
                  className="editor"
                  textareaId="codeArea"
                  style={{
                    background: '#f5f5f5',
                    fontSize: 15,
                  }}
                />
                <div onClick={handleDivClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
                  <p>
                    <span>1</span>Enter the content here
                  </p>
                  <p>
                    <span>2</span>Each content/line
                  </p>
                </div>
              </div>
            </div>

            <div className="component-item viewTime">
              <p className="component-item__header">
                View time<span style={{ marginLeft: '2px' }}> (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={viewTimeValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={viewTimeValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={viewTimeValues.ViewTimeStart}
                  onChange={(event) => viewTimeValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={viewTimeValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={viewTimeValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={viewTimeValues.ViewTimeEnd}
                  onChange={(event) => viewTimeValues.handleInputChangeEnd(event)}
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
                  name="Start"
                  type="text"
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
                  name="End"
                  type="text"
                  value={delayTimeValues.DelayTimeEnd}
                  onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete_Post;
