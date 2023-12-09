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
import iconQuestion from '../../../assets/icon/icon-question.svg';
import { NumberStory, ShowComment, ShowReact, TextareaComment, TimeWatchStory } from './WatchStory';
const WatchStory = () => {
  const {
    inputValueNumberStoryStart,
    handleIncrementNumberStoryStart,
    handleDecrementNumberStoryStart,
    inputValueNumberStoryEnd,
    handleIncrementNumberStoryEnd,
    handleDecrementNumberStoryEnd,
    handleInputChangeNumberStoryStart,
    handleInputChangeNumberStoryEnd,
  } = NumberStory();

  const {
    inputValueTimeWatchStoryStart,
    handleIncrementTimeWatchStoryStart,
    handleDecrementTimeWatchStoryStart,
    inputValueTimeWatchStoryEnd,
    handleIncrementTimeWatchStoryEnd,
    handleDecrementTimeWatchStoryEnd,
    handleInputChangeTimeWatchStoryStart,
    handleInputChangeTimeWatchStoryEnd,
  } = TimeWatchStory();

  const { isReact, handleCheckboxChangeReact } = ShowReact();

  const { isComment, handleCheckboxChangeComment } = ShowComment();

  const { textContent, handleTextareaChange } = TextareaComment();
  return (
    <div className="watch-story">
      <h1 className="watch-story__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>Watch Story</p>
            </div>
            <div className="component-item numberOfStory">
              <p className="component-item__header">Number of stories:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberStoryStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberStoryStart} />
                </div>
                <input type="text" value={inputValueNumberStoryStart} onChange={handleInputChangeNumberStoryStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberStoryEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberStoryEnd} />
                </div>
                <input type="text" value={inputValueNumberStoryEnd} onChange={handleInputChangeNumberStoryEnd} />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">Watching time/story (s):</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementTimeWatchStoryStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementTimeWatchStoryStart} />
                </div>
                <input
                  type="text"
                  value={inputValueTimeWatchStoryStart}
                  onChange={handleInputChangeTimeWatchStoryStart}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementTimeWatchStoryEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementTimeWatchStoryEnd} />
                </div>
                <input type="text" value={inputValueTimeWatchStoryEnd} onChange={handleInputChangeTimeWatchStoryEnd} />
              </div>
            </div>
            <div className="component-item_react">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChangeReact} />
                <p>Randomly react:</p>
              </div>
              <div className={`component-item__content ${isReact ? 'show' : 'hide'}`}>
                <div className="likeButton">
                  <input type="checkbox" name="likeButton" />
                  <span>Like</span>
                </div>
                <div className="loveButton">
                  <input type="checkbox" name="loveButton" />
                  <span>Love</span>
                </div>
                <div className="careButton">
                  <input type="checkbox" name="careButton" />
                  <span>Care</span>
                </div>
                <div className="wowButton">
                  <input type="checkbox" name="wowButton" />
                  <span>Wow</span>
                </div>
                <div className="hahaButton">
                  <input type="checkbox" name="hahaButton" />
                  <span>Haha</span>
                </div>
                <div className="sadButton">
                  <input type="checkbox" name="sadButton" />
                  <span>Sad</span>
                </div>
                <div className="angryButton">
                  <input type="checkbox" name="angryButton" />
                  <span>Angry</span>
                </div>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input type="checkbox" name="randomComment" onChange={handleCheckboxChangeComment} />
                <p>Randomly Comment</p>
                <img src={iconQuestion} alt="icon Question" />
              </div>
              <div className={`commentContent Text ${isComment ? 'show' : 'hide'}`}>
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
                    <p>
                      <span>3</span>If the content has multiple paragraphs, each content needs to be separated by the
                      character /
                    </p>
                  </div>
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

export default WatchStory;
