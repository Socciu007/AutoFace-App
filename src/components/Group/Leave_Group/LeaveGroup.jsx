// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import { KeywordTextarea, LeaveGroupOption, useRangeValues } from './LeaveGroup';
const LeaveGroup = ({ onGoBackClick }) => {
  const initialValues = {
    NumberGroupStart: 5,
    NumberGroupEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
    NumberOfMemberStart: 5,
  };

  const numberGroupValues = useRangeValues(initialValues, 'NumberGroup');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
  const numberOfMemberValues = useRangeValues(initialValues, 'NumberOfMember');

  const { selectedValueLeaveGroup, handleSelectChangeLeaveGroup } = LeaveGroupOption();

  const { KeywordContent, handleTextareaChangeKeywordContent } = KeywordTextarea();

  return (
    <div className="leaveGroup">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleLeaveGroup">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Leave group</p>
            </div>
            <div className="component-content__leaveGroup">
              <div className="component-item numberOfGroups">
                <p className="component-item__header">Number of groups:</p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={numberGroupValues.handleIncrement} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={numberGroupValues.handleDecrement} />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={numberGroupValues.NumberGroupStart}
                    onChange={(event) => numberGroupValues.handleInputChangeStart(event)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={numberGroupValues.handleIncrementEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={numberGroupValues.handleDecrementEnd} />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={numberGroupValues.NumberGroupEnd}
                    onChange={(event) => numberGroupValues.handleInputChangeEnd(event)}
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
              <div className="LeaveGroup_Selection">
                <p className="component-item__header">Select Leave group type</p>
                <div className="component-item LeaveGroupOption">
                  <select
                    name="LeaveGroupOption"
                    className="LeaveGroupType"
                    onChange={handleSelectChangeLeaveGroup}
                    value={selectedValueLeaveGroup}
                  >
                    <option value="Random">Random</option>
                    <option value="Approve">Group needs Admin to approve posts</option>
                    <option value="Conditional">Conditional</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {selectedValueLeaveGroup === 'Conditional' && (
                  <div className="conditional">
                    <div className="component-item delayTime">
                      <p>Number of members less than:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={numberOfMemberValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={numberOfMemberValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          name="Start"
                          value={numberOfMemberValues.NumberOfMemberStart}
                          onChange={(event) => numberOfMemberValues.handleInputChangeStart(event)}
                          style={{ background: '#FFF' }}
                        />
                      </div>
                    </div>
                    <div className="KeywordContent">
                      <p>The group name contains the following keywords:</p>
                      <div className="component-item keywordText">
                        <textarea
                          id="KeywordContent"
                          name="KeywordContent"
                          rows="10"
                          value={KeywordContent}
                          onChange={handleTextareaChangeKeywordContent}
                        ></textarea>
                        <div className={`placeholder ${KeywordContent ? 'hide' : ''}`}>
                          <p>
                            <span>1 </span>
                            <p>Enter the keyword here</p>
                          </p>
                          <p>
                            <span>2</span>
                            <p>Each keyword/line</p>
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

export default LeaveGroup;
