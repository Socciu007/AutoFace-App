// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import saveIcon from '../../../assets/img/Page-1.png';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
const AddFriend = () => {
  //Value number of Requests start
  const [inputValueRequestsStart, setInputValueRequestsStart] = useState(5);
  const handleIncrementRequestsStart = () => {
    setInputValueRequestsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementRequestsStart = () => {
    setInputValueRequestsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Requests end
  const [inputValueRequestsEnd, setInputValueRequestsEnd] = useState(10);
  const handleIncrementRequestsEnd = () => {
    setInputValueRequestsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementRequestsEnd = () => {
    setInputValueRequestsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Stop after Facebook warning (times)
  const [inputValueStopTime, setInputValueStopTime] = useState(5);
  const handleIncrementStopTime = () => {
    setInputValueStopTime((prevValue) => prevValue + 1);
  };
  const handleDecrementStopTime = () => {
    setInputValueStopTime((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random NumberPost start
  const [inputValueNumberPostStart, setInputValueNumberPostStart] = useState(5);
  const handleIncrementNumberPostStart = () => {
    setInputValueNumberPostStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostStart = () => {
    setInputValueNumberPostStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random NumberPost end
  const [inputValueNumberPostEnd, setInputValueNumberPostEnd] = useState(10);
  const handleIncrementNumberPostEnd = () => {
    setInputValueNumberPostEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostEnd = () => {
    setInputValueNumberPostEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Hien thi select addfriend option
  const [selectedValueTypeAddFriend, setSelectedValueType] = useState('suggestions');
  const [textContentAddFriendRequest, setTextContentAddFriendRequest] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSelectorChange = (event) => {
    const value = event.target.value;
    setSelectedValueType(value);

    switch (value) {
      case 'UID':
        setPlaceholderText('Enter the UID list here\nEach UID/line');
        break;
      case 'UIDList':
        setPlaceholderText('Enter the UID list here\nEach UID/line');
        break;
      case 'keywords':
        setPlaceholderText('Enter the keyword list here\nEach keyword/line');
        break;
      case 'groupMembers':
        setPlaceholderText('Enter the group UID here\nEach UID/line');
        break;
      case 'friendOfUID':
        setPlaceholderText('Enter the UID here\nEach UID/line');
        break;
      default:
        setPlaceholderText('');
    }
  };

  useEffect(() => {
    // Update giá trị của placeholderText khi component được tạo ra
    handleSelectorChange({ target: { value: selectedValueTypeAddFriend } });
  }, []); // Chạy useEffect chỉ khi component được tạo ra

  useEffect(() => {
    // Update style khi có sự thay đổi trong textarea
    const placeholder = document.getElementById('placeholderTypeAddFriend');
    if (placeholder) {
      placeholder.style.display = textContentAddFriendRequest ? 'none' : 'block';
    }
  }, [textContentAddFriendRequest]);

  //cai dat cho phan text comment khi go text vao
  const [textContentComment, setTextContentComment] = useState('');

  const handleTextareaChangeComment = (event) => {
    setTextContentComment(event.target.value);
  };
  // Hien thi Interact
  const [isInteract, setIsInteract] = useState(false);

  const handleCheckboxInteract = () => {
    setIsInteract((prevIsInteract) => !prevIsInteract);
  };
  // Hien thi Comment khi ấn vào check box
  const [isComment, setIsComment] = useState(false);

  const handleCheckboxComment = () => {
    setIsComment((prevIsComment) => !prevIsComment);
  };

  return (
    <div className="Add_Friend">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleAddFriend">
              <img src={backButton} alt="Back button" />
              <p>Add friends</p>
            </div>
            <div className="component-item addFriend">
              <div className="component-item__header">
                <p>Select Add friend type</p>
              </div>
              <div className="addFriendContent">
                <div className="component-item addFriendOption">
                  <select
                    name="addFriendOption"
                    className="addFriendType"
                    onChange={handleSelectorChange}
                    value={selectedValueTypeAddFriend}
                  >
                    <option value="suggestions">By suggestions</option>
                    <option value="acceptFriendRequests">Accept friend requests</option>
                    <option value="UID">By UID</option>
                    <option value="UIDList">UID list</option>
                    <option value="keywords">By keywords</option>
                    <option value="groupMembers">Group members</option>
                    <option value="friendOfFriends">Friend of friends</option>
                    <option value="friendOfUID">Friend of UID</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValueTypeAddFriend === 'suggestions' ||
                  selectedValueTypeAddFriend === 'acceptFriendRequests' ||
                  selectedValueTypeAddFriend === 'friendOfFriends') && (
                  <div>
                    <div className="component-item numberOfRequests">
                      <p className="component-item__header">Number of requests:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementRequestsStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementRequestsStart} />
                        </div>
                        <input type="text" value={inputValueRequestsStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementRequestsEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementRequestsEnd} />
                        </div>
                        <input type="text" value={inputValueRequestsEnd} onChange />
                      </div>
                    </div>
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span>(s):</span>
                      </p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                        </div>
                        <input type="text" value={inputValueDelayTimeStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                        </div>
                        <input type="text" value={inputValueDelayTimeEnd} onChange />
                      </div>
                    </div>
                    {selectedValueTypeAddFriend === 'suggestions' && (
                      <div className="component-item stopTimeAfterWarning">
                        <p>
                          Stop after Facebook warning <span>(times):</span>
                        </p>
                        <div className="component-item__number">
                          <div className="component-item__number__icon">
                            <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementStopTime} />
                            <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementStopTime} />
                          </div>
                          <input type="text" value={inputValueStopTime} onChange />
                        </div>
                      </div>
                    )}
                    {(selectedValueTypeAddFriend === 'suggestions' ||
                      selectedValueTypeAddFriend === 'acceptFriendRequests') && (
                      <div className="component-item addFriendHaveMutualFriend">
                        <input type="checkbox" name="addFriendHaveMutualFriend" id="checkboxAddFriend" />
                        <p>Only add friends with people who have mutual friends</p>
                      </div>
                    )}
                  </div>
                )}
                {(selectedValueTypeAddFriend === 'UIDList' ||
                  selectedValueTypeAddFriend === 'UID' ||
                  selectedValueTypeAddFriend === 'keywords' ||
                  selectedValueTypeAddFriend === 'groupMembers' ||
                  selectedValueTypeAddFriend === 'friendOfUID') && (
                  <div>
                    <div className="component-item textAddFriend">
                      <textarea
                        id="textAddFriendContent"
                        name="textAddFriendContent"
                        rows="10"
                        onChange={(e) => setTextContentAddFriendRequest(e.target.value)}
                      ></textarea>
                      <div
                        id="placeholderTypeAddFriend"
                        className={`placeholder ${textContentAddFriendRequest ? 'hide' : ''}`}
                      >
                        <p>
                          <span>1</span>
                          {placeholderText.split('\n')[0]}
                        </p>
                        <p>
                          <span>2</span>
                          {placeholderText.split('\n')[1]}
                        </p>
                      </div>
                    </div>
                    <div className="component-item numberOfRequests">
                      <p className="component-item__header">Number of requests:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementRequestsStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementRequestsStart} />
                        </div>
                        <input type="text" value={inputValueRequestsStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementRequestsEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementRequestsEnd} />
                        </div>
                        <input type="text" value={inputValueRequestsEnd} onChange />
                      </div>
                    </div>
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span>(s):</span>
                      </p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                        </div>
                        <input type="text" value={inputValueDelayTimeStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                        </div>
                        <input type="text" value={inputValueDelayTimeEnd} onChange />
                      </div>
                    </div>
                    {(selectedValueTypeAddFriend === 'UIDList' || selectedValueTypeAddFriend === 'UID') && (
                      <div>
                        <div className="component-item autoDelete">
                          <input type="checkbox" name="autoDelete" id="autoDelete" />
                          <p>Automatically delete the UID that sent the friend request</p>
                        </div>

                        <div className="component-item Interact">
                          <input type="checkbox" name="Interact" onChange={handleCheckboxInteract} />
                          <p>Interact before sending friend request</p>
                        </div>
                        {selectedValueTypeAddFriend === 'UIDList' && (
                          <div className={`component-item InteractContent ${isInteract ? 'show' : 'hide'}`}>
                            <div className="component-item numberOfPost">
                              <p className="component-item__header">Number of posts:</p>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img
                                    src={iconIncrease}
                                    alt="Increase icon"
                                    onClick={handleIncrementNumberPostStart}
                                  />
                                  <img
                                    src={iconDecrease}
                                    alt="Decrease icon"
                                    onClick={handleDecrementNumberPostStart}
                                  />
                                </div>
                                <input type="text" value={inputValueNumberPostStart} onChange />
                              </div>
                              <span>to</span>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostEnd} />
                                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostEnd} />
                                </div>
                                <input type="text" value={inputValueNumberPostEnd} onChange />
                              </div>
                            </div>
                            <div className="component-item delayTime">
                              <p className="component-item__header">
                                Delay time<span>(s):</span>
                              </p>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                                </div>
                                <input type="text" value={inputValueDelayTimeStart} onChange />
                              </div>
                              <span>to</span>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                                </div>
                                <input type="text" value={inputValueDelayTimeEnd} onChange />
                              </div>
                            </div>
                            <div className="inputLike">
                              <input type="checkbox" name="Like" id="inputLike" />
                              <p>Like</p>
                            </div>
                            <div className="inputComment">
                              <input
                                type="checkbox"
                                name="Comment"
                                id="inputComment"
                                onChange={handleCheckboxComment}
                              />
                              <p>Comment</p>
                            </div>
                            <div className={`component-item textComment ${isComment ? 'show' : 'hide'}`}>
                              <textarea
                                id="textContentComment"
                                name="textContentComment"
                                rows="10"
                                value={textContentComment}
                                onChange={handleTextareaChangeComment}
                              ></textarea>
                              <div className={`placeholder ${textContentComment ? 'hide' : ''}`}>
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

export default AddFriend;
