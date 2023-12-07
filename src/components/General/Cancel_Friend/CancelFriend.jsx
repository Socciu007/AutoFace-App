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
const CancelFriend = () => {
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

  //Random NumberFriend start
  const [inputValueNumberFriendStart, setInputValueNumberFriendStart] = useState(5);
  const handleIncrementNumberFriendStart = () => {
    setInputValueNumberFriendStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberFriendStart = () => {
    setInputValueNumberFriendStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random NumberFriend end
  const [inputValueNumberFriendEnd, setInputValueNumberFriendEnd] = useState(10);
  const handleIncrementNumberFriendEnd = () => {
    setInputValueNumberFriendEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberFriendEnd = () => {
    setInputValueNumberFriendEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Hien thi select cancel Friend option
  const [selectedValueCancelFriend, setSelectedValueCancelFriend] = useState('');

  const handleSelectChangeCancelFriend = (event) => {
    setSelectedValueCancelFriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueCancelFriend('cancelRequest');
  }, []);

  //Hien thi select  Unfriend option
  const [selectedValueUnfriend, setSelectedValueUnfriend] = useState('');

  const handleSelectChangeUnfriend = (event) => {
    setSelectedValueUnfriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueUnfriend('random');
  }, []);

  //cai dat cho phan UID Text (khi go chu thi placeholder cua textarea se an di)
  const [UIDContent, setUIDContent] = useState('');

  const handleTextareaChangeUIDContent = (event) => {
    setUIDContent(event.target.value);
  };

  return (
    <div className="CancelFriend">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleCancelFriend">
              <img src={backButton} alt="Back button" />
              <p>Cancel friend</p>
            </div>
            <div className="component-item cancelFriend">
              <div className="component-item__header">
                <p>Select Cancel friend type</p>
              </div>
              <div className="cancelFriendContent">
                <div className="component-item cancelFriendOption">
                  <select
                    name="cancelFriendOption"
                    className="cancelFriendType"
                    onChange={handleSelectChangeCancelFriend}
                    value={selectedValueCancelFriend}
                  >
                    <option value="cancelRequest">Cancel friend requests</option>
                    <option value="unfriend">Unfriend</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {selectedValueCancelFriend === 'cancelRequest' && (
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
                )}
                {(selectedValueCancelFriend === 'cancelRequest' || selectedValueCancelFriend === 'unfriend') && (
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
                )}
                {selectedValueCancelFriend === 'unfriend' && (
                  <div className="component-item unfriend">
                    <div className="component-item__header">
                      <p>Unfriend options</p>
                    </div>
                    <div className="unfriendContent">
                      <div className="component-item unfriendOption">
                        <select
                          name="unfriendOption"
                          className="unfriendSelector"
                          onChange={handleSelectChangeUnfriend}
                          value={selectedValueUnfriend}
                        >
                          <option value="random">Randomly</option>
                          <option value="UID">UID</option>
                        </select>
                        <img src={downButton} alt="Down Button" />
                      </div>
                      {selectedValueUnfriend === 'random' && (
                        <div className="component-item comment__numberFriend">
                          <p className="component-item__header">Number of friends:</p>
                          <div className="component-item__content">
                            <div className="component-item__number">
                              <div className="component-item__number__icon">
                                <img
                                  src={iconIncrease}
                                  alt="Increase icon"
                                  onClick={handleIncrementNumberFriendStart}
                                />
                                <img
                                  src={iconDecrease}
                                  alt="Decrease icon"
                                  onClick={handleDecrementNumberFriendStart}
                                />
                              </div>
                              <input type="text" value={inputValueNumberFriendStart} onChange />
                            </div>
                            <span>to</span>
                            <div className="component-item__number">
                              <div className="component-item__number__icon">
                                <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberFriendEnd} />
                                <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberFriendEnd} />
                              </div>
                              <input type="text" value={inputValueNumberFriendEnd} onChange />
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedValueUnfriend === 'UID' && (
                        <div className="component-item UIDText">
                          <textarea
                            id="UIDContent"
                            name="UIDContent"
                            rows="10"
                            value={UIDContent}
                            onChange={handleTextareaChangeUIDContent}
                          ></textarea>
                          <div className={`placeholder ${UIDContent ? 'hide' : ''}`}>
                            <p>
                              <span>1</span>Enter the UID list here
                            </p>
                            <p>
                              <span>2</span>Each UID/line
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

export default CancelFriend;
