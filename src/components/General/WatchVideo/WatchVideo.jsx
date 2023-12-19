// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import { CommentOption, CommentTextarea, URLImg, useRangeValues, useShowCheckbox } from './WatchVideo';
const WatchVideo = ({ onGoBackClick }) => {
  const initialValues = {
    NumberVideoStart: 5,
    NumberVideoEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    LikeStart: 5,
    LikeEnd: 10,
    ShareStart: 5,
    ShareEnd: 10,
    CommentStart: 5,
    CommentEnd: 10,
    PhotoVideoStart: 5,
    PhotoVideoEnd: 10,
  };

  const numberVideoValues = useRangeValues(initialValues, 'NumberVideo');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const likeValues = useRangeValues(initialValues, 'Like');
  const shareValues = useRangeValues(initialValues, 'Share');
  const commentValues = useRangeValues(initialValues, 'Comment');
  const photoVideoValues = useRangeValues(initialValues, 'PhotoVideo');

  const { isLiked, handleCheckboxChangeLiked } = useShowCheckbox(false, 'Liked');

  const { isShare, handleCheckboxChangeShare } = useShowCheckbox(false, 'Share');

  const { isComment, handleCheckboxChangeComment } = useShowCheckbox(false, 'Comment');

  const { selectedValue, handleSelectChange } = CommentOption();

  const { textContent, handleTextareaChange, handleDivClick, textareaRef } = CommentTextarea();

  const { files, getRootProps, getInputProps, handleDeleteButtonClick } = URLImg();

  return (
    <div className="watch-video">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Watch video</p>
            </div>
            <div className="component-item numberOfVideo">
              <p className="component-item__header">Number of videos:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberVideoValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberVideoValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={numberVideoValues.NumberVideoStart}
                  onChange={(event) => numberVideoValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={numberVideoValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={numberVideoValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={numberVideoValues.NumberVideoEnd}
                  onChange={(event) => numberVideoValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">
                Watching time/video <span style={{ marginLeft: '2px' }}>(s):</span>
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
            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChangeLiked} />
                <p>
                  Random Like{' '}
                  <span style={{ marginLeft: '2px' }} className={`span__content ${isLiked ? 'show' : 'hide'}`}>
                    (video)
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
                    (video)
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
                <div className="component-item comment__numberOfVideo">
                  <p className="component-item__header">Number of videos:</p>
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
                <p className="selectComment__header">Select Comment type</p>
                <div className="component-item optionComment">
                  <select
                    name="optionComment"
                    className="commentType"
                    onChange={handleSelectChange}
                    value={selectedValue}
                  >
                    <option value="text">Text</option>
                    <option value="photoOrVideo">Photo/video</option>
                    <option value="all">Text & Photo/video</option>
                  </select>
                </div>
                {(selectedValue === 'text' || selectedValue === 'all') && (
                  <div className="Text">
                    <p className="selectComment__header">Text</p>
                    <div className="component-item text">
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
                )}
                {(selectedValue === 'photoOrVideo' || selectedValue === 'all') && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>
                    <div className="component-item numberOfVideo">
                      <p className="component-item__header numberOfVideoText">Number of photo/video:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={photoVideoValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={photoVideoValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          name="Start"
                          value={photoVideoValues.PhotoVideoStart}
                          onChange={(event) => photoVideoValues.handleInputChangeStart(event)}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={photoVideoValues.handleIncrementEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={photoVideoValues.handleDecrementEnd} />
                        </div>
                        <input
                          type="text"
                          name="End"
                          value={photoVideoValues.PhotoVideoEnd}
                          onChange={(event) => photoVideoValues.handleInputChangeEnd(event)}
                        />
                      </div>
                    </div>

                    {files.length === 0 ? (
                      <div {...getRootProps({ className: 'component-item dragVideoOrPhoto' })}>
                        <input {...getInputProps()} />
                        <img className="mx-auto h-40" src={DragButton} alt="addfile" />
                        <p>Drag the photo/video folder here</p>
                      </div>
                    ) : (
                      <div className={`folderPhoto`}>
                        <div className="URLImg">
                          <span style={{ opacity: '0.5' }}>Folder:</span>
                          <div style={{ width: '100%' }}>
                            {files.map((fileName, index) => (
                              <span key={index}>{fileName}</span>
                            ))}
                          </div>
                        </div>
                        <img src={DeleteButton} alt="Delete Button" onClick={handleDeleteButtonClick} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
