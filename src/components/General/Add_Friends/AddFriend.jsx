import React from 'react';
import { AddFriendOption, TextComment, useRangeValues, useShowCheckbox } from './AddFriend';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';

const AddFriend = ({ onGoBackClick }) => {
  const initialValues = {
    PostStart: 5,
    PostEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    RequestsStart: 5,
    RequestsEnd: 10,
    StopTimeStart: 10,
  };

  const postValues = useRangeValues(initialValues, 'Post');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const requestsValues = useRangeValues(initialValues, 'Requests');
  const stopTimeValues = useRangeValues(initialValues, 'StopTime');
  const {
    setTextContentAddFriendRequest,
    placeholderText,
    handleSelectorChange,
    selectedValueTypeAddFriend,
    textContentAddFriendRequest,
  } = AddFriendOption();

  const { textContentComment, handleTextareaChangeComment } = TextComment();

  const { isInteract, handleCheckboxChangeInteract } = useShowCheckbox(false, 'Interact');

  const { isComment, handleCheckboxChangeComment } = useShowCheckbox(false, 'Comment');

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
                    <option value="UIDList">UID list</option>
                    <option value="keywords">By keywords</option>
                    <option value="groupMembers">Group members</option>
                    <option value="friendOfFriends">Friend of friends</option>
                    <option value="friendOfUID">Friend of UID</option>
                  </select>
                </div>
                {(selectedValueTypeAddFriend === 'suggestions' ||
                  selectedValueTypeAddFriend === 'acceptFriendRequests' ||
                  selectedValueTypeAddFriend === 'friendOfFriends') && (
                  <div>
                    <div className="component-item numberOfRequests">
                      <p className="component-item__header">Number of requests:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={requestsValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={requestsValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          name="Start"
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
                          type="text"
                          name="End"
                          value={requestsValues.RequestsEnd}
                          onChange={(event) => requestsValues.handleInputChangeEnd(event)}
                        />
                      </div>
                    </div>
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span style={{ marginLeft: '2px' }}> (s):</span>
                      </p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          name="Start"
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
                          type="text"
                          name="End"
                          value={delayTimeValues.DelayTimeEnd}
                          onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                        />
                      </div>
                    </div>
                    {selectedValueTypeAddFriend === 'suggestions' && (
                      <div className="component-item stopTimeAfterWarning">
                        <p>
                          Stop after Facebook warning <span style={{ marginLeft: '2px' }}>(times):</span>
                        </p>
                        <div className="component-item__number">
                          <div className="component-item__number__icon">
                            <img src={iconIncrease} alt="Increase icon" onClick={stopTimeValues.handleIncrement} />
                            <img src={iconDecrease} alt="Decrease icon" onClick={stopTimeValues.handleDecrement} />
                          </div>
                          <input
                            name="Start"
                            type="text"
                            value={stopTimeValues.StopTimeStart}
                            onChange={(event) => stopTimeValues.handleInputChangeStart(event)}
                          />
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
                          type="text"
                          name="Start"
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
                          type="text"
                          name="End"
                          value={delayTimeValues.DelayTimeEnd}
                          onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                        />
                      </div>
                    </div>
                    {selectedValueTypeAddFriend === 'UIDList' && (
                      <div>
                        <div className="component-item autoDelete">
                          <input type="checkbox" name="autoDelete" id="autoDelete" />
                          <p>Automatically delete the UID that sent the friend request</p>
                        </div>

                        <div className="component-item Interact">
                          <input type="checkbox" name="Interact" onChange={handleCheckboxChangeInteract} />
                          <p>Interact before sending friend request</p>
                        </div>

                        <div className={`component-item InteractContent ${isInteract ? 'show' : 'hide'}`}>
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
                                <img
                                  src={iconIncrease}
                                  alt="Increase icon"
                                  onClick={delayTimeValues.handleIncrementEnd}
                                />
                                <img
                                  src={iconDecrease}
                                  alt="Decrease icon"
                                  onClick={delayTimeValues.handleDecrementEnd}
                                />
                              </div>
                              <input
                                name="End"
                                type="text"
                                value={delayTimeValues.DelayTimeEnd}
                                onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
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
                              onChange={handleCheckboxChangeComment}
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
