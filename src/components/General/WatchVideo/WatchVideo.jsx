// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';
import { useDropzone } from 'react-dropzone';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import {
  CommentOption,
  CommentTextarea,
  NumberCommentVideo,
  NumberLike,
  NumberPhotoVideo,
  NumberShare,
  NumberVideo,
  ShowComment,
  ShowLike,
  ShowShare,
  TimeWatchVideo,
  URLImg,
} from './WatchVideo';
const WatchVideo = ({ onGoBackClick }) => {
  const {
    inputValueVideoStart,
    handleIncrementVideoStart,
    handleDecrementVideoStart,
    inputValueVideoEnd,
    handleIncrementVideoEnd,
    handleDecrementVideoEnd,
    handleInputChangeVideoStart,
    handleInputChangeVideoEnd,
  } = NumberVideo();

  const {
    inputValueWatchVideoStart,
    handleIncrementWatchVideoStart,
    handleDecrementWatchVideoStart,
    inputValueWatchVideoEnd,
    handleIncrementWatchVideoEnd,
    handleDecrementWatchVideoEnd,
    handleInputChangeWatchVideoStart,
    handleInputChangeWatchVideoEnd,
  } = TimeWatchVideo();

  const {
    inputValueLikeStart,
    handleIncrementLikeStart,
    handleDecrementLikeStart,
    inputValueLikeEnd,
    handleIncrementLikeEnd,
    handleDecrementLikeEnd,
    handleInputChangeLikeStart,
    handleInputChangeLikeEnd,
  } = NumberLike();

  const {
    inputValueShareStart,
    handleIncrementShareStart,
    handleDecrementShareStart,
    inputValueShareEnd,
    handleIncrementShareEnd,
    handleDecrementShareEnd,
    handleInputChangeShareStart,
    handleInputChangeShareEnd,
  } = NumberShare();

  const {
    inputValueCommentVideoStart,
    handleIncrementCommentVideoStart,
    handleDecrementCommentVideoStart,
    inputValueCommentVideoEnd,
    handleIncrementCommentVideoEnd,
    handleDecrementCommentVideoEnd,
    handleInputChangeCommentVideoStart,
    handleInputChangeCommentVideoEnd,
  } = NumberCommentVideo();

  const {
    inputValuePhotoVideoStart,
    handleIncrementPhotoVideoStart,
    handleDecrementPhotoVideoStart,
    inputValuePhotoVideoEnd,
    handleIncrementPhotoVideoEnd,
    handleDecrementPhotoVideoEnd,
    handleInputChangePhotoVideoStart,
    handleInputChangePhotoVideoEnd,
  } = NumberPhotoVideo();

  const { isLiked, handleCheckboxChange } = ShowLike();

  const { isShare, handleCheckboxChangeShare } = ShowShare();

  const { isComment, handleCheckboxChangeComment } = ShowComment();

  const { selectedValue, handleSelectChange } = CommentOption();

  const { textContent, handleTextareaChange } = CommentTextarea();

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
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementVideoStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementVideoStart} />
                </div>
                <input type="text" value={inputValueVideoStart} onChange={handleInputChangeVideoStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementVideoEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementVideoEnd} />
                </div>
                <input type="text" value={inputValueVideoEnd} onChange={handleInputChangeVideoEnd} />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">
                Watching time/video <span  > (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementWatchVideoStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementWatchVideoStart} />
                </div>
                <input type="text" value={inputValueWatchVideoStart} onChange={handleInputChangeWatchVideoStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementWatchVideoEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementWatchVideoEnd} />
                </div>
                <input type="text" value={inputValueWatchVideoEnd} onChange={handleInputChangeWatchVideoEnd} />
              </div>
            </div>
            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChange} />
                <p>
                  Random Like <span className={`span__content ${isLiked ? 'show' : 'hide'}`}>(video)</span>:
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
                  Share to Feed <span className={`span__content ${isShare ? 'show' : 'hide'}`}>(video)</span>:
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
                <div className="component-item comment__numberOfVideo">
                  <p className="component-item__header">Number of videos:</p>
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
                  <img src={downButton} alt="Down button" />
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
                )}
                {(selectedValue === 'photoOrVideo' || selectedValue === 'all') && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>
                    <div className="component-item numberOfVideo">
                      <p className="component-item__header numberOfVideoText">Number of photo/video:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPhotoVideoStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPhotoVideoStart} />
                        </div>
                        <input
                          type="text"
                          value={inputValuePhotoVideoStart}
                          onChange={handleInputChangePhotoVideoStart}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPhotoVideoEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPhotoVideoEnd} />
                        </div>
                        <input type="text" value={inputValuePhotoVideoEnd} onChange={handleInputChangePhotoVideoEnd} />
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
                          <div>
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
