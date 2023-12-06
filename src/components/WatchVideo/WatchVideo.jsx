// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../assets/img/Page-1.png';
import iconDecrease from '../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../assets/icon/icon-Increase.svg';
import backButton from '../../assets/icon/icon-back.svg';
import DragButton from '../../assets/icon/icon-drag.svg';
import DeleteButton from '../../assets/icon/icon-Delete.svg';
import downButton from '../../assets/icon/icon-down.svg';
import Edit from '../../assets/icon/icon-edit.svg';
import Debug from '../../assets/icon/icon-debug.svg';
import RunTest from '../../assets/icon/icon-runTest.svg';
import iconOptions from '../../assets/icon/icon-options.svg';
const WatchVideo = () => {
  //Video start
  const [inputValueVideoStart, setInputValueVideoStart] = useState(5);
  const handleIncrementVideoStart = () => {
    setInputValueVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementVideoStart = () => {
    setInputValueVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Video end
  const [inputValueVideoEnd, setInputValueVideoEnd] = useState(10);
  const handleIncrementVideoEnd = () => {
    setInputValueVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementVideoEnd = () => {
    setInputValueVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Watching time/video (s) start
  const [inputValueWatchVideoStart, setInputValueWatchVideoStart] = useState(5);
  const handleIncrementWatchVideoStart = () => {
    setInputValueWatchVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementWatchVideoStart = () => {
    setInputValueWatchVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Watching time/video (s) end
  const [inputValueWatchVideoEnd, setInputValueWatchVideoEnd] = useState(10);
  const handleIncrementWatchVideoEnd = () => {
    setInputValueWatchVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementWatchVideoEnd = () => {
    setInputValueWatchVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Random Like start
  const [inputValueLikeStart, setInputValueLikeStart] = useState(5);
  const handleIncrementLikeStart = () => {
    setInputValueLikeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementLikeStart = () => {
    setInputValueLikeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random Like end
  const [inputValueLikeEnd, setInputValueLikeEnd] = useState(10);
  const handleIncrementLikeEnd = () => {
    setInputValueLikeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementLikeEnd = () => {
    setInputValueLikeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Random Share start
  const [inputValueShareStart, setInputValueShareStart] = useState(5);
  const handleIncrementShareStart = () => {
    setInputValueShareStart((prevValue) => prevValue + 1);
  };
  const handleDecrementShareStart = () => {
    setInputValueShareStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random Share end
  const [inputValueShareEnd, setInputValueShareEnd] = useState(10);
  const handleIncrementShareEnd = () => {
    setInputValueShareEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementShareEnd = () => {
    setInputValueShareEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Random CommentVideo start
  const [inputValueCommentVideoStart, setInputValueCommentVideoStart] = useState(5);
  const handleIncrementCommentVideoStart = () => {
    setInputValueCommentVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementCommentVideoStart = () => {
    setInputValueCommentVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random CommentVideo end
  const [inputValueCommentVideoEnd, setInputValueCommentVideoEnd] = useState(10);
  const handleIncrementCommentVideoEnd = () => {
    setInputValueCommentVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementCommentVideoEnd = () => {
    setInputValueCommentVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Random PhotoVideo start
  const [inputValuePhotoVideoStart, setInputValuePhotoVideoStart] = useState(5);
  const handleIncrementPhotoVideoStart = () => {
    setInputValuePhotoVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementPhotoVideoStart = () => {
    setInputValuePhotoVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random PhotoVideo end
  const [inputValuePhotoVideoEnd, setInputValuePhotoVideoEnd] = useState(10);
  const handleIncrementPhotoVideoEnd = () => {
    setInputValuePhotoVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementPhotoVideoEnd = () => {
    setInputValuePhotoVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  // Hien thi
  const [isLiked, setIsLiked] = useState(false);

  const handleCheckboxChange = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };
  //Hien thi share
  const [isShare, setIsShared] = useState(false);
  const handleCheckboxChangeShare = () => {
    setIsShared((prevIsLiked) => !prevIsLiked);
  };

  //Hien thi comment
  const [isComment, setisComment] = useState(false);
  const handleCheckboxChangeComment = () => {
    setisComment((prevIsLiked) => !prevIsLiked);
  };

  //Hien thi select
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    setSelectedValue('text');
  }, []);

  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };

  //Hien thi duong dan cua anh
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleIconClick = () => {
    if (!isFileSelected) {
      document.getElementById('dragVideoOrPhotoInput').click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    // Kiểm tra xem có file được chọn không và chưa thực hiện hiển thị
    if (selectedFile && !isFileSelected) {
      setIsFileSelected(true);
    }
  }, [selectedFile, isFileSelected]);
  return (
    <div className="watch-video">
      <h1 className="watch-video__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>Watch video</p>
            </div>
            <div className="component-item numberOfVideo">
              <p className="component-item__header">Number of videos:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementVideoStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementVideoStart} />
                </div>
                <input type="text" value={inputValueVideoStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementVideoEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementVideoEnd} />
                </div>
                <input type="text" value={inputValueVideoEnd} onChange />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">
                Watching time/video <span>(s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementWatchVideoStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementWatchVideoStart} />
                </div>
                <input type="text" value={inputValueWatchVideoStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementWatchVideoEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementWatchVideoEnd} />
                </div>
                <input type="text" value={inputValueWatchVideoEnd} onChange />
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
                  <input type="text" value={inputValueLikeStart} onChange />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementLikeEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementLikeEnd} />
                  </div>
                  <input type="text" value={inputValueLikeEnd} onChange />
                </div>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input type="checkbox" name="randomShare" onChange={handleCheckboxChangeShare} />
                <p>
                  Share to Feed <span className={`span__content ${isLiked ? 'show' : 'hide'}`}>(video)</span>:
                </p>
              </div>
              <div className={`component-item__content ${isShare ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementShareStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementShareStart} />
                  </div>
                  <input type="text" value={inputValueShareStart} onChange />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementShareEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementShareEnd} />
                  </div>
                  <input type="text" value={inputValueShareEnd} onChange />
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
                      <input type="text" value={inputValueCommentVideoStart} onChange />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementCommentVideoEnd} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementCommentVideoEnd} />
                      </div>
                      <input type="text" value={inputValueCommentVideoEnd} onChange />
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
                        <input type="text" value={inputValuePhotoVideoStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementPhotoVideoEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementPhotoVideoEnd} />
                        </div>
                        <input type="text" value={inputValuePhotoVideoEnd} onChange />
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

export default WatchVideo;
