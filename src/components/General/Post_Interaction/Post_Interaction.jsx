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

import { DelayTime, NumberPostOrUser, PostUIDList, VideoTime } from './Post_Interaction';

const Post_Interaction = () => {
  const {
    inputValueViewTimeStart,
    handleIncrementViewTimeStart,
    handleDecrementViewTimeStart,
    inputValueViewTimeEnd,
    handleIncrementViewTimeEnd,
    handleDecrementViewTimeEnd,
    handleInputChangeViewTimeStart,
    handleInputChangeViewTimeEnd,
  } = VideoTime();

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

  const {
    inputValueNumberPostOrUserStart,
    handleIncrementNumberPostOrUserStart,
    handleDecrementNumberPostOrUserStart,
    inputValueNumberPostOrUserEnd,
    handleIncrementNumberPostOrUserEnd,
    handleDecrementNumberPostOrUserEnd,
    handleInputChangeNumberPostOrUserStart,
    handleInputChangeNumberPostOrUserEnd,
  } = NumberPostOrUser();

  const { textContent, handleTextareaChange, charCount } = PostUIDList();
  return (
    <div className="Post_Interaction">
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
              <p>Post interaction</p>
            </div>
            <div className="PostUIDList">
              <p className="selectComment__header">
                Post UID list
                <span>({charCount})</span>
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

            <div className="component-item numberPostOrUser">
              <p className="component-item__header">Number of posts/user:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostOrUserStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostOrUserStart} />
                </div>
                <input
                  type="text"
                  value={inputValueNumberPostOrUserStart}
                  onChange={handleInputChangeNumberPostOrUserStart}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostOrUserEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostOrUserEnd} />
                </div>
                <input
                  type="text"
                  value={inputValueNumberPostOrUserEnd}
                  onChange={handleInputChangeNumberPostOrUserEnd}
                />
              </div>
            </div>

            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" />
                <p>Random Like</p>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input type="checkbox" name="randomShare" />
                <p>Share to Feed</p>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input type="checkbox" name="randomComment" />
                <p>Randomly Comment</p>
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
                <img src={iconSave} alt="SaveButton" />
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

export default Post_Interaction;
