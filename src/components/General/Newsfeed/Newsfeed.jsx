// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';

import { ShowTextarea, useRangeValues, useShowCheckbox } from './Newsfeed';
const Newsfeed = ({ onGoBackClick }) => {
  const initialValues = {
    ScrollTimeStart: 5,
    ScrollTimeEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    LikeStart: 5,
    LikeEnd: 10,
    ShareStart: 5,
    ShareEnd: 10,
    CommentStart: 5,
    CommentEnd: 10,
  };

  const scrollTimeValues = useRangeValues(initialValues, 'ScrollTime');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const likeValues = useRangeValues(initialValues, 'Like');
  const shareValues = useRangeValues(initialValues, 'Share');
  const commentValues = useRangeValues(initialValues, 'Comment');

  const { isLiked, handleCheckboxChangeLiked } = useShowCheckbox(false, 'Liked');

  const { isShare, handleCheckboxChangeShare } = useShowCheckbox(false, 'Share');

  const { isComment, handleCheckboxChangeComment } = useShowCheckbox(false, 'Comment');

  const { isText, handleCheckboxChangeText } = useShowCheckbox(false, 'Text');

  const { textContent, handleTextareaChange, handleDivClick, textareaRef } = ShowTextarea();
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
                  <img src={iconIncrease} alt="Increase icon" onClick={scrollTimeValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={scrollTimeValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={scrollTimeValues.ScrollTimeStart}
                  onChange={(event) => scrollTimeValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={scrollTimeValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={scrollTimeValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={scrollTimeValues.ScrollTimeEnd}
                  onChange={(event) => scrollTimeValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">Delay time (s):</p>
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
            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChangeLiked} />
                <p>
                  Random Like{' '}
                  <span style={{ marginLeft: '2px' }} className={`span__content ${isLiked ? 'show' : 'hide'}`}>
                    (post)
                  </span>
                  :
                </p>
              </div>
              <div className={`component-item__content ${isLiked ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={likeValues.handleIncrement} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={likeValues.handleDecrement} />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={likeValues.LikeStart}
                    onChange={(event) => likeValues.handleInputChangeStart(event)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={likeValues.handleIncrementEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={likeValues.handleDecrementEnd} />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={likeValues.LikeEnd}
                    onChange={(event) => likeValues.handleInputChangeEnd(event)}
                  />
                </div>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input type="checkbox" name="randomShare" onChange={handleCheckboxChangeShare} />
                <p>
                  Share to Feed{' '}
                  <span style={{ marginLeft: '2px' }} className={`span__content ${isShare ? 'show' : 'hide'}`}>
                    (post)
                  </span>
                  :
                </p>
              </div>
              <div className={`component-item__content ${isShare ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={shareValues.handleIncrement} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={shareValues.handleDecrement} />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={shareValues.ShareStart}
                    onChange={(event) => shareValues.handleInputChangeStart(event)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={shareValues.handleIncrementEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={shareValues.handleDecrementEnd} />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={shareValues.ShareEnd}
                    onChange={(event) => shareValues.handleInputChangeEnd(event)}
                  />
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
                        <img src={iconIncrease} alt="Increase icon" onClick={commentValues.handleIncrement} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={commentValues.handleDecrement} />
                      </div>
                      <input
                        type="text"
                        name="Start"
                        value={commentValues.CommentStart}
                        onChange={(event) => commentValues.handleInputChangeStart(event)}
                      />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={commentValues.handleIncrementEnd} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={commentValues.handleDecrementEnd} />
                      </div>
                      <input
                        type="text"
                        name="End"
                        value={commentValues.CommentEnd}
                        onChange={(event) => commentValues.handleInputChangeEnd(event)}
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
                      ref={textareaRef}
                    ></textarea>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
