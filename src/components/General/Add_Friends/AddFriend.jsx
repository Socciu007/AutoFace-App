// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  AddFriendOption,
  Comment,
  Interact,
  NumberPost,
  TextComment,
  delayTime,
  numberOfRequests,
  stopAfterWarning,
} from './AddFriend';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';

const AddFriend = ({ onGoBackClick }) => {
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

  const { inputValueStopTime, handleIncrementStopTime, handleDecrementStopTime, handleInputChangeStopTime } =
    stopAfterWarning();

  const {
    inputValueNumberPostStart,
    handleIncrementNumberPostStart,
    handleDecrementNumberPostStart,
    inputValueNumberPostEnd,
    handleIncrementNumberPostEnd,
    handleDecrementNumberPostEnd,
    handleInputChangeNumberPostStart,
    handleInputChangeNumberPostEnd,
  } = NumberPost();

  const {
    setTextContentAddFriendRequest,
    placeholderText,
    handleSelectorChange,
    selectedValueTypeAddFriend,
    textContentAddFriendRequest,
  } = AddFriendOption();

  const { textContentComment, handleTextareaChangeComment } = TextComment();

  const { isInteract, handleCheckboxInteract } = Interact();

  const { isComment, handleCheckboxComment } = Comment();

  return (
    <div className="Add_Friend">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleAddFriend">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
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
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span>(s):</span>
                      </p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                        </div>
                        <input
                          type="text"
                          value={inputValueDelayTimeStart}
                          onChange={handleInputChangeDelayTimeStart}
                        />
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
                          <input type="text" value={inputValueStopTime} onChange={handleInputChangeStopTime} />
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
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span>(s):</span>
                      </p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                        </div>
                        <input
                          type="text"
                          value={inputValueDelayTimeStart}
                          onChange={handleInputChangeDelayTimeStart}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                        </div>
                        <input type="text" value={inputValueDelayTimeEnd} onChange={handleIncrementDelayTimeEnd} />
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
                                <input
                                  type="text"
                                  value={inputValueNumberPostStart}
                                  onChange={handleInputChangeNumberPostStart}
                                />
                              </div>
                              <span>to</span>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostEnd} />
                                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostEnd} />
                                </div>
                                <input
                                  type="text"
                                  value={inputValueNumberPostEnd}
                                  onChange={handleInputChangeNumberPostEnd}
                                />
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
                                <input
                                  type="text"
                                  value={inputValueDelayTimeStart}
                                  onChange={handleInputChangeDelayTimeStart}
                                />
                              </div>
                              <span>to</span>
                              <div className="component-item__number">
                                <div className="component-item__number__icon">
                                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                                </div>
                                <input
                                  type="text"
                                  value={inputValueDelayTimeEnd}
                                  onChange={handleInputChangeDelayTimeEnd}
                                />
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
      </div>
    </div>
  );
};

export default AddFriend;
