// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
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

  const { KeywordContent, handleTextareaChangeKeywordContent, handleDivClick, hightlightWithLineNumbers } =
    KeywordTextarea();

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
                  <Select
                    name="LeaveGroupOption"
                    className="LeaveGroupType"
                    onChange={handleSelectChangeLeaveGroup}
                    value={selectedValueLeaveGroup}
                  >
                    <MenuItem value="Random">Random</MenuItem>
                    <MenuItem value="Approve">Group needs Admin to approve posts</MenuItem>
                    <MenuItem value="Conditional">Conditional</MenuItem>
                  </Select>
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
                      <div className="component-item " style={{ position: 'relative' }}>
                        <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="keywordText">
                          <Editor
                            value={KeywordContent}
                            onValueChange={handleTextareaChangeKeywordContent}
                            highlight={(KeywordContent) => hightlightWithLineNumbers(KeywordContent, languages.js)}
                            padding={15}
                            className="editor"
                            textareaId="codeArea"
                            style={{
                              background: '#fff',
                              fontSize: 15,
                              color: '#333',
                            }}
                          />
                        </div>
                        <div onClick={handleDivClick} className={`placeholder ${KeywordContent ? 'hide' : ''}`}>
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
