// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';

import { PostUIDList, useRangeValues, useShowCheckbox } from './Post_Interaction';

const Post_Interaction = ({ onGoBackClick }) => {
  const initialValues = {
    PostStart: 5,
    PostEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    ViewTimeStart: 5,
    ViewTimeEnd: 10,
    LikeStart: 5,
    LikeEnd: 10,
    ShareStart: 5,
    ShareEnd: 10,
    CommentStart: 5,
    CommentEnd: 10,
  };

  const postValues = useRangeValues(initialValues, 'Post');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const viewTimeValues = useRangeValues(initialValues, 'ViewTime');
  const likeValues = useRangeValues(initialValues, 'Like');
  const shareValues = useRangeValues(initialValues, 'Share');
  const commentValues = useRangeValues(initialValues, 'Comment');

  const { isLiked, handleCheckboxChangeLiked } = useShowCheckbox(false, 'Liked');

  const { isShare, handleCheckboxChangeShare } = useShowCheckbox(false, 'Share');

  const { isComment, handleCheckboxChangeComment } = useShowCheckbox(false, 'Comment');

  const { isText, handleCheckboxChangeText } = useShowCheckbox(false, 'Text');

  const { textContent, handleTextareaChange, handleTextareaPaste, lineCount, handleDivClick, textareaRef } =
    PostUIDList();
  return (
    <div className="Post_Interaction">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Post interaction</p>
            </div>
            <div className="PostUIDList">
              <p className="selectComment__header">
                Post UID list
                <span>({lineCount})</span>
              </p>
              <div className="component-item text">
                <textarea
                  id="textContent"
                  name="textContent"
                  rows="10"
                  value={textContent}
                  onPaste={handleTextareaPaste}
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

            <div className="component-item numberPostOrUser">
              <p className="component-item__header">Number of posts/user:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={postValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={postValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
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
                  type="text"
                  name="End"
                  value={postValues.PostEnd}
                  onChange={(event) => postValues.handleInputChangeEnd(event)}
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

export default Post_Interaction;
