// eslint-disable-next-line no-unused-vars
import React from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Editor from 'react-simple-code-editor';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { FriendsOption, ListUIDContent, PostOption, ShowTag, URLImg, useRangeValues, useTextarea } from './CreatePost';
const CreatePostGroup = ({ onGoBackClick }) => {
  const initialValues = {
    PostStart: 5,
    PostEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    PhotoVideoStart: 5,
    PhotoVideoEnd: 10,
    NumberFriendStart: 5,
    NumberFriendEnd: 10,
  };

  const postValues = useRangeValues(initialValues, 'Post');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const photoVideoValues = useRangeValues(initialValues, 'PhotoVideo');
  const numberFriendValues = useRangeValues(initialValues, 'NumberFriend');

  const { isTag, handleCheckboxTag } = ShowTag();

  const { selectedValuePost, handleSelectChangePost } = PostOption();

  const { selectedValueFriend, handleSelectChangeFriend } = FriendsOption();

  const {
    value: textContent,
    handleChange: handleTextareaChange,
    hightlightWithLineNumbers: LineNumbersText,
    handleDivClick: handleDivClick,
  } = useTextarea('', 'text');

  const {
    value: UIDtextContent,
    handleChange: handleTextareaUIDChange,
    hightlightWithLineNumbers: LineNumbersUID,
    handleDivClick: handleUIDDivClick,
  } = useTextarea('', 'UID');

  const {
    UIDListContent,
    handleTextareaChangeUIDList,
    handleTextareaUIDListPaste,
    lineCount,
    handleDivUIDListClick,
    hightlightWithLineNumbers,
    setUIDContent,
  } = ListUIDContent();

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
                  <img src={iconIncrease} alt="Increase icon" onClick={postValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={postValues.handleDecrement} />
                </div>
                <input
                  name="Start"
                  type="text"
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
                  name="End"
                  type="text"
                  value={postValues.PostEnd}
                  onChange={(event) => postValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time<span style={{ marginLeft: '2px' }}>(s):</span>
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
            <div className="component-item Post">
              <div className="component-item__header">
                <p>Post options</p>
              </div>
              <div className="PostContent">
                <div className="component-item postOption">
                  <Select
                    name="postOption"
                    className="PostType"
                    onChange={handleSelectChangePost}
                    value={selectedValuePost}
                  >
                    <MenuItem value="photoOrVideo">Text, Photo/video</MenuItem>
                    <MenuItem value="background">Using background</MenuItem>
                  </Select>
                </div>
                <div>
                  <div className="Text">
                    <p className="selectPost__header">Text</p>
                    <div className="component-item " style={{ position: 'relative' }}>
                      <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                        <Editor
                          value={textContent}
                          onValueChange={handleTextareaChange}
                          highlight={(textContent) => LineNumbersText(textContent, languages.js)}
                          padding={15}
                          className="editor"
                          textareaId="text"
                          style={{
                            background: '#f5f5f5',
                            fontSize: 15,
                          }}
                        />
                      </div>
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

                {selectedValuePost === 'photoOrVideo' && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>

                    <div className="component-item numberOfPost">
                      <p className="component-item__header numberOfPostText">Number of photo/video:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={photoVideoValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={photoVideoValues.handleDecrement} />
                        </div>
                        <input
                          name="Start"
                          type="text"
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
                          name="End"
                          type="text"
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
                          <div style={{ width: '85%' }}>
                            {files.map((fileName, index) => (
                              <span key={index}>{fileName}</span>
                            ))}
                          </div>
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
                              <img
                                src={iconIncrease}
                                alt="Increase icon"
                                onClick={numberFriendValues.handleIncrement}
                              />
                              <img
                                src={iconDecrease}
                                alt="Decrease icon"
                                onClick={numberFriendValues.handleDecrement}
                              />
                            </div>
                            <input
                              name="Start"
                              type="text"
                              value={numberFriendValues.NumberFriendStart}
                              onChange={(event) => numberFriendValues.handleInputChangeStart(event)}
                            />
                          </div>
                          <span>to</span>
                          <div className="component-item__number">
                            <div className="component-item__number__icon">
                              <img
                                src={iconIncrease}
                                alt="Increase icon"
                                onClick={numberFriendValues.handleIncrementEnd}
                              />
                              <img
                                src={iconDecrease}
                                alt="Decrease icon"
                                onClick={numberFriendValues.handleDecrementEnd}
                              />
                            </div>
                            <input
                              name="End"
                              type="text"
                              value={numberFriendValues.NumberFriendEnd}
                              onChange={(event) => numberFriendValues.handleInputChangeEnd(event)}
                            />
                          </div>
                        </div>
                      </div>
                      <p>Friends</p>
                      <div className="component-item optionTag">
                        <Select
                          name="optionTag"
                          className="TagType"
                          onChange={handleSelectChangeFriend}
                          value={selectedValueFriend}
                        >
                          <MenuItem value="amongFriend">Randomly tag among friends</MenuItem>
                          <MenuItem value="UIDList">UID list</MenuItem>
                        </Select>
                      </div>
                      {selectedValueFriend === 'UIDList' && (
                        <div className="component-item " style={{ position: 'relative' }}>
                          <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                            <Editor
                              value={UIDtextContent}
                              onValueChange={handleTextareaUIDChange}
                              highlight={(UIDtextContent) => LineNumbersUID(UIDtextContent, languages.js)}
                              padding={15}
                              className="editor"
                              textareaId="UID"
                              style={{
                                background: '#f5f5f5',
                                fontSize: 15,
                              }}
                            />
                          </div>
                          <div onClick={handleUIDDivClick} className={`placeholder ${UIDtextContent ? 'hide' : ''}`}>
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

                    <div className="UIDList">
                      <div className="UIDList__header">
                        <p>Group UID list</p>
                        <span>({lineCount})</span>
                      </div>
                      <div className="component-item" style={{ position: 'relative' }}>
                        <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="UID">
                          <Editor
                            onChange={handleTextareaChangeUIDList}
                            onPaste={handleTextareaUIDListPaste}
                            value={UIDListContent}
                            onValueChange={(UIDListContent) => setUIDContent(UIDListContent)}
                            highlight={(UIDListContent) => hightlightWithLineNumbers(UIDListContent, languages.js)}
                            padding={15}
                            className="editor"
                            textareaId="codeArea"
                            style={{
                              background: '#f5f5f5',
                              fontSize: 15,
                            }}
                          />
                        </div>

                        <div onClick={handleDivUIDListClick} className={`placeholder ${UIDListContent ? 'hide' : ''}`}>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostGroup;
