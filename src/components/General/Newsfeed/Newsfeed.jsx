// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';

import {
  DelayTime,
  RandomComment,
  RandomLike,
  RandomShare,
  ScrollTime,
  ShowComment,
  ShowLike,
  ShowShare,
  ShowText,
  ShowTextarea,
} from './Newsfeed';
const Newsfeed = ({ onGoBackClick }) => {
  const {
    inputValueScrollTimeStart,
    handleIncrementScrollTimeStart,
    handleDecrementScrollTimeStart,
    inputValueScrollTimeEnd,
    handleIncrementScrollTimeEnd,
    handleDecrementScrollTimeEnd,
    handleInputChangeScrollTimeStart,
    handleInputChangeScrollTimeEnd,
  } = ScrollTime();

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
    inputValueLikeStart,
    handleIncrementLikeStart,
    handleDecrementLikeStart,
    inputValueLikeEnd,
    handleIncrementLikeEnd,
    handleDecrementLikeEnd,
    handleInputChangeLikeStart,
    handleInputChangeLikeEnd,
  } = RandomLike();

  const {
    inputValueShareStart,
    handleIncrementShareStart,
    handleDecrementShareStart,
    inputValueShareEnd,
    handleIncrementShareEnd,
    handleDecrementShareEnd,
    handleInputChangeShareStart,
    handleInputChangeShareEnd,
  } = RandomShare();

  const {
    inputValueCommentVideoStart,
    handleIncrementCommentVideoStart,
    handleDecrementCommentVideoStart,
    inputValueCommentVideoEnd,
    handleIncrementCommentVideoEnd,
    handleDecrementCommentVideoEnd,
    handleInputChangeCommentVideoStart,
    handleInputChangeCommentVideoEnd,
  } = RandomComment();

  const { isLiked, handleCheckboxChangeLike } = ShowLike();

  const { isShare, handleCheckboxChangeShare } = ShowShare();

  const { isComment, handleCheckboxChangeComment } = ShowComment();

  const { isText, handleCheckboxChangeText } = ShowText();

  const { textContent, handleTextareaChange } = ShowTextarea();
  return (
    <div className="newsfeed">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Newsfeed</p>
            </div>
            <div className="component-item scrollTime">
              <p className="component-item__header">Scrolling time (s):</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementScrollTimeStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementScrollTimeStart} />
                </div>
                <input type="text" value={inputValueScrollTimeStart} onChange={handleInputChangeScrollTimeStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementScrollTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementScrollTimeEnd} />
                </div>
                <input type="text" value={inputValueScrollTimeEnd} onChange={handleInputChangeScrollTimeEnd} />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">Delay time (s):</p>
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
            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChangeLike} />
                <p>
                  Random Like <span className={`span__content ${isLiked ? 'show' : 'hide'}`}>(post)</span>:
                </p>
              </div>
              <div className={`component-item__content ${isLiked ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementLikeStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementLikeStart} />
                  </div>
                  <input type="text" value={inputValueLikeStart} onChange={handleInputChangeLikeStart} />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementLikeEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementLikeEnd} />
                  </div>
                  <input type="text" value={inputValueLikeEnd} onChange={handleInputChangeLikeEnd} />
                </div>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input type="checkbox" name="randomShare" onChange={handleCheckboxChangeShare} />
                <p>
                  Share to Feed <span className={`span__content ${isShare ? 'show' : 'hide'}`}>(post)</span>:
                </p>
              </div>
              <div className={`component-item__content ${isShare ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementShareStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementShareStart} />
                  </div>
                  <input type="text" value={inputValueShareStart} onChange={handleInputChangeShareStart} />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementShareEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementShareEnd} />
                  </div>
                  <input type="text" value={inputValueShareEnd} onChange={handleInputChangeShareEnd} />
                </div>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input type="checkbox" name="randomComment" onChange={handleCheckboxChangeComment} />
                <p>Randomly Comment</p>
              </div>
              <div className={`commentContent ${isComment ? 'show' : 'hide'}`}>
                <div className="component-item comment__numberPost">
                  <p className="component-item__header">Number of posts:</p>
                  <div className="component-item__content">
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementCommentVideoStart} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementCommentVideoStart} />
                      </div>
                      <input
                        type="text"
                        value={inputValueCommentVideoStart}
                        onChange={handleInputChangeCommentVideoStart}
                      />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementCommentVideoEnd} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementCommentVideoEnd} />
                      </div>
                      <input
                        type="text"
                        value={inputValueCommentVideoEnd}
                        onChange={handleInputChangeCommentVideoEnd}
                      />
                    </div>
                  </div>
                </div>

                <div className="Text">
                  <div className="component-item__header">
                    <input type="checkbox" name="randomLike" onChange={handleCheckboxChangeText} />
                    <p>Text</p>
                  </div>

                  <div className={`component-item text ${isText ? 'show' : 'hide'}`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
