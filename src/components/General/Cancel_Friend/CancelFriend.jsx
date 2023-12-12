// eslint-disable-next-line no-unused-vars
import React from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
import iconSave from '../../../assets/icon/icon-save.svg';
import { UIDText, cancelFriendOption, delayTime, numberFriend, numberOfRequests, unfriendOption } from './CancelFriend';
const CancelFriend = () => {
  const {
    inputValueRequestsStart,
    handleIncrementRequestsStart,
    handleDecrementRequestsStart,
    inputValueRequestsEnd,
    handleIncrementRequestsEnd,
    handleDecrementRequestsEnd,
    handleInputChangeRequestsStart,
    handleInputChangeRequestsEnd,
  } = numberOfRequests();

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
    inputValueNumberFriendStart,
    handleIncrementNumberFriendStart,
    handleDecrementNumberFriendStart,
    inputValueNumberFriendEnd,
    handleIncrementNumberFriendEnd,
    handleDecrementNumberFriendEnd,
    handleInputChangeNumberFriendStart,
    handleInputChangeNumberFriendEnd,
  } = numberFriend();

  const { selectedValueCancelFriend, handleSelectChangeCancelFriend } = cancelFriendOption();

  const { selectedValueUnfriend, handleSelectChangeUnfriend } = unfriendOption();

  const { UIDContent, handleTextareaChangeUIDContent } = UIDText();

  return (
    <div className="CancelFriend">
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
                      <input type="text" value={inputValueRequestsStart} onChange={handleInputChangeRequestsStart} />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementRequestsEnd} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementRequestsEnd} />
                      </div>
                      <input type="text" value={inputValueRequestsEnd} onChange={handleInputChangeRequestsEnd} />
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
      </div>
    </div>
  );
};

export default CancelFriend;
