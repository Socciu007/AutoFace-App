// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
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

import {
  AnswerTextarea,
  CancelFriendOption,
  DelayTime,
  KeywordTextarea,
  NumberGroup,
  ShowAutoAnswer,
} from './JoinGroup';
const JoinGroup = () => {
  const {
    inputValueGroupsStart,
    handleIncrementGroupsStart,
    handleDecrementGroupsStart,
    inputValueGroupsEnd,
    handleIncrementGroupsEnd,
    handleDecrementGroupsEnd,
    handleInputChangeGroupsStart,
    handleInputChangeGroupsEnd,
  } = NumberGroup();

  const {
    inputValueDelayTimeStart,
    handleIncrementDelayTimeStart,
    handleDecrementDelayTimeStart,
    inputValueDelayTimeEnd,
    handleIncrementDelayTimeEnd,
    handleDecrementDelayTimeEnd,
    handleInputChangeDelayTimeStart,
    handleInputChangeDelayTimeEnd,
  } = DelayTime();

  const { selectedValueJoinGroup, handleSelectChangeJoinGroup } = CancelFriendOption();

  const { KeywordContent, handleTextareaChangeKeywordContent } = KeywordTextarea();

  const { AnswerContent, handleTextareaChangeAnswerContent } = AnswerTextarea();

  const { isAutoAnswer, handleCheckboxChangeAutoAnswer } = ShowAutoAnswer();
  return (
    <div className="joinGroup">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleJoinGroup">
              <img src={backButton} alt="Back button" />
              <p>Join group</p>
            </div>
            <div className="component-item__joinGroup">
              <div className="component-item__header">
                <p>Select Join group type</p>
              </div>
              <div className="JoinGroupContent">
                <div className="component-item JoinGroupOption">
                  <select
                    name="JoinGroupOption"
                    className="JoinGroupType"
                    onChange={handleSelectChangeJoinGroup}
                    value={selectedValueJoinGroup}
                  >
                    <option value="suggestions">By suggestions</option>
                    <option value="keywords">By keywords</option>
                    <option value="UID">By UID</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValueJoinGroup === 'suggestions' ||
                  selectedValueJoinGroup === 'keywords' ||
                  selectedValueJoinGroup === 'UID') && (
                  <div>
                    <div className="component-item numberOfGroups">
                      <p className="component-item__header">Number of groups:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroupsStart} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroupsStart} />
                        </div>
                        <input type="text" value={inputValueGroupsStart} onChange={handleInputChangeGroupsStart} />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroupsEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroupsEnd} />
                        </div>
                        <input type="text" value={inputValueGroupsEnd} onChange={handleInputChangeGroupsEnd} />
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
                    {(selectedValueJoinGroup === 'keywords' || selectedValueJoinGroup === 'UID') && (
                      <div className="KeywordContent">
                        <div className="Keyword_Header">
                          {selectedValueJoinGroup === 'keywords' && <p>Keyword list</p>}
                          {selectedValueJoinGroup === 'UID' && <p>UID list</p>}
                          <span>(0)</span>
                        </div>
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
                              <span>1</span>Enter the keyword here
                            </p>
                            <p>
                              <span>2</span>Each keyword/line
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="AutoAnswerContent">
                      <div className="AutoAnswer_Header">
                        <input type="checkbox" name="autoAnswer" onChange={handleCheckboxChangeAutoAnswer} />
                        <p>Automatically answer the questions</p>
                      </div>
                      <div className={`component-item AutoAnswerText ${isAutoAnswer ? 'show' : 'hide'}`}>
                        <textarea
                          id="AnswerContent"
                          name="AnswerContent"
                          rows="10"
                          value={AnswerContent}
                          onChange={handleTextareaChangeAnswerContent}
                        ></textarea>
                        <div className={`placeholder ${AnswerContent ? 'hide' : ''}`}>
                          <p>
                            <span>1</span>Enter the answer here
                          </p>
                          <p>
                            <span>2</span>Each answer/line
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
                <img src={iconSave} alt="SaveButton" />
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

export default JoinGroup;
