// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconSave from '../../../assets/icon/icon-save.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
import {
  FriendsOption,
  PostOption,
  TextBackGround,
  URLImg,
  delayTime,
  numberOfFriend,
  numberOfPost,
  photoVideo,
  showTag,
} from './CreatePost.js';
const CreatePost = () => {
  const {
    inputValuePostStart,
    handleIncrementPostStart,
    handleDecrementPostStart,
    inputValuePostEnd,
    handleIncrementPostEnd,
    handleDecrementPostEnd,
    handleInputChangePostStart,
    handleInputChangePostEnd,
  } = numberOfPost();

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

  const {
    inputValuePhotoVideoStart,
    handleIncrementPhotoVideoStart,
    handleDecrementPhotoVideoStart,
    inputValuePhotoVideoEnd,
    handleIncrementPhotoVideoEnd,
    handleDecrementPhotoVideoEnd,
    handleInputChangePhotoVideoStart,
    handleInputChangePhotoVideoEnd,
  } = photoVideo();

  const {
    inputValueNumberOfFriendStart,
    handleIncrementNumberOfFriendStart,
    handleDecrementNumberOfFriendStart,
    inputValueNumberOfFriendEnd,
    handleIncrementNumberOfFriendEnd,
    handleDecrementNumberOfFriendEnd,
    handleInputChangeNumberOfFriendStart,
    handleInputChangeNumberOfFriendEnd,
  } = numberOfFriend();

  const { isTag, handleCheckboxTag } = showTag();

  const { selectedValuePost, handleSelectChangePost } = PostOption();

  const { selectedValueFriend, handleSelectChangeFriend } = FriendsOption();

  const { textContent, handleTextareaChange } = TextBackGround();

  const { handleIconClick, handleFileChange, isFileSelected, selectedFile } = URLImg();
  return (
    <div className="createPost">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
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
                    <option value="background">Using background</option>
                    <option value="photoOrVideo">Text, Photo/video</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValuePost === 'background' || selectedValuePost === 'photoOrVideo') && (
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
                )}
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
                    {!isFileSelected && (
                      <div className="component-item dragVideoOrPhoto">
                        <img src={DragButton} alt="Increase icon" onClick={handleIconClick} />
                        <p>Drag the photo/video folder here</p>
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          name="dragVideoOrPhotoInput"
                          id="dragVideoOrPhotoInput"
                          className="dragVideoOrPhotoInput"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                    {isFileSelected && (
                      <div className="folderPhoto">
                        <p>
                          <span>Folder:</span> {selectedFile.name}
                        </p>
                        <img src={DeleteButton} alt="Delete Button" />
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
                              <img
                                src={iconIncrease}
                                alt="Increase icon"
                                onClick={handleIncrementNumberOfFriendStart}
                              />
                              <img
                                src={iconDecrease}
                                alt="Decrease icon"
                                onClick={handleDecrementNumberOfFriendStart}
                              />
                            </div>
                            <input
                              type="text"
                              value={inputValueNumberOfFriendStart}
                              onChange={handleInputChangeNumberOfFriendStart}
                            />
                          </div>
                          <span>to</span>
                          <div className="component-item__number">
                            <div className="component-item__number__icon">
                              <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberOfFriendEnd} />
                              <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberOfFriendEnd} />
                            </div>
                            <input
                              type="text"
                              value={inputValueNumberOfFriendEnd}
                              onChange={handleInputChangeNumberOfFriendEnd}
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

export default CreatePost;
