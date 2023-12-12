// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';

import { UIDTextarea, delayTime, viewTime } from './Delete_Post';

const Delete_Post = ({ onGoBackClick }) => {
  const {
    inputValueViewTimeStart,
    handleIncrementViewTimeStart,
    handleDecrementViewTimeStart,
    inputValueViewTimeEnd,
    handleIncrementViewTimeEnd,
    handleDecrementViewTimeEnd,
    handleInputChangeViewTimeStart,
    handleInputChangeViewTimeEnd,
  } = viewTime();

  const {
    inputValueDelayTimeStart,
    handleIncrementDelayTimeStart,
    handleDecrementDelayTimeStart,
    inputValueDelayTimeEnd,
    handleIncrementDelayTimeEnd,
    handleDecrementDelayTimeEnd,
    handleInputChangeDelayTimeStart,
    handleInputChangeDelayTimeEnd,
  } = delayTime();

  const { textContent, handleTextareaChange } = UIDTextarea();
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
                <span>(0)</span>
              </p>
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
                View time<span> (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementViewTimeStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementViewTimeStart} />
                </div>
                <input type="text" value={inputValueViewTimeStart} onChange={handleInputChangeViewTimeStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementViewTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementViewTimeEnd} />
                </div>
                <input type="text" value={inputValueViewTimeEnd} onChange={handleInputChangeViewTimeEnd} />
              </div>
            </div>

            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time<span> (s):</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete_Post;
