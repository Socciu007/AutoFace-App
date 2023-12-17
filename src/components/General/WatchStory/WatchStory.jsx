// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import iconQuestion from '../../../assets/icon/icon-question.svg';

import { ShowComment, ShowReact, TextareaComment, useRangeValues } from './WatchStory';
const WatchStory = ({ onGoBackClick }) => {
  const initialValues = {
    NumberStoryStart: 5,
    NumberStoryEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const numberStoryValues = useRangeValues(initialValues, 'NumberStory');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const { isReact, handleCheckboxChangeReact } = ShowReact();

  const { isComment, handleCheckboxChangeComment } = ShowComment();

  const { textContent, handleTextareaChange } = TextareaComment();

  return (
    <div className={`watch-story`}>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Watch Story</p>
            </div>
            <div className="component-item numberOfStory">
              <p className="component-item__header">Number of stories:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberStoryValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberStoryValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={numberStoryValues.NumberStoryStart}
                  onChange={(event) => numberStoryValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberStoryValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberStoryValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={numberStoryValues.NumberStoryEnd}
                  onChange={(event) => numberStoryValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">Watching time/story (s):</p>
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
      </div>
    </div>
  );
};

export default WatchStory;
