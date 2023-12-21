import React from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { UIDText, cancelFriendOption, unfriendOption, useRangeValues } from './CancelFriend';
const CancelFriend = ({ onGoBackClick }) => {
  const initialValues = {
    NumberFriendStart: 5,
    NumberFriendEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    RequestsStart: 5,
    RequestsEnd: 10,
  };
  const numberFriendValues = useRangeValues(initialValues, 'NumberFriend');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const requestsValues = useRangeValues(initialValues, 'Requests');

  const { selectedValueCancelFriend, handleSelectChangeCancelFriend } = cancelFriendOption();

  const { selectedValueUnfriend, handleSelectChangeUnfriend } = unfriendOption();

  const { UIDContent, setUIDContent, handleDivClick, hightlightWithLineNumbers } = UIDText();

  return (
    <div className="CancelFriend">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleCancelFriend">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Cancel friend</p>
            </div>
            <div className="component-item cancelFriend">
              <div className="component-item__header">
                <p>Select Cancel friend type</p>
              </div>
              <div className="cancelFriendContent">
                <div className="component-item cancelFriendOption">
                  <Select
                    name="cancelFriendOption"
                    className="cancelFriendType"
                    onChange={handleSelectChangeCancelFriend}
                    value={selectedValueCancelFriend}
                  >
                    <MenuItem value="cancelRequest">By suggestions</MenuItem>
                    <MenuItem value="unfriend">Accept friend requests</MenuItem>
                  </Select>
                </div>
                {selectedValueCancelFriend === 'cancelRequest' && (
                  <div className="component-item numberOfRequests">
                    <p className="component-item__header">Number of requests:</p>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={requestsValues.handleIncrement} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={requestsValues.handleDecrement} />
                      </div>
                      <input
                        name="Start"
                        type="text"
                        value={requestsValues.RequestsStart}
                        onChange={(event) => requestsValues.handleInputChangeStart(event)}
                      />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img src={iconIncrease} alt="Increase icon" onClick={requestsValues.handleIncrementEnd} />
                        <img src={iconDecrease} alt="Decrease icon" onClick={requestsValues.handleDecrementEnd} />
                      </div>
                      <input
                        name="End"
                        type="text"
                        value={requestsValues.RequestsEnd}
                        onChange={(event) => requestsValues.handleInputChangeEnd(event)}
                      />
                    </div>
                  </div>
                )}
                {(selectedValueCancelFriend === 'cancelRequest' || selectedValueCancelFriend === 'unfriend') && (
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
                )}
                {selectedValueCancelFriend === 'unfriend' && (
                  <div className="component-item unfriend">
                    <div className="component-item__header">
                      <p>Unfriend options</p>
                    </div>
                    <div className="unfriendContent">
                      <div className="component-item unfriendOption">
                        <Select
                          name="unfriendOption"
                          className="unfriendSelector"
                          onChange={handleSelectChangeUnfriend}
                          value={selectedValueUnfriend}
                        >
                          <MenuItem value="random">Randomly</MenuItem>
                          <MenuItem value="UID">UID</MenuItem>
                        </Select>
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
                      )}
                      {selectedValueUnfriend === 'UID' && (
                        <div className="component-item" style={{ position: 'relative' }}>
                          <div className="UIDText" style={{ width: '100%', height: 204, overflow: 'auto' }}>
                            <Editor
                              value={UIDContent}
                              onValueChange={(UIDContent) => setUIDContent(UIDContent)}
                              highlight={(UIDContent) => hightlightWithLineNumbers(UIDContent, languages.js)}
                              padding={15}
                              className="editor"
                              textareaId="codeArea"
                              style={{
                                background: '#f5f5f5',
                                fontSize: 15,
                              }}
                            />
                          </div>
                          <div onClick={handleDivClick} className={`placeholder ${UIDContent ? 'hide' : ''}`}>
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
