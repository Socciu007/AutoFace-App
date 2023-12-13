// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import {
  DelayTime,
  FriendsOption,
  NumberFriend,
  NumberPhotoVideo,
  NumberPost,
  PostOption,
  ShowTag,
  TextOfTextarea,
  UIDListContent,
  URLImg,
} from './CreatePost';
const CreatePostGroup = ({ onGoBackClick }) => {
  const {
    inputValuePostStart,
    handleIncrementPostStart,
    handleDecrementPostStart,
    inputValuePostEnd,
    handleIncrementPostEnd,
    handleDecrementPostEnd,
    handleInputChangePostStart,
    handleInputChangePostEnd,
  } = NumberPost();

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
    inputValuePhotoVideoStart,
    handleIncrementPhotoVideoStart,
    handleDecrementPhotoVideoStart,
    inputValuePhotoVideoEnd,
    handleIncrementPhotoVideoEnd,
    handleDecrementPhotoVideoEnd,
    handleInputChangePhotoVideoStart,
    handleInputChangePhotoVideoEnd,
  } = NumberPhotoVideo();

  const {
    inputValueNumberFriendStart,
    handleIncrementNumberFriendStart,
    handleDecrementNumberFriendStart,
    inputValueNumberFriendEnd,
    handleIncrementNumberFriendEnd,
    handleDecrementNumberFriendEnd,
    handleInputChangeNumberFriendStart,
    handleInputChangeNumberFriendEnd,
  } = NumberFriend();

  const { isTag, handleCheckboxTag } = ShowTag();

  const { selectedValuePost, handleSelectChangePost } = PostOption();

  const { selectedValueFriend, handleSelectChangeFriend } = FriendsOption();

  const { textContent, handleTextareaChange } = TextOfTextarea();

  const { UIDContent, handleTextareaChangeUID, charCount } = UIDListContent();

  const { files, getRootProps, getInputProps, handleDeleteButtonClick } = URLImg();
  return (
    <div className="createPostGroup">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Create post</p>
            </div>
            <div className="component-item numberOfPost">
              <p className="component-item__header">Number of posts:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPostStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPostStart} />
                </div>
                <input type="text" value={inputValuePostStart} onChange={handleInputChangePostStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPostEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPostEnd} />
                </div>
                <input type="text" value={inputValuePostEnd} onChange={handleInputChangePostEnd} />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time <span>(s):</span>
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
            <div className="component-item Post">
              <div className="component-item__header">
                <p>Post options</p>
              </div>
              <div className="PostContent">
                <div className="component-item postOption">
                  <select
                    name="postOption"
                    className="PostType"
                    onChange={handleSelectChangePost}
                    value={selectedValuePost}
                  >
                    <option value="photoOrVideo">Text, Photo/video</option>
                    <option value="background">Using background</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                <div>
                  <div className="Text">
                    <p className="selectPost__header">Text</p>
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
                </div>

                {selectedValuePost === 'photoOrVideo' && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>
                    <div className="component-item numberOfPost">
                      <p className="component-item__header numberOfPostText">Number of photo/video:</p>
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
                        <p>Drop a file here</p>
                      </div>
                    ) : (
                      <div className={`folderPhoto`}>
                        <div className="URLImg">
                          <span style={{ opacity: '0.5' }}>Folder:</span>
                          <span>
                            {files.map((fileName, index) => (
                              <span key={index}>{fileName}</span>
                            ))}
                          </span>
                        </div>
                        <img src={DeleteButton} alt="Delete Button" onClick={handleDeleteButtonClick} />
                      </div>
                    )}
                    <div className="component-item__header">
                      <input type="checkbox" name="CheckTag" onChange={handleCheckboxTag} />
                      <p>Tag</p>
                    </div>
                    <div className={`component-item tag ${isTag ? 'show' : 'hide'}`}>
                      <div className="numberOfFriend">
                        <p>Number of friends:</p>
                        <div className="component-item__content">
                          <div className="component-item__number">
                            <div className="component-item__number__icon">
                              <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberFriendStart} />
                              <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberFriendStart} />
                            </div>
                            <input
                              type="text"
                              value={inputValueNumberFriendStart}
                              onChange={handleInputChangeNumberFriendStart}
                            />
                          </div>
                          <span>to</span>
                          <div className="component-item__number">
                            <div className="component-item__number__icon">
                              <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberFriendEnd} />
                              <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberFriendEnd} />
                            </div>
                            <input
                              type="text"
                              value={inputValueNumberFriendEnd}
                              onChange={handleInputChangeNumberFriendEnd}
                            />
                          </div>
                        </div>
                      </div>
                      <p>Friends</p>
                      <div className="component-item optionTag">
                        <select
                          name="optionTag"
                          className="TagType"
                          onChange={handleSelectChangeFriend}
                          value={selectedValueFriend}
                        >
                          <option value="amongFriend">Randomly tag among friends</option>
                          <option value="UIDList">UID list</option>
                        </select>

                        <img src={downButton} alt="Down button" />
                      </div>
                      {selectedValueFriend === 'UIDList' && (
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
                      )}
                    </div>
                  </div>
                )}
                <div className="UIDList">
                  <div className="UIDList__header">
                    <p>Group UID list</p>
                    <span>({charCount})</span>
                  </div>
                  <div className="component-item UID">
                    <textarea
                      id="UIDContent"
                      name="UIDContent"
                      rows="10"
                      value={UIDContent}
                      onChange={handleTextareaChangeUID}
                    ></textarea>
                    <div className={`placeholder ${UIDContent ? 'hide' : ''}`}>
                      <p>
                        <span>1</span>Enter the UID here
                      </p>
                      <p>
                        <span>2</span>Each UID/line
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

export default CreatePostGroup;
